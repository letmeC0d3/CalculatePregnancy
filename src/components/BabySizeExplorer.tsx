"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  getAllWeeksData,
  getWeekData,
  PregnancyWeekData,
} from "@/domain/data/pregnancyWeeks";
import styles from "./BabySizeExplorer.module.css";

export default function BabySizeExplorer({ initialWeek = 14 }: { initialWeek?: number }) {
  const allWeeks = getAllWeeksData();
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);
  const [trimesterFilter, setTrimesterFilter] = useState<0 | 1 | 2 | 3>(0);

  const activeWeekData: PregnancyWeekData = getWeekData(selectedWeek);

  const displayedWeeks = trimesterFilter === 0
    ? allWeeks
    : allWeeks.filter((w) => w.trimester === trimesterFilter);

  return (
    <div className={styles.explorerWrapper}>
      {/* 1. Week Navigation & Trimester Filter Bar */}
      <div className={styles.weekNavContainer}>
        <div className={styles.filterHeader}>
          <span className={styles.filterTitle}>Select Pregnancy Week:</span>
          <div className={styles.trimesterTabs} role="tablist" aria-label="Filter by Trimester">
            <button
              role="tab"
              aria-selected={trimesterFilter === 0}
              className={`${styles.trimesterTab} ${trimesterFilter === 0 ? styles.trimesterTabActive : ""}`}
              onClick={() => setTrimesterFilter(0)}
            >
              All Weeks (4–40)
            </button>
            <button
              role="tab"
              aria-selected={trimesterFilter === 1}
              className={`${styles.trimesterTab} ${trimesterFilter === 1 ? styles.trimesterTabActive : ""}`}
              onClick={() => setTrimesterFilter(1)}
            >
              1st Trimester (4–13)
            </button>
            <button
              role="tab"
              aria-selected={trimesterFilter === 2}
              className={`${styles.trimesterTab} ${trimesterFilter === 2 ? styles.trimesterTabActive : ""}`}
              onClick={() => setTrimesterFilter(2)}
            >
              2nd Trimester (14–27)
            </button>
            <button
              role="tab"
              aria-selected={trimesterFilter === 3}
              className={`${styles.trimesterTab} ${trimesterFilter === 3 ? styles.trimesterTabActive : ""}`}
              onClick={() => setTrimesterFilter(3)}
            >
              3rd Trimester (28–40)
            </button>
          </div>
        </div>

        {/* Horizontal scrollable week selector */}
        <div className={styles.weekScrollTrack} role="region" aria-label="Week selector carousel">
          {displayedWeeks.map((item) => {
            const isActive = item.week === selectedWeek;
            return (
              <button
                key={item.week}
                type="button"
                className={`${styles.weekPill} ${isActive ? styles.weekPillActive : ""}`}
                onClick={() => setSelectedWeek(item.week)}
                aria-label={`Select Week ${item.week}, ${item.babySizeLabel}`}
                aria-pressed={isActive}
              >
                <span className={styles.pillNumber}>W{item.week}</span>
                <span className={styles.pillIcon} aria-hidden="true">{item.sizeIcon}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Featured Week Spotlight */}
      <section className={styles.featuredCard} aria-labelledby="featured-week-heading">
        <div className={styles.featuredGrid}>
          <div className={styles.illustrationBox}>
            <div className={styles.giantIcon} aria-hidden="true">{activeWeekData.sizeIcon}</div>
            <div className={styles.sizeMetaphorName}>{activeWeekData.babySizeLabel}</div>
            <span className={styles.metaphorTag}>Size Comparison</span>
          </div>

          <div className={styles.featuredContent}>
            <div className={styles.featuredBadgeRow}>
              <span className="badge badge-rose">Week {activeWeekData.week} of 40</span>
              <span className="badge badge-sage">Trimester {activeWeekData.trimester}</span>
              <span className="badge badge-sage" style={{ background: "var(--bg-sage)", color: "var(--accent-sage)" }}>
                ✓ Source-Verified
              </span>
            </div>

            <h2 id="featured-week-heading" className={styles.weekTitle}>
              Week {activeWeekData.week}: Your baby is about the size of a {activeWeekData.babySizeLabel.toLowerCase()}
            </h2>

            <div className={styles.fetalStatsRow}>
              <div className={styles.statItem}>
                <strong>Approximate Length</strong>
                <span>{activeWeekData.approximateLength ?? "Length estimate not shown for this week."}</span>
                <small style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  {activeWeekData.lengthMeasurementType === "crown-to-rump"
                    ? "Crown-to-Rump Length (CRL)"
                    : activeWeekData.lengthMeasurementType === "head-to-heel"
                    ? "Crown-to-Heel Length"
                    : "Early Embryonic Stage"}
                </small>
              </div>
              <div className={styles.statItem}>
                <strong>Estimated Fetal Weight</strong>
                <span>
                  {activeWeekData.approximateWeight ??
                    "Estimated fetal weight is shown from week 22 using the INTERGROWTH-21st fetal-growth standard."}
                </span>
                <small style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  {activeWeekData.approximateWeight
                    ? "50th-percentile reference value (individual fetal growth varies)"
                    : "Reference standard begins at week 22"}
                </small>
              </div>
            </div>

            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "1.25rem", lineHeight: "1.45" }}>
              <strong>Measurement Convention:</strong> Weeks 6–19 reflect Crown-Rump Length (CRL, head to buttocks) per clinical ultrasound standards. From Week 20 onward, measurements reflect total Crown-to-Heel length. Individual fetal growth rates vary naturally.
            </div>

            <p className={styles.devSummaryText}>{activeWeekData.developmentSummary}</p>

            <div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Key Development Highlights
              </h3>
              <ul className={styles.milestonesList}>
                {activeWeekData.keyMilestones.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>

            {/* Source citations for active week */}
            {activeWeekData.sources && activeWeekData.sources.length > 0 && (
              <details style={{ marginTop: "1.25rem", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <summary style={{ cursor: "pointer", fontSize: "0.8125rem", color: "var(--accent-terracotta)", fontWeight: 600 }}>
                  Published References ({activeWeekData.sources.length})
                </summary>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0.35rem 0" }}>
                  External medical sources are cited for educational reference and do not constitute an endorsement.
                </div>
                <ul style={{ margin: "0.35rem 0 0 1rem", fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  {activeWeekData.sources.map((src, i) => (
                    <li key={i} style={{ marginBottom: "0.35rem" }}>
                      <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>
                        <strong>{src.title}</strong>
                      </a>{" "}
                      — {src.publisher}{src.year ? ` (${src.year})` : ""}{src.doi ? ` [DOI: ${src.doi}]` : ""}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem", alignItems: "center" }}>
              <Link href={`/pregnancy-week-by-week#week-${activeWeekData.week}`} className="btn btn-secondary">
                Read Week {activeWeekData.week} Full Timeline →
              </Link>
              <Link href="/pregnancy-week-calculator" style={{ fontSize: "0.875rem", color: "var(--accent-terracotta)", fontWeight: 600 }}>
                Calculate your current week →
              </Link>
            </div>
          </div>
        </div>

        <div className="disclaimer-box" style={{ marginTop: "2rem" }}>
          <span className="disclaimer-icon">💡</span>
          <div>
            <strong>Educational Notice:</strong> Pregnancy development varies from person to person. The measurements and developmental information on this site are general educational estimates compiled from published medical and scientific sources. They are not intended to diagnose, monitor, or replace advice from a healthcare professional.
          </div>
        </div>
      </section>

      {/* 3. Browsable Gallery Grid of All Weeks */}
      <section className={styles.gallerySection} aria-labelledby="all-weeks-title">
        <h2 id="all-weeks-title" className={styles.galleryTitle}>
          All Pregnancy Weeks at a Glance (Weeks 4–40)
        </h2>
        <p className={styles.gallerySubtitle}>
          Click any week card below to spotlight its developmental milestones above or compare growth throughout pregnancy.
        </p>

        <div className={styles.galleryGrid}>
          {allWeeks.map((weekItem) => (
            <article
              key={weekItem.week}
              id={`week-${weekItem.week}`}
              className={`${styles.galleryCard} ${
                weekItem.week === selectedWeek ? styles.galleryCardActive : ""
              }`}
              onClick={() => {
                setSelectedWeek(weekItem.week);
                window.scrollTo({ top: 180, behavior: "smooth" });
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedWeek(weekItem.week);
                  window.scrollTo({ top: 180, behavior: "smooth" });
                }
              }}
              aria-label={`View Week ${weekItem.week}, ${weekItem.babySizeLabel}`}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-rose" style={{ fontSize: "0.75rem" }}>Week {weekItem.week}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    Trimester {weekItem.trimester}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "2rem" }} aria-hidden="true">{weekItem.sizeIcon}</span>
                  <div>
                    <div style={{ fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                      Size comparison
                    </div>
                    <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {weekItem.babySizeLabel}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "0.75rem", borderBottom: "1px dashed var(--border-light)", paddingBottom: "0.5rem" }}>
                  {weekItem.approximateLength && <span>{weekItem.approximateLength}</span>}
                  {weekItem.approximateLength && weekItem.approximateWeight && <span> • </span>}
                  {weekItem.approximateWeight && <span>{weekItem.approximateWeight.split(" (")[0]}</span>}
                  {!weekItem.approximateLength && !weekItem.approximateWeight && <span>Length estimate not shown for this week</span>}
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  {weekItem.developmentSummary}
                </p>
              </div>

              <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)", fontSize: "0.8125rem", color: "var(--accent-terracotta)", fontWeight: 600 }}>
                Spotlight this week ↑
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
