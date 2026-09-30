import Link from "next/link";
import styles from "./PopularCalculators.module.css";

const CALCULATORS = [
  {
    title: "Pregnancy Calculator",
    href: "/pregnancy-calculator",
    desc: "Calculate due date, current weeks & days, trimester, and key milestones in one unified view.",
    icon: "🌱",
  },
  {
    title: "Due Date Calculator",
    href: "/due-date-calculator",
    desc: "Dedicated clinical calculation based on Naegele's 280-day obstetric formula and ultrasound dating context.",
    icon: "🗓️",
  },
  {
    title: "Pregnancy Week Calculator",
    href: "/pregnancy-week-calculator",
    desc: "Find out your exact week and day, and forecast how far along you will be on any future date.",
    icon: "⏱️",
  },
  {
    title: "Trimester Calculator",
    href: "/trimester-calculator",
    desc: "Identify your current trimester and map out your personalized 3-trimester calendar timeline.",
    icon: "🧭",
  },
  {
    title: "Baby Size by Week",
    href: "/baby-size-by-week",
    desc: "Follow along from week 4 to 40 with playful fruit and vegetable comparisons and development highlights.",
    icon: "🍋",
  },
  {
    title: "40-Week Journey Timeline",
    href: "/pregnancy-week-by-week",
    desc: "A browsable, week-by-week overview of fetal development milestones throughout all three trimesters.",
    icon: "📖",
  },
];

export default function PopularCalculators() {
  return (
    <section className={styles.section} aria-labelledby="popular-calc-title">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="badge badge-rose" style={{ marginBottom: "0.5rem" }}>
            Tools &amp; Utilities
          </span>
          <h2 id="popular-calc-title" className="section-title">
            Pregnancy Calculation &amp; Tracking Tools
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Every tool is designed to provide clear, calm, and accurate gestational information without noise or clutter.
          </p>
        </div>

        <div className={styles.grid}>
          {CALCULATORS.map((calc) => (
            <Link key={calc.title} href={calc.href} className={styles.calcCard}>
              <div>
                <span className={styles.icon} aria-hidden="true">{calc.icon}</span>
                <h3 className={styles.cardTitle}>{calc.title}</h3>
                <p className={styles.cardDesc}>{calc.desc}</p>
              </div>
              <div className={styles.cardLinkText}>
                Open tool <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
