import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/domain/metadata";
import PregnancyWeekCalculatorForm from "@/components/PregnancyWeekCalculatorForm";
import FaqSection from "@/components/FaqSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Pregnancy Week Calculator — How Many Weeks Pregnant Am I?",
  description:
    "Find out exactly how many weeks and days pregnant you are. Calculate your current week, trimester, and see how far along you will be on any future date.",
  path: "/pregnancy-week-calculator",
});

export default function PregnancyWeekCalculatorPage() {
  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-rose" style={{ marginBottom: "0.75rem" }}>
            Gestational Week &amp; Day Estimator
          </span>
          <h1 className="hero-title">Pregnancy Week Calculator</h1>
          <p className="hero-subtitle">
            Quickly understand how many weeks and days pregnant you are, what trimester you are in,
            and calculate your gestational age for any future date.
          </p>
        </div>

        <PregnancyWeekCalculatorForm />

        {/* Informational Section & Internal Links */}
        <div className="text-container" style={{ marginTop: "4.5rem" }}>
          <div className="card" style={{ padding: "2.5rem 2rem" }}>
            <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              How Are Pregnancy Weeks Counted?
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65", marginBottom: "1.25rem" }}>
              In clinical obstetrics, pregnancy is measured in <strong>completed weeks plus additional days</strong>.
              For example, if your calculator result reads <em>14 weeks, 3 days</em>:
            </p>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--text-secondary)", lineHeight: "1.65", marginBottom: "1.5rem" }}>
              <li>You have finished 14 full weeks of gestation.</li>
              <li>You are currently 3 days into your 15th week of pregnancy.</li>
              <li>You have officially entered the Second Trimester (which begins at 14 weeks, 0 days).</li>
            </ul>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              Explore Related Pregnancy Tools
            </h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/due-date-calculator" className="btn btn-secondary">
                Due Date Calculator →
              </Link>
              <Link href="/trimester-calculator" className="btn btn-secondary">
                Trimester Calculator →
              </Link>
              <Link href="/baby-size-by-week" className="btn btn-secondary">
                Baby Size by Week →
              </Link>
              <Link href="/pregnancy-week-by-week" className="btn btn-secondary">
                40-Week Timeline →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "4rem" }}>
          <HowItWorksSection />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
