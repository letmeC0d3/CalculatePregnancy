import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/domain/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy & Health Data Protection",
  description:
    "Learn about our strict client-side privacy model. Your pregnancy dates and calculations remain entirely in your browser and are never transmitted to our servers or third parties.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div style={{ padding: "4rem 0" }}>
      <div className="container text-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-sage" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
            Privacy by Design
          </span>
          <h1 className="hero-title">Privacy Policy &amp; Data Protection</h1>
          <p className="hero-subtitle">
            Reproductive and pregnancy health information is deeply personal. Here is our unambiguous commitment to protecting your privacy.
          </p>
        </div>

        <div className="card" style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              1. 100% Client-Side Calculations
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              Every date entered into our pregnancy calculators—including your last menstrual period (LMP), cycle length, and target projection dates—is processed exclusively in your device&apos;s local browser memory. <strong>We do not transmit, log, store, or serialize your health dates to any remote server or backend database.</strong>
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              2. No Accounts &amp; No Sensitive Data Collection
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              CalculatePregnancy.com does not require user registration, passwords, email addresses, or names. You can use every calculation tool anonymously without creating a profile or leaving a digital footprint.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              3. No Third-Party Tracking or Advertising
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              We do not run commercial advertising networks, retargeting pixels, social media tracking tags, or data broker integrations. Your pregnancy dates will never be sold, auctioned, or used to serve targeted advertisements.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              4. Cookies and Local Storage
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              CalculatePregnancy.com does not set persistent tracking cookies or store health logs in your browser storage. If you refresh or close your browser tab, your entered dates are cleared from memory.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              5. Contact &amp; Questions
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              If you have any questions or feedback regarding our privacy standards or architectural security, please contact us at <code>privacy@calculatepregnancy.com</code>.
            </p>
          </section>

          <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-light)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-secondary">
              ← Return Home
            </Link>
            <Link href="/about" className="btn btn-secondary">
              About CalculatePregnancy.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
