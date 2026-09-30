"use client";

import React, { useState, useId } from "react";
import {
  calculateFullPregnancy,
  STANDARD_CYCLE_DAYS,
  PregnancyCalculationResult,
} from "@/domain/pregnancy/calculator";
import {
  addDays,
  differenceInDays,
  formatFriendlyDate,
  getTodayISODate,
  isCompleteInputDate,
} from "@/domain/pregnancy/dateUtils";
import { getWeekData } from "@/domain/data/pregnancyWeeks";
import styles from "./PregnancyCalculatorForm.module.css";

interface PregnancyCalculatorFormProps {
  initialLmpDate?: string;
  initialCycleDays?: number;
  showMilestones?: boolean;
}

export default function PregnancyCalculatorForm({
  initialLmpDate,
  initialCycleDays = STANDARD_CYCLE_DAYS,
  showMilestones = true,
}: PregnancyCalculatorFormProps) {
  const lmpInputId = useId();
  const cycleInputId = useId();

  // Sensible default: 8 weeks ago today so visitor immediately sees the calculator's rich output
  const defaultDate = initialLmpDate || addDays(getTodayISODate(), -56);
  const [lmpDate, setLmpDate] = useState<string>(defaultDate);
  const [cycleDays, setCycleDays] = useState<number>(initialCycleDays);

  const todayIso = getTodayISODate();

  // Validate date range
  let errorMsg: string | null = null;
  let result: PregnancyCalculationResult | null = null;

  if (!lmpDate) {
    errorMsg = "Please enter the first day of your last menstrual period.";
  } else if (!isCompleteInputDate(lmpDate)) {
    // Intermediate typing state (e.g. typing digits of a 4-digit year)
    errorMsg = null;
  } else {
    try {
      const daysSinceLmp = differenceInDays(lmpDate, todayIso);
      if (daysSinceLmp < 0) {
        errorMsg = "LMP date cannot be in the future.";
      } else if (daysSinceLmp > 308) {
        // 44 weeks
        errorMsg = "The entered date is more than 44 weeks ago. Please check the date entered.";
      } else {
        result = calculateFullPregnancy(lmpDate, todayIso, cycleDays);
      }
    } catch {
      errorMsg = "Please enter a valid calendar date.";
    }
  }

  const currentWeekData = result
    ? getWeekData(Math.max(4, result.gestationalAge.completedWeeks))
    : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Calculate Your Pregnancy</h2>
        <p className={styles.subtitle}>
          Enter the first day of your last menstrual period (LMP) to view your estimated due date,
          gestational age, and current trimester.
        </p>
      </div>

      <div className={styles.inputsGrid}>
        <div className={styles.inputGroup}>
          <label htmlFor={lmpInputId} className={styles.label}>
            <span>First day of last period (LMP)</span>
            <span className={styles.labelHint}>Required</span>
          </label>
          <input
            id={lmpInputId}
            type="date"
            className={styles.dateInput}
            value={lmpDate}
            max={todayIso}
            onChange={(e) => setLmpDate(e.target.value)}
            aria-describedby="lmp-help"
          />
          <span id="lmp-help" className={styles.cycleHelper}>
            The first day of bleeding during your last menstrual cycle.
          </span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor={cycleInputId} className={styles.label}>
            <span>Average cycle length</span>
            <span className={styles.labelHint}>Optional</span>
          </label>
          <select
            id={cycleInputId}
            className={styles.selectInput}
            value={cycleDays}
            onChange={(e) => setCycleDays(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 26 }, (_, i) => i + 20).map((days) => (
              <option key={days} value={days}>
                {days} days {days === 28 ? "(Standard average)" : ""}
              </option>
            ))}
          </select>
          <span className={styles.cycleHelper}>
            Standard calculations assume a 28-day cycle with ovulation on day 14.
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="disclaimer-box" role="alert" style={{ borderColor: "#D4886E" }}>
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {result && (
        <div className={styles.resultsCard} aria-live="polite">
          <div className={styles.resultsHeader}>
            <span className={styles.eddLabel}>Estimated Due Date</span>
            <div className={styles.eddValue}>
              {formatFriendlyDate(result.estimatedDueDate)}
            </div>
            <div className={styles.eddSubtext}>
              {result.daysRemainingUntilDueDate > 0 ? (
                <span>
                  <strong>{result.daysRemainingUntilDueDate} days</strong> remaining until this estimated date
                </span>
              ) : (
                <span>Due date reached</span>
              )}
            </div>
          </div>

          <div className={styles.statGrid}>
            <div className={styles.statBox}>
              <div className={styles.statTitle}>Gestational Age</div>
              <div className={styles.statNumber}>{result.gestationalAge.formatted}</div>
              <div className={styles.statDesc}>
                In your {result.gestationalAge.currentWeekNumber}th week
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statTitle}>Trimester</div>
              <div className={styles.statNumber}>Trimester {result.trimester.number}</div>
              <div className={styles.statDesc}>{result.trimester.weekRange}</div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statTitle}>Estimated Conception</div>
              <div className={styles.statNumber}>
                {formatFriendlyDate(result.conceptionDate)}
              </div>
              <div className={styles.statDesc}>Approx. ovulation window</div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statTitle}>Progress</div>
              <div className={styles.statNumber}>{result.percentageComplete}%</div>
              <div className={styles.statDesc}>of 40 weeks completed</div>
            </div>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.progressLabelRow}>
              <span>Journey: Week 1</span>
              <span><strong>Week {result.gestationalAge.completedWeeks}</strong></span>
              <span>Week 40</span>
            </div>
            <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={result.percentageComplete} aria-valuemin={0} aria-valuemax={100}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${result.percentageComplete}%` }}
              />
            </div>
          </div>

          {currentWeekData && (
            <div className={styles.babySizeCard}>
              <div className={styles.babySizeIcon} aria-hidden="true">
                {currentWeekData.sizeIcon}
              </div>
              <div className={styles.babySizeMeta}>
                <h4>
                  Week {currentWeekData.week} Baby Size Comparison:{" "}
                  <strong>{currentWeekData.babySizeLabel}</strong>
                </h4>
                <p>{currentWeekData.developmentSummary}</p>
                <div className={styles.babySizeDisclaimer}>
                  * Note: Fruit &amp; seed comparisons are playful visual metaphors, not clinical measurements.
                </div>
              </div>
            </div>
          )}

          {showMilestones && (
            <div className={styles.milestoneBox}>
              <h3 className={styles.milestoneTitle}>Estimated Key Milestones</h3>
              <div className={styles.milestoneList}>
                <div className={styles.milestoneItem}>
                  <span className={styles.milestoneDot} />
                  <div className={styles.milestoneText}>
                    <span className={styles.milestoneName}>Conception Window</span>
                    <span className={styles.milestoneDate}>{formatFriendlyDate(result.milestones.conceptionDate)}</span>
                  </div>
                </div>
                <div className={styles.milestoneItem}>
                  <span className={styles.milestoneDot} />
                  <div className={styles.milestoneText}>
                    <span className={styles.milestoneName}>End of 1st Trimester (13w 6d)</span>
                    <span className={styles.milestoneDate}>{formatFriendlyDate(result.milestones.firstTrimesterEnd)}</span>
                  </div>
                </div>
                <div className={styles.milestoneItem}>
                  <span className={styles.milestoneDot} />
                  <div className={styles.milestoneText}>
                    <span className={styles.milestoneName}>Halfway Mark (20w Anatomy Scan)</span>
                    <span className={styles.milestoneDate}>{formatFriendlyDate(result.milestones.halfwayMark20Weeks)}</span>
                  </div>
                </div>
                <div className={styles.milestoneItem}>
                  <span className={styles.milestoneDot} />
                  <div className={styles.milestoneText}>
                    <span className={styles.milestoneName}>End of 2nd Trimester (27w 6d)</span>
                    <span className={styles.milestoneDate}>{formatFriendlyDate(result.milestones.secondTrimesterEnd)}</span>
                  </div>
                </div>
                <div className={styles.milestoneItem}>
                  <span className={styles.milestoneDot} />
                  <div className={styles.milestoneText}>
                    <span className={styles.milestoneName}>Full Term (37 Weeks)</span>
                    <span className={styles.milestoneDate}>{formatFriendlyDate(result.milestones.fullTerm37Weeks)}</span>
                  </div>
                </div>
                <div className={styles.milestoneItem}>
                  <span className={styles.milestoneDot} />
                  <div className={styles.milestoneText}>
                    <span className={styles.milestoneName}>Estimated Due Date (40 Weeks)</span>
                    <span className={styles.milestoneDate}>{formatFriendlyDate(result.milestones.estimatedDueDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: "1.75rem" }}>
            <div className="disclaimer-box">
              <span className="disclaimer-icon">ℹ️</span>
              <div>
                <strong>A quick note on estimated dates:</strong> Due dates are guidelines. Only about 4% to 5% of babies arrive on their exact calculated due date, while about 80% arrive within two weeks before or after. Your midwife or doctor may refine your estimated due date following your early ultrasound dating scan.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
