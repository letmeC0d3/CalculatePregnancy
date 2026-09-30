import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/domain/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About CalculatePregnancy.com — Clinical Conventions & Editorial Standards",
  description:
    "Learn about CalculatePregnancy.com, our obstetrical calculation models, Naegele's rule, ACOG trimester conventions, and our clinical editorial review standards.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div style={{ padding: "4rem 0" }}>
      <div className="container text-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-rose" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
            Evidence-Based Dating
          </span>
          <h1 className="hero-title">About CalculatePregnancy.com</h1>
          <p className="hero-subtitle">
            An independent, calm, and private gestational calculator built on established obstetrical standards.
          </p>
        </div>

        <div className="card" style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              Our Mission
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              When learning about a pregnancy, expecting parents are frequently bombarded by advertising-heavy websites, confusing calculators, and alarming claims. CalculatePregnancy.com was built to provide a calm, beautifully designed, and scientifically transparent space to answer fundamental gestational questions without clutter or trackers.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              Obstetrical Conventions We Follow
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
              <div style={{ background: "var(--bg-primary)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.25rem" }}>
                  Naegele&apos;s Rule (280 Days / 40 Weeks)
                </strong>
                <span style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  We date pregnancies from the first day of the last menstrual period (LMP) plus 280 calendar days, with standard cycle-length adjustment modifiers for cycles differing from the traditional 28-day model.
                </span>
              </div>

              <div style={{ background: "var(--bg-primary)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.25rem" }}>
                  Trimester Boundaries (ACOG / NHS Standards)
                </strong>
                <span style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Following the American College of Obstetricians and Gynecologists (ACOG) and UK National Health Service (NHS) guidelines, our tools group the First Trimester as Weeks 1–13 (days 0–97), the Second Trimester as Weeks 14–27 (days 98–195), and the Third Trimester as Weeks 28–40+ (days 196–280+).
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              Editorial &amp; Source-Verification Standards
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              Our developmental milestones, fetal growth estimates, and week-by-week information are compiled from identified authoritative medical and scientific publications: the American College of Obstetricians and Gynecologists (ACOG), the UK National Health Service (NHS), and the INTERGROWTH-21st Project (University of Oxford) for international 50th-percentile fetal weight standards.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65", marginTop: "0.5rem" }}>
              All 37 weekly entries carry an editorial status of <code>source_verified</code>, meaning content has been checked against published scientific and clinical literature rather than commercial parenting blogs. This editorial status reflects source alignment and does not constitute clinical review, physician certification, or diagnostic validation. Cited medical sources are referenced for educational context and do not constitute endorsements.
            </p>
          </section>

          <section>
            <div className="disclaimer-box">
              <span className="disclaimer-icon">ℹ️</span>
              <div>
                <strong>Medical Notice:</strong> CalculatePregnancy.com is an educational and informational tool. It is not clinical diagnostic software and cannot replace the care, ultrasound assessments, or clinical recommendations of your obstetrician, midwife, or certified maternal healthcare provider.
              </div>
            </div>
          </section>

          <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-light)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-secondary">
              ← Return Home
            </Link>
            <Link href="/privacy" className="btn btn-secondary">
              View Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
