import React from "react";
import styles from "./HowItWorksSection.module.css";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className={styles.section} aria-labelledby="how-it-works-title">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
          <span className="badge badge-rose" style={{ marginBottom: "0.5rem" }}>
            The Science of Dating
          </span>
          <h2 id="how-it-works-title" className="section-title">
            How Pregnancy Weeks Are Calculated
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Understanding the difference between gestational age and conception age brings clarity to your timeline.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <div className={styles.stepNumber}>01</div>
            <h3 className={styles.cardTitle}>Naegele&apos;s Rule (280 Days)</h3>
            <p className={styles.cardBody}>
              Clinically, pregnancy is measured from the <strong>first day of your last menstrual period (LMP)</strong>,
              not the date of conception. A standard gestation spans 40 weeks, which equals 280 calendar days.
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.stepNumber}>02</div>
            <h3 className={styles.cardTitle}>Gestational vs. Conception Age</h3>
            <p className={styles.cardBody}>
              Because ovulation typically happens about 14 days after your period starts,
              your baby is conceived about 2 weeks into your counted gestational age.
              When you are 4 weeks pregnant, your baby has been growing for approximately 2 weeks.
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.stepNumber}>03</div>
            <h3 className={styles.cardTitle}>Trimester Boundaries</h3>
            <p className={styles.cardBody}>
              According to ACOG standards, <strong>Trimester 1</strong> covers weeks 1–13.
              <strong> Trimester 2</strong> covers weeks 14–27.
              <strong> Trimester 3</strong> starts at week 28 and continues until delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
