import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/domain/metadata";
import TrimesterCalculatorForm from "@/components/TrimesterCalculatorForm";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Trimester Calculator — What Trimester Am I In?",
  description:
    "Determine which pregnancy trimester you are in and see the exact date boundaries for First, Second, and Third Trimesters based on your last menstrual period.",
  path: "/trimester-calculator",
});

export default function TrimesterCalculatorPage() {
  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-sage" style={{ marginBottom: "0.75rem" }}>
            Trimester Schedule &amp; Boundaries
          </span>
          <h1 className="hero-title">Trimester Calculator</h1>
          <p className="hero-subtitle">
            Find out which trimester you are in today and view the projected calendar dates for each
            stage of your pregnancy.
          </p>
        </div>

        <TrimesterCalculatorForm />

        {/* Clinical Explainer Section */}
        <div className="text-container" style={{ marginTop: "4.5rem" }}>
          <div className="card" style={{ padding: "2.5rem 2rem" }}>
            <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              Understanding the Trimester Model
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65", marginBottom: "1.25rem" }}>
              Pregnancy is traditionally divided into three developmental segments called trimesters.
              Because human pregnancy lasts approximately 40 weeks (280 days), which does not divide
              evenly into three whole numbers, obstetrical organizations use standard week grouping conventions:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "var(--bg-primary)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.25rem" }}>
                  First Trimester: Weeks 1 through 13 (Days 0–97)
                </strong>
                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Begins on the first day of your LMP. Includes conception, blastocyst implantation, early placental development, and the formation of all major organs.
                </span>
              </div>

              <div style={{ background: "var(--bg-primary)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.25rem" }}>
                  Second Trimester: Weeks 14 through 27 (Days 98–195)
                </strong>
                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Often accompanied by renewed energy as early nausea subsides. Baby grows rapidly, reflexes strengthen, and the mid-pregnancy anatomy ultrasound is typically scheduled around Week 20.
                </span>
              </div>

              <div style={{ background: "var(--bg-primary)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.25rem" }}>
                  Third Trimester: Weeks 28 through 40+ (Days 196–280+)
                </strong>
                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Focuses on final fetal maturation, significant weight gain, lung development with surfactant production, and preparation for birth.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <Link href="/pregnancy-calculator" className="btn btn-secondary">
                Full Pregnancy Calculator →
              </Link>
              <Link href="/due-date-calculator" className="btn btn-secondary">
                Due Date Calculator →
              </Link>
              <Link href="/pregnancy-week-by-week" className="btn btn-secondary">
                Pregnancy Week by Week →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "3.5rem" }}>
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
