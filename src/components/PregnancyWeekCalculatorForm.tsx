"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  calculateDueDate,
  calculateConceptionDate,
  calculateGestationalAge,
  calculateTrimester,
  calculateGestationalAgeOnDate,
  STANDARD_CYCLE_DAYS,
  GestationalAge,
} from "@/domain/pregnancy/calculator";
import {
  addDays,
  differenceInDays,
  formatFriendlyDate,
  getTodayISODate,
  isCompleteInputDate,
} from "@/domain/pregnancy/dateUtils";
import { getWeekData } from "@/domain/data/pregnancyWeeks";
import styles from "./PregnancyWeekCalculatorForm.module.css";

export default function PregnancyWeekCalculatorForm() {
  const lmpInputId = useId();
  const futureDateInputId = useId();

  const todayIso = getTodayISODate();
  const defaultLmp = addDays(todayIso, -70); // 10 weeks ago
  const defaultFutureDate = addDays(todayIso, 60); // 60 days ahead

  const [lmpDate, setLmpDate] = useState<string>(defaultLmp);
  const [futureTargetDate, setFutureTargetDate] = useState<string>(defaultFutureDate);

  let errorMsg: string | null = null;
  let estimatedDueDate: string | null = null;
  let conceptionDate: string | null = null;
  let currentAge: GestationalAge | null = null;
  let currentTrimester = null;
  let daysIntoWeek = 0;

  // Future date calculation state
  let futureAge: GestationalAge | null = null;
  let futureTrimester = null;
  let futureDateError: string | null = null;

  if (!lmpDate) {
    errorMsg = "Please enter the first day of your last menstrual period (LMP).";
  } else if (!isCompleteInputDate(lmpDate)) {
    // Intermediate keystroke input
    errorMsg = null;
  } else {
    try {
      const daysSinceLmp = differenceInDays(lmpDate, todayIso);
      if (daysSinceLmp < 0) {
        errorMsg = "LMP date cannot be in the future.";
      } else if (daysSinceLmp > 308) {
        errorMsg = "The entered date is more than 44 weeks in the past.";
      } else {
        estimatedDueDate = calculateDueDate(lmpDate, STANDARD_CYCLE_DAYS);
        conceptionDate = calculateConceptionDate(lmpDate, STANDARD_CYCLE_DAYS);
        currentAge = calculateGestationalAge(lmpDate, todayIso);
        currentTrimester = calculateTrimester(currentAge.completedWeeks);
        daysIntoWeek = currentAge.remainingDays;
      }
    } catch {
      errorMsg = "Please enter a valid calendar date.";
    }
  }

  // Calculate future date if provided and valid
  if (lmpDate && isCompleteInputDate(lmpDate) && futureTargetDate && isCompleteInputDate(futureTargetDate)) {
    try {
      const diffToLmp = differenceInDays(lmpDate, futureTargetDate);
      if (diffToLmp < 0) {
        futureDateError = "Selected date is before your LMP date.";
      } else {
        futureAge = calculateGestationalAgeOnDate(lmpDate, futureTargetDate);
        futureTrimester = calculateTrimester(futureAge.completedWeeks);
      }
    } catch {
      futureDateError = "Please select a valid future date.";
    }
  }

  const currentWeekData = currentAge
    ? getWeekData(Math.max(4, Math.min(40, currentAge.completedWeeks)))
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.calcCard}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>How Many Weeks Pregnant Am I?</h2>
          <p className={styles.subtitle}>
            Enter the first day of your last period to calculate your current gestational week,
            completed days, trimester, and projected week on any future date.
          </p>
        </div>

        <div className={styles.inputsGrid} style={{ gridTemplateColumns: "1fr" }}>
          <div className={styles.inputGroup}>
            <label htmlFor={lmpInputId} className={styles.label}>
              <span>First day of last menstrual period (LMP)</span>
              <span className={styles.labelHint}>Required</span>
            </label>
            <input
              id={lmpInputId}
              type="date"
              className={styles.dateInput}
              value={lmpDate}
              max={todayIso}
              onChange={(e) => setLmpDate(e.target.value)}
              aria-describedby="lmp-help-text"
            />
            <span id="lmp-help-text" className={styles.helperText}>
              Standard obstetrical dating counts from the first day of bleeding of your last menstrual cycle.
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="disclaimer-box" role="alert" style={{ borderColor: "#D4886E" }}>
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {currentAge && estimatedDueDate && conceptionDate && currentTrimester && (
          <div className={styles.resultsSection} aria-live="polite">
            <div className={styles.currentWeekHero}>
              <span className={styles.weekLeadLabel}>Current Gestational Status</span>
              <div className={styles.weekValue}>
                {currentAge.completedWeeks === 1 ? "1 Week" : `${currentAge.completedWeeks} Weeks`},{" "}
                {daysIntoWeek === 1 ? "1 Day" : `${daysIntoWeek} Days`}
              </div>
              <div className={styles.weekSubtext}>
                You are currently in <strong>Week {currentAge.currentWeekNumber}</strong> of pregnancy
              </div>
            </div>

            <div className={styles.statGrid}>
              <div className={styles.statBox}>
                <div className={styles.statTitle}>Completed Weeks</div>
                <div className={styles.statNumber}>{currentAge.completedWeeks} w</div>
                <div className={styles.statDesc}>{currentAge.totalDays} total days</div>
              </div>

              <div className={styles.statBox}>
                <div className={styles.statTitle}>Current Trimester</div>
                <div className={styles.statNumber}>{currentTrimester.name}</div>
                <div className={styles.statDesc}>{currentTrimester.weekRange}</div>
              </div>

              <div className={styles.statBox}>
                <div className={styles.statTitle}>Estimated Due Date</div>
                <div className={styles.statNumber} style={{ fontSize: "1rem" }}>
                  {formatFriendlyDate(estimatedDueDate)}
                </div>
                <div className={styles.statDesc}>40 weeks milestone</div>
              </div>

              <div className={styles.statBox}>
                <div className={styles.statTitle}>Estimated Conception</div>
                <div className={styles.statNumber} style={{ fontSize: "1rem" }}>
                  {formatFriendlyDate(conceptionDate)}
                </div>
                <div className={styles.statDesc}>Approx. 14 days after LMP</div>
              </div>
            </div>

            {/* Feature: How far along will I be on another date? */}
            <div className={styles.futureDateCard}>
              <div className={styles.futureDateHeader}>
                <span style={{ fontSize: "1.25rem" }} aria-hidden="true">🗓️</span>
                <h3>How far along will I be on another date?</h3>
              </div>
              <p className={styles.helperText} style={{ marginBottom: "1rem" }}>
                Select an upcoming date (e.g. an appointment, travel date, or celebration) to see your projected gestational age.
              </p>

              <div className={styles.futureDateControl}>
                <div className={styles.inputGroup}>
                  <label htmlFor={futureDateInputId} className={styles.label}>
                    <span>Choose a target date</span>
                  </label>
                  <input
                    id={futureDateInputId}
                    type="date"
                    className={styles.dateInput}
                    value={futureTargetDate}
                    onChange={(e) => setFutureTargetDate(e.target.value)}
                  />
                </div>

                <div>
                  {futureDateError ? (
                    <div className="disclaimer-box" style={{ padding: "0.75rem 1rem" }}>
                      <span>⚠️</span>
                      <span>{futureDateError}</span>
                    </div>
                  ) : futureAge && futureTrimester ? (
                    <div className={styles.futureResultBox}>
                      <div className={styles.futureResultValue}>
                        On {formatFriendlyDate(futureTargetDate)}:
                      </div>
                      <div className={styles.futureResultMeta}>
                        You will be approximately <strong>{futureAge.completedWeeks} weeks and {futureAge.remainingDays} days</strong> pregnant (Week {futureAge.currentWeekNumber}, {futureTrimester.name}).
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Helpful quick links to baby size and week by week */}
            {currentWeekData && (
              <div className={styles.quickLinkRow}>
                <Link
                  href={`/baby-size-by-week#week-${currentWeekData.week}`}
                  className={styles.quickLink}
                >
                  <span>{currentWeekData.sizeIcon}</span>
                  <span>View Week {currentWeekData.week} Baby Size ({currentWeekData.babySizeLabel}) →</span>
                </Link>
                <Link
                  href={`/pregnancy-week-by-week#week-${currentWeekData.week}`}
                  className={styles.quickLink}
                >
                  <span>📖</span>
                  <span>Read Week {currentWeekData.week} Development Guide →</span>
                </Link>
                <Link href="/trimester-calculator" className={styles.quickLink}>
                  <span>🧭</span>
                  <span>Calculate Trimester Schedule →</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
