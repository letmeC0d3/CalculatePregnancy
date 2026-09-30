import type { Metadata } from "next";
import { buildPageMetadata } from "@/domain/metadata";
import BabySizeExplorer from "@/components/BabySizeExplorer";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Baby Size by Week — Fetal Growth & Fruit Comparisons (Weeks 4–40)",
  description:
    "Follow your baby's growth week by week with delightful fruit and vegetable comparisons, approximate lengths, weights, and key developmental milestones.",
  path: "/baby-size-by-week",
});

export default function BabySizeByWeekPage() {
  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-rose" style={{ marginBottom: "0.75rem" }}>
            Visual Size Metaphors &amp; Development
          </span>
          <h1 className="hero-title">Baby Size by Week</h1>
          <p className="hero-subtitle">
            Track how your little one grows each week—from a tiny poppy seed at Week 4 to a full-term
            small pumpkin at Week 40.
          </p>
        </div>

        <BabySizeExplorer initialWeek={16} />

        <div style={{ marginTop: "5rem" }}>
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
