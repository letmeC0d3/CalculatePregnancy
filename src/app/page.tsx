import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/domain/metadata";
import PregnancyCalculatorForm from "@/components/PregnancyCalculatorForm";
import PopularCalculators from "@/components/PopularCalculators";
import BabySizePreview from "@/components/BabySizePreview";
import HowItWorksSection from "@/components/HowItWorksSection";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Calculate Your Pregnancy Journey — Due Date & Week Calculators",
  description:
    "Simple pregnancy calculators to help you understand your due date, pregnancy week, trimester, and baby size. Private, calm, and accurate calculations.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <section
        style={{
          padding: "4.5rem 0 3.5rem 0",
          textAlign: "center",
          background: "linear-gradient(180deg, #FBF8F5 0%, #FAF8F5 100%)",
        }}
      >
        <div className="container text-container">
          <span
            className="badge badge-rose"
            style={{ marginBottom: "1rem", display: "inline-flex" }}
          >
            Pregnancy &amp; Gestational Utilities
          </span>
          <h1 className="hero-title">Calculate your pregnancy journey</h1>
          <p className="hero-subtitle">
            Simple pregnancy calculators to help you understand your due date, pregnancy week,
            trimester, and more.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a href="#calculator" className="btn btn-primary">
              Calculate my pregnancy ↓
            </a>
            <Link href="/due-date-calculator" className="btn btn-secondary">
              Due Date Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Pregnancy Calculator */}
      <section id="calculator" style={{ padding: "1.5rem 0 3.5rem 0" }}>
        <div className="container">
          <PregnancyCalculatorForm />
        </div>
      </section>

      {/* 3. Popular Calculators Grid */}
      <PopularCalculators />

      {/* 4. Pregnancy Week-by-Week Overview Teaser */}
      <section
        style={{
          padding: "4rem 0",
          background: "var(--bg-primary)",
        }}
      >
        <div className="container text-container" style={{ textAlign: "center" }}>
          <span className="badge badge-sage" style={{ marginBottom: "0.75rem" }}>
            The 40-Week Journey
          </span>
          <h2 className="section-title">Pregnancy Week by Week</h2>
          <p className="section-subtitle" style={{ margin: "0 auto 2rem auto" }}>
            From blastocyst implantation to full-term preparation, track how your baby transforms
            and what physiological shifts to anticipate across all three trimesters.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link href="/pregnancy-calculator" className="btn btn-primary">
              Find my current week
            </Link>
            <a href="#baby-size" className="btn btn-secondary">
              Explore baby sizes by week
            </a>
          </div>
        </div>
      </section>

      {/* 5. Baby Size by Week */}
      <BabySizePreview />

      {/* 6. Short explanation of how pregnancy weeks are calculated */}
      <HowItWorksSection />

      {/* 7. FAQ */}
      <FaqSection />
    </>
  );
}
