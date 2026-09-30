import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.disclaimerBanner} role="note" aria-label="Medical Disclaimer">
          <strong>Medical Information Disclaimer</strong>
          CalculatePregnancy.com is an informational estimation tool built using standard obstetrical models (Naegele&apos;s Rule).
          It is not medical advice, diagnosis, or treatment. Every pregnancy is unique, and your obstetrician, midwife, or
          healthcare professional may date your pregnancy differently based on early ultrasound measurements or clinical assessments.
          Always consult a licensed medical provider for clinical guidance.
        </div>

        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <div className={styles.brandTitle}>
              <span>🌱 CalculatePregnancy.com</span>
            </div>
            <p className={styles.brandDesc}>
              A calm, thoughtful pregnancy calculation utility designed to help expecting parents understand their due date,
              gestational age, and weekly milestones with clarity.
            </p>
          </div>

          <div className={styles.navCol}>
            <h4>Calculators</h4>
            <ul className={styles.navList}>
              <li><Link href="/pregnancy-calculator">Pregnancy Calculator</Link></li>
              <li><Link href="/due-date-calculator">Due Date Calculator</Link></li>
              <li><Link href="/pregnancy-week-calculator">Pregnancy Week Calculator</Link></li>
              <li><Link href="/trimester-calculator">Trimester Calculator</Link></li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <h4>Guides &amp; Timelines</h4>
            <ul className={styles.navList}>
              <li><Link href="/baby-size-by-week">Baby Size by Week</Link></li>
              <li><Link href="/pregnancy-week-by-week">40-Week Journey</Link></li>
              <li><Link href="/#how-it-works">How Dating Works</Link></li>
              <li><Link href="/#faq">Pregnancy FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div>© {new Date().getFullYear()} CalculatePregnancy.com. All calculations execute privately in your browser.</div>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <Link href="/about">About &amp; Clinical Standards</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
