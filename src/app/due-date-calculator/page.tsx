import type { Metadata } from "next";
import { buildPageMetadata } from "@/domain/metadata";
import DueDateCalculatorForm from "@/components/DueDateCalculatorForm";
import FaqSection from "@/components/FaqSection";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Due Date Calculator — Calculate Estimated Delivery Date (EDD)",
  description:
    "Find out when your baby is due with our free, evidence-based Due Date Calculator. Uses Naegele's 280-day obstetric rule for accurate gestational dating.",
  path: "/due-date-calculator",
});

export default function DueDateCalculatorPage() {
  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-sage" style={{ marginBottom: "0.75rem" }}>
            Estimated Delivery Date (EDD)
          </span>
          <h1 className="hero-title">Due Date Calculator</h1>
          <p className="hero-subtitle">
            Estimate when your baby may arrive using Naegele&apos;s standard obstetrical formula.
          </p>
        </div>

        <DueDateCalculatorForm />

        <section className={styles.explainerSection}>
          <div className="text-container">
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              How Is Your Due Date Calculated?
            </h2>

            <div className={styles.articleCard}>
              <h3>1. The 280-Day Obstetrical Standard (Naegele&apos;s Rule)</h3>
              <p>
                In standard clinical medicine, a full pregnancy is counted as <strong>40 weeks (280 days)</strong> starting from the <em>first day of your last normal menstrual period (LMP)</em>.
                This formula was introduced by German obstetrician Franz Karl Naegele in the 19th century and remains the foundation of global obstetrics today.
              </p>
              <div className={styles.formulaBox}>
                <code>Estimated Due Date = First Day of LMP + 280 Days (40 Weeks)</code>
              </div>

              <h3>2. Why Is Gestational Age Counted From Your Period?</h3>
              <p>
                Ovulation and conception usually happen roughly two weeks after your period starts.
                However, because exact conception dates are rarely known with pinpoint certainty, healthcare providers universally reference the first day of your last cycle to ensure consistent clinical records and ultrasound timelines.
              </p>

              <h3>3. Due Dates Are Estimates, Not Deadlines</h3>
              <p>
                A due date represents the estimated 40-week milestone. In reality:
              </p>
              <ul className={styles.bulletList}>
                <li>Only about <strong>4% to 5%</strong> of infants are born on their exact calculated due date.</li>
                <li>Approximately <strong>80%</strong> of healthy infants arrive within a two-week window before or after the estimated date (between 38 and 42 weeks).</li>
                <li>Your obstetrician or midwife will review your early ultrasound measurements (typically the 8–12 week dating scan) to confirm or adjust your official clinical due date.</li>
              </ul>
            </div>
          </div>
        </section>

        <div style={{ marginTop: "3rem" }}>
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
