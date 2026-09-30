import type { Metadata } from "next";
import { buildPageMetadata } from "@/domain/metadata";
import PregnancyCalculatorForm from "@/components/PregnancyCalculatorForm";
import FaqSection from "@/components/FaqSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Pregnancy Calculator — Due Date, Week, & Trimester Estimator",
  description:
    "Calculate your estimated due date, gestational age in weeks and days, conception date, and current trimester with our simple, private pregnancy calculator.",
  path: "/pregnancy-calculator",
});

export default function PregnancyCalculatorPage() {
  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-rose" style={{ marginBottom: "0.75rem" }}>
            Comprehensive Dating Tool
          </span>
          <h1 className="hero-title">Pregnancy Calculator</h1>
          <p className="hero-subtitle">
            Calculate your estimated due date, current pregnancy week, trimester, and milestones based
            on standard clinical obstetrical models.
          </p>
        </div>

        <PregnancyCalculatorForm showMilestones={true} />

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
