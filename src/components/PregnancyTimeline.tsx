import React from "react";
import Link from "next/link";
import { getWeeksByTrimester } from "@/domain/data/pregnancyWeeks";
import styles from "./PregnancyTimeline.module.css";

export default function PregnancyTimeline() {
  const t1Weeks = getWeeksByTrimester(1);
  const t2Weeks = getWeeksByTrimester(2);
  const t3Weeks = getWeeksByTrimester(3);

  const renderTrimesterSection = (
    title: string,
    range: string,
    summary: string,
    weeks: typeof t1Weeks
  ) => (
    <section className={styles.trimesterBlock} aria-labelledby={`heading-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className={styles.trimesterHeader}>
        <div>
          <span className="badge badge-sage">Trimester Guide</span>
          <h2 id={`heading-${title.toLowerCase().replace(/\s+/g, "-")}`} className={styles.trimesterTitle}>
            {title}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginTop: "0.25rem", maxWidth: "600px" }}>
            {summary}
          </p>
        </div>
        <span className={styles.trimesterRange}>{range}</span>
      </div>

      <div className={styles.timelineGrid}>
        {weeks.map((w) => (
          <article key={w.week} id={`week-${w.week}`} className={styles.weekCard}>
            <div>
              <div className={styles.cardTop}>
                <span className={styles.weekNumberBadge}>Week {w.week}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  Gestational Age
                </span>
              </div>

              <div className={styles.sizeMetaphorRow}>
                <span className={styles.sizeIcon} aria-hidden="true">{w.sizeIcon}</span>
                <div>
                  <div className={styles.sizeTextTitle}>Size Comparison</div>
                  <div className={styles.sizeName}>{w.babySizeLabel}</div>
                </div>
              </div>

              <p className={styles.devSummary}>{w.developmentSummary}</p>

              <ul className={styles.milestonesList} aria-label={`Week ${w.week} key milestones`}>
                {w.keyMilestones.map((milestone, idx) => (
                  <li key={idx}>{milestone}</li>
                ))}
              </ul>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.measurementSnippet}>
                {w.approximateLength ?? (w.approximateWeight ? w.approximateWeight.split(" (")[0] : "Length estimate not shown for this week.")}
              </span>
              <Link href={`/baby-size-by-week#week-${w.week}`}>
                View baby size →
              </Link>
            </div>
            {w.sources && w.sources.length > 0 && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.6875rem", color: "var(--text-muted)", borderTop: "1px dashed var(--border-light)", paddingTop: "0.35rem" }}>
                Source references: {Array.from(new Set(w.sources.map(s => s.publisher.includes("ACOG") ? "ACOG" : s.publisher.includes("NHS") ? "NHS" : "INTERGROWTH-21st"))).join(" • ")}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <div className={styles.timelineWrapper}>
      <div className="disclaimer-box" style={{ marginBottom: "2.5rem" }}>
        <span className="disclaimer-icon">💡</span>
        <div>
          <strong>Educational Notice &amp; Measurement Convention:</strong> Pregnancy development varies from person to person. The measurements and developmental information on this site are general educational estimates compiled from published medical and scientific sources. They are not intended to diagnose, monitor, or replace advice from a healthcare professional. From Weeks 6 through 19, lengths are recorded as Crown-Rump Length (CRL, top of head to buttocks) because baby&apos;s legs are naturally curled. From Week 20 onward, measurements represent total Crown-to-Heel length.
        </div>
      </div>

      {renderTrimesterSection(
        "First Trimester",
        "Weeks 4 through 13",
        "Cellular development, blastocyst implantation, early heart contractions, and foundational organ systems formation.",
        t1Weeks
      )}

      {renderTrimesterSection(
        "Second Trimester",
        "Weeks 14 through 27",
        "Rapid fetal length growth, emergence of sleep cycles, hair formation, and the mid-pregnancy 20-week anatomy milestone.",
        t2Weeks
      )}

      {renderTrimesterSection(
        "Third Trimester",
        "Weeks 28 through 40",
        "Rapid weight gain, pulmonary surfactant production, brain convolution maturation, and preparation for labor.",
        t3Weeks
      )}
    </div>
  );
}
