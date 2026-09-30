"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  calculateDueDate,
  calculateGestationalAge,
  calculateTrimester,
  calculateTrimesterSchedule,
  STANDARD_CYCLE_DAYS,
  TrimesterDateRange,
} from "@/domain/pregnancy/calculator";
import {
  addDays,
  differenceInDays,
  formatFriendlyDate,
  getTodayISODate,
  isCompleteInputDate,
} from "@/domain/pregnancy/dateUtils";
import styles from "./TrimesterCalculatorForm.module.css";

export default function TrimesterCalculatorForm() {
  const lmpInputId = useId();
  const todayIso = getTodayISODate();
  const defaultDate = addDays(todayIso, -112); // 16 weeks ago (Trimester 2)

  const [lmpDate, setLmpDate] = useState<string>(defaultDate);

  let errorMsg: string | null = null;
  let estimatedDueDate: string | null = null;
  let gestationalAge = null;
  let currentTrimester = null;
  let schedule: TrimesterDateRange[] | null = null;

  if (!lmpDate) {
    errorMsg = "Please enter the first day of your last menstrual period (LMP).";
  } else if (!isCompleteInputDate(lmpDate)) {
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
        gestationalAge = calculateGestationalAge(lmpDate, todayIso);
        currentTrimester = calculateTrimester(gestationalAge.completedWeeks);
        schedule = calculateTrimesterSchedule(lmpDate, todayIso, STANDARD_CYCLE_DAYS);
      }
    } catch {
      errorMsg = "Please enter a valid calendar date.";
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>What Trimester Am I In?</h2>
          <p className={styles.subtitle}>
            Enter your LMP date to identify your current trimester and view your personalized
            3-trimester date timeline.
          </p>
        </div>

        <div style={{ maxWidth: "440px", margin: "0 auto 2rem auto" }}>
          <label htmlFor={lmpInputId} style={{ display: "block", fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            First day of last menstrual period (LMP)
          </label>
          <input
            id={lmpInputId}
            type="date"
            className={styles.dateInput}
            value={lmpDate}
            max={todayIso}
            onChange={(e) => setLmpDate(e.target.value)}
          />
        </div>

        {errorMsg && (
          <div className="disclaimer-box" role="alert" style={{ borderColor: "#D4886E" }}>
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {gestationalAge && currentTrimester && estimatedDueDate && schedule && (
          <div className={styles.resultsSection} aria-live="polite">
            <div className={styles.activeTrimesterBanner}>
              <span className={styles.activeTag}>Your Current Stage</span>
              <div className={styles.activeName}>{currentTrimester.name}</div>
              <div className={styles.activeSubtext}>
                {currentTrimester.shortDescription}
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaBox}>
                  <div className={styles.metaLabel}>Gestational Age</div>
                  <div className={styles.metaValue}>{gestationalAge.formatted}</div>
                </div>

                <div className={styles.metaBox}>
                  <div className={styles.metaLabel}>Pregnancy Week</div>
                  <div className={styles.metaValue}>Week {gestationalAge.currentWeekNumber} of 40</div>
                </div>

                <div className={styles.metaBox}>
                  <div className={styles.metaLabel}>Estimated Due Date</div>
                  <div className={styles.metaValue} style={{ fontSize: "0.95rem" }}>
                    {formatFriendlyDate(estimatedDueDate)}
                  </div>
                </div>
              </div>
            </div>

            <h3 className={styles.scheduleHeader}>Your Trimester Timeline</h3>
            <div className={styles.scheduleGrid}>
              {schedule.map((item) => (
                <div
                  key={item.trimester}
                  className={`${styles.trimesterCard} ${
                    item.isCurrent ? styles.trimesterCardCurrent : ""
                  }`}
                >
                  <div>
                    <span
                      className={`${styles.cardStatusBadge} ${
                        item.status === "current"
                          ? styles.badgeCurrent
                          : item.status === "completed"
                          ? styles.badgeCompleted
                          : styles.badgeUpcoming
                      }`}
                    >
                      {item.status === "current"
                        ? "Active Trimester"
                        : item.status === "completed"
                        ? "Completed"
                        : "Upcoming"}
                    </span>

                    <h4 className={styles.cardTitle}>{item.name}</h4>
                    <div className={styles.cardWeekSpan}>{item.weekSpan}</div>

                    <div className={styles.cardDates}>
                      <div><strong>From:</strong> {formatFriendlyDate(item.startDate)}</div>
                      <div><strong>Until:</strong> {formatFriendlyDate(item.endDate)}</div>
                    </div>
                  </div>

                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              ))}
            </div>

            <div className="disclaimer-box" style={{ marginTop: "2rem" }}>
              <span className="disclaimer-icon">ℹ️</span>
              <div>
                <strong>A note on trimester dividing lines:</strong> In medical practice, exact trimester boundaries can vary slightly by clinical institution (some sources divide trimesters evenly at 13 weeks 2 days, while others, like ACOG, place the transition at completed Week 13 and completed Week 27). This tool uses the standard ACOG/NHS convention. Trimesters are clinical landmarks rather than rigid biological boundaries.
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem", justifyContent: "center" }}>
              <Link href="/pregnancy-week-calculator" className="btn btn-secondary">
                Calculate Exact Week &amp; Day →
              </Link>
              <Link href="/baby-size-by-week" className="btn btn-secondary">
                View Baby Size by Week →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
