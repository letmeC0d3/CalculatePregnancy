"use client";

import React, { useState, useId } from "react";
import {
  calculateDueDate,
  calculateGestationalAge,
  calculateTrimester,
  STANDARD_CYCLE_DAYS,
} from "@/domain/pregnancy/calculator";
import {
  addDays,
  differenceInDays,
  formatFriendlyDate,
  getTodayISODate,
  isCompleteInputDate,
} from "@/domain/pregnancy/dateUtils";
import styles from "./PregnancyCalculatorForm.module.css";

export default function DueDateCalculatorForm() {
  const lmpInputId = useId();
  const defaultDate = addDays(getTodayISODate(), -42); // 6 weeks ago
  const [lmpDate, setLmpDate] = useState<string>(defaultDate);

  const todayIso = getTodayISODate();

  let errorMsg: string | null = null;
  let estimatedDueDate: string | null = null;
  let gestationalAge = null;
  let trimester = null;
  let daysRemaining = 0;

  if (!lmpDate) {
    errorMsg = "Please enter the first day of your last menstrual period.";
  } else if (!isCompleteInputDate(lmpDate)) {
    errorMsg = null;
  } else {
    try {
      const daysSinceLmp = differenceInDays(lmpDate, todayIso);
      if (daysSinceLmp < 0) {
        errorMsg = "LMP date cannot be in the future.";
      } else if (daysSinceLmp > 308) {
        errorMsg = "Date entered is more than 44 weeks in the past.";
      } else {
        estimatedDueDate = calculateDueDate(lmpDate, STANDARD_CYCLE_DAYS);
        gestationalAge = calculateGestationalAge(lmpDate, todayIso);
        trimester = calculateTrimester(gestationalAge.completedWeeks);
        daysRemaining = differenceInDays(todayIso, estimatedDueDate);
      }
    } catch {
      errorMsg = "Please enter a valid calendar date.";
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Due Date Calculator</h2>
        <p className={styles.subtitle}>
          Find your estimated arrival date based on the standard medical 280-day gestational rule.
        </p>
      </div>

      <div className={styles.inputsGrid} style={{ gridTemplateColumns: "1fr" }}>
        <div className={styles.inputGroup}>
          <label htmlFor={lmpInputId} className={styles.label}>
            <span>First day of your last menstrual period (LMP)</span>
            <span className={styles.labelHint}>Required</span>
          </label>
          <input
            id={lmpInputId}
            type="date"
            className={styles.dateInput}
            value={lmpDate}
            max={todayIso}
            onChange={(e) => setLmpDate(e.target.value)}
          />
          <span className={styles.cycleHelper}>
            The first day of bleeding in your last cycle before becoming pregnant.
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="disclaimer-box" role="alert" style={{ borderColor: "#D4886E" }}>
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {estimatedDueDate && gestationalAge && trimester && (
        <div className={styles.resultsCard} aria-live="polite">
          <div className={styles.resultsHeader}>
            <span className={styles.eddLabel}>Your Estimated Due Date</span>
            <div className={styles.eddValue}>
              {formatFriendlyDate(estimatedDueDate, { includeDayOfWeek: true })}
            </div>
            <div className={styles.eddSubtext}>
              {daysRemaining > 0 ? (
                <span>
                  Approximately <strong>{daysRemaining} days</strong> from today
                </span>
              ) : (
                <span>Estimated due date reached</span>
              )}
            </div>
          </div>

          <div className={styles.statGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div className={styles.statBox}>
              <div className={styles.statTitle}>Current Gestational Age</div>
              <div className={styles.statNumber}>{gestationalAge.formatted}</div>
              <div className={styles.statDesc}>Week {gestationalAge.currentWeekNumber} of 40</div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statTitle}>Current Trimester</div>
              <div className={styles.statNumber}>{trimester.name}</div>
              <div className={styles.statDesc}>{trimester.weekRange}</div>
            </div>
          </div>

          <div className="disclaimer-box">
            <span className="disclaimer-icon">💡</span>
            <div>
              <strong>How this is calculated:</strong> This calculator uses <em>Naegele&apos;s Rule</em>, the standard clinical dating standard. It adds 280 days (40 weeks) from the first day of your last period. While useful for planning, remember that only about 4–5% of babies arrive on their exact calculated due date.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
