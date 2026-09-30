import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/domain/metadata";
import PregnancyTimeline from "@/components/PregnancyTimeline";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Pregnancy Week by Week — 40-Week Development Timeline & Guide",
  description:
    "Explore the complete 40-week pregnancy journey week by week. Track fetal growth milestones, developmental transformations, and trimester transitions with clear medical context.",
  path: "/pregnancy-week-by-week",
});

export default function PregnancyWeekByWeekPage() {
  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="badge badge-sage" style={{ marginBottom: "0.75rem" }}>
            The Complete 40-Week Journey
          </span>
          <h1 className="hero-title">Pregnancy Week by Week</h1>
          <p className="hero-subtitle">
            Follow along through every stage of your pregnancy—from early embryonic implantation
            to full-term delivery preparation.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <Link href="/pregnancy-week-calculator" className="btn btn-primary">
              Calculate my current week
            </Link>
            <Link href="/baby-size-by-week" className="btn btn-secondary">
              Explore baby sizes by week
            </Link>
          </div>
        </div>

        <PregnancyTimeline />

        {/* Closing Helpful Navigation Card */}
        <section style={{ marginTop: "4rem" }}>
          <div className="card text-container" style={{ textAlign: "center", padding: "2.5rem 2rem" }}>
            <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
              Need Help Finding Where You Are?
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Enter the first day of your last period into our simple calculator to determine your
              exact gestational age in weeks and days.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/pregnancy-week-calculator" className="btn btn-primary">
                Open Week Calculator
              </Link>
              <Link href="/due-date-calculator" className="btn btn-secondary">
                Due Date Calculator
              </Link>
            </div>
          </div>
        </section>

        <div style={{ marginTop: "4rem" }}>
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
