import Link from "next/link";

export const metadata = {
  title: "Page Not Found | CalculatePregnancy.com",
  description: "The requested pregnancy calculation page could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div style={{ padding: "5rem 0", textAlign: "center" }}>
      <div className="container text-container">
        <span className="badge badge-rose" style={{ marginBottom: "1rem", display: "inline-flex" }}>
          404 — Page Not Found
        </span>
        <h1 className="hero-title">We couldn&apos;t find that page</h1>
        <p className="hero-subtitle">
          The link you followed may have moved or no longer exists. Let&apos;s get you back to our
          pregnancy calculators and gestational tools.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
          <Link href="/" className="btn btn-primary">
            Return to Homepage
          </Link>
          <Link href="/pregnancy-calculator" className="btn btn-secondary">
            Pregnancy Calculator
          </Link>
          <Link href="/due-date-calculator" className="btn btn-secondary">
            Due Date Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
