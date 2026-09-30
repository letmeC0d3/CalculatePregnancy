import React from "react";
import { PREGNANCY_WEEKS_DATA } from "@/domain/data/pregnancyWeeks";
import styles from "./BabySizePreview.module.css";

// Display a curated subset of landmark weeks for Milestone 1
const HIGHLIGHT_WEEKS = [4, 8, 12, 16, 20, 28, 36, 40];

export default function BabySizePreview() {
  const weeksToShow = PREGNANCY_WEEKS_DATA.filter((w) =>
    HIGHLIGHT_WEEKS.includes(w.week)
  );

  return (
    <section id="baby-size" className={styles.section} aria-labelledby="baby-size-title">
      <div className="container">
        <div className={styles.intro}>
          <span className="badge badge-sage" style={{ marginBottom: "0.5rem" }}>
            Visual Comparisons
          </span>
          <h2 id="baby-size-title" className="section-title">
            Baby Size &amp; Development by Week
          </h2>
          <p className="section-subtitle">
            Playful fruit and seed comparisons paired with clear, factual developmental milestones.
          </p>
          <div className="disclaimer-box" style={{ maxWidth: "680px", margin: "0 auto", textAlign: "left" }}>
            <span className="disclaimer-icon">💡</span>
            <div>
              <strong>Educational Notice:</strong> Pregnancy development varies from person to person. The measurements and developmental information on this site are general educational estimates compiled from published medical and scientific sources. They are not intended to diagnose, monitor, or replace advice from a healthcare professional.
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {weeksToShow.map((item) => (
            <article key={item.week} className={styles.weekCard}>
              <div>
                <div className={styles.cardTop}>
                  <span className={styles.weekBadge}>Week {item.week}</span>
                  <span className={styles.trimesterBadge}>Trimester {item.trimester}</span>
                </div>

                <div className={styles.metaphorBox}>
                  <span className={styles.icon} aria-hidden="true">{item.sizeIcon}</span>
                  <div>
                    <div className={styles.metaphorLabel}>Playful Size Metaphor</div>
                    <div className={styles.metaphorName}>{item.babySizeLabel}</div>
                  </div>
                </div>

                <div className={styles.factualMeta}>
                  <div><strong>Length:</strong> {item.approximateLength ?? "Length estimate not shown for this week."}</div>
                  <div><strong>Weight:</strong> {item.approximateWeight ?? "Estimated fetal weight is shown from week 22 using the INTERGROWTH-21st fetal-growth standard."}</div>
                </div>

                <p className={styles.devSummary}>{item.developmentSummary}</p>
              </div>

              <div>
                <ul className={styles.milestonesList} aria-label={`Week ${item.week} highlights`}>
                  {item.keyMilestones.map((milestone, idx) => (
                    <li key={idx}>{milestone}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
