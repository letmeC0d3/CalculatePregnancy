import React from "react";
import styles from "./FaqSection.module.css";

const FAQS = [
  {
    question: "How is a pregnancy due date calculated?",
    answer:
      "Medical providers calculate estimated due dates using Naegele's rule: by adding 280 days (40 weeks) to the first day of your last normal menstrual period (LMP). If your menstrual cycle is regularly longer or shorter than the standard 28-day model, the calculation can be adjusted accordingly.",
  },
  {
    question: "How many weeks is a full-term pregnancy?",
    answer:
      "A full-term pregnancy is generally considered 40 weeks (280 days) from your LMP. Medical guidelines classify babies born between 37 weeks and 38 weeks and 6 days as 'early term', between 39 weeks and 40 weeks and 6 days as 'full term', and 41 weeks to 41 weeks and 6 days as 'late term'.",
  },
  {
    question: "How are pregnancy weeks counted?",
    answer:
      "Pregnancy weeks describe completed weeks plus extra days. For example, if you are at '12 weeks, 3 days', you have completed 12 full weeks and are currently experiencing your 13th week of pregnancy.",
  },
  {
    question: "What is the difference between gestational age and conception age?",
    answer:
      "Gestational age is measured from the first day of your last period, before ovulation and fertilization actually occur. Conception age (fetal age) begins at the moment the egg is fertilized, which typically takes place approximately 14 days after your period. Gestational age is standard in medical obstetrics.",
  },
  {
    question: "Can my healthcare provider give me a different due date?",
    answer:
      "Yes, and this is completely normal. An early first-trimester ultrasound dating scan (crown-rump length measurement) provides the most precise estimate of fetal development. If there is a notable discrepancy between your LMP date and the ultrasound measurement, your clinician will update your official estimated due date.",
  },
  {
    question: "How accurate is an estimated due date?",
    answer:
      "Only about 4% to 5% of babies arrive precisely on their estimated due date. It is best considered an estimated arrival window; roughly 80% of healthy infants are born within a two-week window before or after the estimated date.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.intro}>
          <span className="badge badge-sage" style={{ marginBottom: "0.5rem" }}>
            Common Questions
          </span>
          <h2 id="faq-title" className="section-title">
            Pregnancy Calculation FAQ
          </h2>
          <p className="section-subtitle">
            Reliable, evidence-based answers to frequently asked questions about gestational dating and timelines.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((faq, idx) => (
            <details key={idx} className={styles.faqItem} open={idx === 0}>
              <summary className={styles.faqSummary}>
                <span>{faq.question}</span>
                <span className={styles.faqIndicator} aria-hidden="true">+</span>
              </summary>
              <div className={styles.faqAnswer}>{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
