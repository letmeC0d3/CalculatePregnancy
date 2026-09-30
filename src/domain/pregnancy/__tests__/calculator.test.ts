import { describe, it, expect } from "vitest";
import {
  parseISODate,
  formatISODate,
  toISODateString,
  addDays,
  differenceInDays,
  formatFriendlyDate,
  isCompleteInputDate,
} from "../dateUtils";
import {
  calculateDueDate,
  calculateConceptionDate,
  calculateGestationalAge,
  calculatePregnancyWeek,
  calculatePregnancyDay,
  calculateTrimester,
  calculateTrimesterSchedule,
  calculateGestationalAgeOnDate,
  calculateFullPregnancy,
} from "../calculator";
import {
  getAllWeeksData,
  getWeekData,
  getWeeksByTrimester,
  PREGNANCY_WEEKS_DATA,
} from "../../data/pregnancyWeeks";

describe("Date Utilities (Timezone Safety & Calendar Math)", () => {
  it("parses valid ISO date strings correctly", () => {
    expect(parseISODate("2026-05-15")).toEqual({ year: 2026, month: 5, day: 15 });
    expect(parseISODate("2024-02-29")).toEqual({ year: 2024, month: 2, day: 29 }); // leap year
  });

  it("rejects invalid calendar dates cleanly", () => {
    expect(parseISODate("2025-02-29")).toBeNull(); // non-leap year Feb 29
    expect(parseISODate("2026-04-31")).toBeNull(); // April has 30 days
    expect(parseISODate("invalid-date")).toBeNull();
    expect(parseISODate("")).toBeNull();
  });

  it("handles month boundaries correctly when adding days", () => {
    // Jan 30 + 5 days = Feb 4
    expect(addDays("2026-01-30", 5)).toBe("2026-02-04");
    // Feb 28 (non-leap 2025) + 2 days = Mar 2
    expect(addDays("2025-02-28", 2)).toBe("2025-03-02");
  });

  it("handles year boundaries correctly when adding days", () => {
    // Dec 25, 2026 + 10 days = Jan 4, 2027
    expect(addDays("2026-12-25", 10)).toBe("2027-01-04");
  });

  it("handles leap year calculations correctly", () => {
    expect(addDays("2024-02-27", 3)).toBe("2024-03-01");
    expect(calculateDueDate("2024-02-01")).toBe("2024-11-07");
  });

  it("computes accurate day differences across months and years", () => {
    expect(differenceInDays("2026-01-01", "2026-01-15")).toBe(14);
    expect(differenceInDays("2026-12-31", "2027-01-01")).toBe(1);
    expect(differenceInDays("2026-05-15", "2026-05-15")).toBe(0);
    expect(differenceInDays("2026-05-15", "2026-05-10")).toBe(-5);
  });

  it("formats friendly display dates accurately", () => {
    expect(formatFriendlyDate("2026-10-24")).toBe("October 24, 2026");
    expect(formatFriendlyDate("2026-10-24", { includeDayOfWeek: true })).toBe("Saturday, October 24, 2026");
  });

  it("recognizes complete vs partial 4-digit input dates", () => {
    expect(isCompleteInputDate("2026-05-15")).toBe(true);
    expect(isCompleteInputDate("0002-05-15")).toBe(false);
    expect(isCompleteInputDate("invalid")).toBe(false);
  });
});

describe("Canonical Pregnancy Calculation Engine", () => {
  describe("calculateDueDate (Naegele's Rule: LMP + 280 days)", () => {
    it("calculates accurate due date for standard 28-day cycle across year boundary", () => {
      const due = calculateDueDate("2026-05-15");
      expect(due).toBe("2027-02-19");
      expect(differenceInDays("2026-05-15", due)).toBe(280);
    });

    it("adjusts due date for non-standard cycle lengths", () => {
      const due32 = calculateDueDate("2026-05-15", 32);
      expect(differenceInDays("2026-05-15", due32)).toBe(284);
      expect(due32).toBe("2027-02-23");

      const due26 = calculateDueDate("2026-05-15", 26);
      expect(differenceInDays("2026-05-15", due26)).toBe(278);
      expect(due26).toBe("2027-02-17");
    });
  });

  describe("calculateConceptionDate", () => {
    it("estimates conception 14 days after LMP for 28-day cycle", () => {
      expect(calculateConceptionDate("2026-05-15")).toBe("2026-05-29");
    });

    it("adjusts conception for longer or shorter cycle", () => {
      expect(calculateConceptionDate("2026-05-15", 30)).toBe("2026-05-31");
    });
  });

  describe("calculateGestationalAge & Week Boundaries", () => {
    const lmp = "2026-01-01";

    it("calculates exact week and day boundaries", () => {
      const day0 = calculateGestationalAge(lmp, "2026-01-01");
      expect(day0.completedWeeks).toBe(0);
      expect(day0.remainingDays).toBe(0);
      expect(day0.currentWeekNumber).toBe(1);
      expect(day0.formatted).toBe("0 weeks");

      const day6 = calculateGestationalAge(lmp, "2026-01-07");
      expect(day6.completedWeeks).toBe(0);
      expect(day6.remainingDays).toBe(6);
      expect(day6.currentWeekNumber).toBe(1);
      expect(day6.formatted).toBe("0 weeks, 6 days");

      const day7 = calculateGestationalAge(lmp, "2026-01-08");
      expect(day7.completedWeeks).toBe(1);
      expect(day7.remainingDays).toBe(0);
      expect(day7.currentWeekNumber).toBe(2);
      expect(day7.formatted).toBe("1 week");

      const day80 = calculateGestationalAge(lmp, "2026-03-22");
      expect(day80.completedWeeks).toBe(11);
      expect(day80.remainingDays).toBe(3);
      expect(day80.currentWeekNumber).toBe(12);
      expect(day80.formatted).toBe("11 weeks, 3 days");
    });

    it("handles dates before LMP gracefully without crashing", () => {
      const beforeLmp = calculateGestationalAge(lmp, "2025-12-25");
      expect(beforeLmp.isPregnancyActive).toBe(false);
      expect(beforeLmp.totalDays).toBeLessThan(0);
      expect(beforeLmp.completedWeeks).toBe(0);
      expect(beforeLmp.remainingDays).toBe(0);
    });

    it("handles future dates accurately for 'How far along will I be on another date?'", () => {
      // 180 days after LMP (2026-01-01) is 2026-06-30 -> 25 weeks 5 days
      const future = calculateGestationalAgeOnDate(lmp, "2026-06-30");
      expect(future.completedWeeks).toBe(25);
      expect(future.remainingDays).toBe(5);
      expect(future.currentWeekNumber).toBe(26);
      expect(future.isPregnancyActive).toBe(true);
    });
  });

  describe("calculateTrimester (ACOG/Medical standard) & Schedule", () => {
    it("categorizes First Trimester (0w to 13w 6d / through completed week 13)", () => {
      expect(calculateTrimester(0).number).toBe(1);
      expect(calculateTrimester(12).number).toBe(1);
      expect(calculateTrimester(13).number).toBe(1); // Week 13 completed is in 1st trimester
    });

    it("categorizes Second Trimester (14w 0d to 27w 6d / weeks 14 to 27)", () => {
      expect(calculateTrimester(14).number).toBe(2); // Week 14 is start of 2nd trimester
      expect(calculateTrimester(20).number).toBe(2);
      expect(calculateTrimester(27).number).toBe(2);
    });

    it("categorizes Third Trimester (28w to 40+w)", () => {
      expect(calculateTrimester(28).number).toBe(3);
      expect(calculateTrimester(36).number).toBe(3);
      expect(calculateTrimester(40).number).toBe(3);
    });

    it("calculates accurate trimester date ranges for an LMP", () => {
      const lmp = "2026-01-01";
      const schedule = calculateTrimesterSchedule(lmp, "2026-05-01"); // approx week 17 (Trimester 2)
      expect(schedule.length).toBe(3);

      // Trimester 1
      expect(schedule[0].trimester).toBe(1);
      expect(schedule[0].startDate).toBe("2026-01-01");
      expect(schedule[0].endDate).toBe("2026-04-08"); // 97 days later
      expect(schedule[0].status).toBe("completed");

      // Trimester 2
      expect(schedule[1].trimester).toBe(2);
      expect(schedule[1].startDate).toBe("2026-04-09"); // 98 days
      expect(schedule[1].endDate).toBe("2026-07-15"); // 195 days
      expect(schedule[1].status).toBe("current");
      expect(schedule[1].isCurrent).toBe(true);

      // Trimester 3
      expect(schedule[2].trimester).toBe(3);
      expect(schedule[2].startDate).toBe("2026-07-16");
      expect(schedule[2].endDate).toBe("2026-10-08"); // 280 days
      expect(schedule[2].status).toBe("upcoming");
    });
  });

  describe("calculateFullPregnancy (Comprehensive pipeline)", () => {
    it("returns all calculated fields consistently for a representative pregnancy", () => {
      const lmp = "2026-02-01";
      const target = "2026-05-10"; // 98 days later = 14 weeks 0 days
      const result = calculateFullPregnancy(lmp, target, 28);

      expect(result.estimatedDueDate).toBe("2026-11-08");
      expect(result.conceptionDate).toBe("2026-02-15");
      expect(result.gestationalAge.completedWeeks).toBe(14);
      expect(result.gestationalAge.remainingDays).toBe(0);
      expect(result.trimester.number).toBe(2);
      expect(result.daysRemainingUntilDueDate).toBe(182);
      expect(result.percentageComplete).toBe(35);
      expect(result.milestones.fullTerm37Weeks).toBe("2026-10-18");
    });
  });
});

describe("Structured Pregnancy Weeks & Baby Size Data Model", () => {
  it("contains week 4 through week 40 in the dataset", () => {
    const allWeeks = getAllWeeksData();
    expect(allWeeks.length).toBe(37); // 40 - 4 + 1 = 37 weeks
    expect(allWeeks[0].week).toBe(4);
    expect(allWeeks[allWeeks.length - 1].week).toBe(40);
  });

  it("verifies week 4 and week 40 have valid, non-empty attributes", () => {
    const week4 = getWeekData(4);
    expect(week4.babySizeLabel).toBe("Poppy Seed");
    expect(week4.trimester).toBe(1);
    expect(week4.developmentSummary.length).toBeGreaterThan(20);
    expect(week4.medicalReviewStatus).toBe("source_verified");
    expect(week4.sources.length).toBeGreaterThanOrEqual(1);

    const week40 = getWeekData(40);
    expect(week40.babySizeLabel).toBe("Pumpkin");
    expect(week40.trimester).toBe(3);
    expect(week40.developmentSummary.length).toBeGreaterThan(20);
    expect(week40.medicalReviewStatus).toBe("source_verified");
    expect(week40.sources.length).toBeGreaterThanOrEqual(1);
  });

  it("handles missing or out-of-range weeks gracefully", () => {
    // Below 4 clamps to 4
    const clampedLow = getWeekData(1);
    expect(clampedLow.week).toBe(4);

    // Above 40 clamps to 40
    const clampedHigh = getWeekData(43);
    expect(clampedHigh.week).toBe(40);
  });

  it("groups weeks by trimester accurately", () => {
    const t1 = getWeeksByTrimester(1);
    const t2 = getWeeksByTrimester(2);
    const t3 = getWeeksByTrimester(3);

    expect(t1.every((w) => w.trimester === 1)).toBe(true);
    expect(t2.every((w) => w.trimester === 2)).toBe(true);
    expect(t3.every((w) => w.trimester === 3)).toBe(true);

    expect(t1.length + t2.length + t3.length).toBe(PREGNANCY_WEEKS_DATA.length);
  });

  it("verifies fetal measurement conventions across gestational progression", () => {
    // Weeks 4-5: embryonic disc
    expect(getWeekData(4).lengthMeasurementType).toBeNull();
    expect(getWeekData(5).lengthMeasurementType).toBeNull();

    // Weeks 6-19: crown-rump length (CRL)
    expect(getWeekData(6).lengthMeasurementType).toBe("crown-to-rump");
    expect(getWeekData(12).lengthMeasurementType).toBe("crown-to-rump");
    expect(getWeekData(19).lengthMeasurementType).toBe("crown-to-rump");
    expect(getWeekData(12).approximateLength).toContain("CRL");

    // Weeks 20-40: head-to-heel
    expect(getWeekData(20).lengthMeasurementType).toBe("head-to-heel");
    expect(getWeekData(30).lengthMeasurementType).toBe("head-to-heel");
    expect(getWeekData(40).lengthMeasurementType).toBe("head-to-heel");
    expect(getWeekData(20).approximateLength).toContain("head-to-heel");
  });

  it("verifies source citations and INTERGROWTH-21st weight data standards", () => {
    const allWeeks = getAllWeeksData();

    // Every week has source_verified status and at least 1 valid source reference
    for (const w of allWeeks) {
      expect(w.medicalReviewStatus).toBe("source_verified");
      expect(w.sources.length).toBeGreaterThanOrEqual(1);
      for (const src of w.sources) {
        expect(src.title).toBeTruthy();
        expect(src.publisher).toBeTruthy();
        expect(src.url.startsWith("https://")).toBe(true);
      }
    }

    // Weeks 4 to 21 intentionally have null weight (not standardized / unsupported)
    for (let wk = 4; wk <= 21; wk++) {
      expect(getWeekData(wk).approximateWeight).toBeNull();
    }

    // Weeks 22 to 40 have INTERGROWTH-21st 50th-percentile weight values
    expect(getWeekData(22).approximateWeight).toContain("525 g");
    expect(getWeekData(23).approximateWeight).toContain("592 g");
    expect(getWeekData(24).approximateWeight).toContain("668 g");
    expect(getWeekData(25).approximateWeight).toContain("756 g");
    expect(getWeekData(26).approximateWeight).toContain("856 g");
    expect(getWeekData(27).approximateWeight).toContain("969 g");
    expect(getWeekData(28).approximateWeight).toContain("1,097 g");
    expect(getWeekData(34).approximateWeight).toContain("2,162 g");
    expect(getWeekData(40).approximateWeight).toContain("3,338 g");

    // Verify 34 weeks have length measurements and exactly 3 weeks (26, 32, 37) omit unstandardized length
    const weeksWithLength = allWeeks.filter((w) => w.approximateLength !== null);
    const weeksWithoutLength = allWeeks.filter((w) => w.approximateLength === null);
    expect(weeksWithLength.length).toBe(34);
    expect(weeksWithoutLength.map((w) => w.week)).toEqual([26, 32, 37]);
  });
});

describe("Launch Readiness Edge Cases & Boundary Conditions", () => {
  it("handles LMP today (0 days pregnant) cleanly", () => {
    const today = "2026-09-30";
    const result = calculateGestationalAge(today, today);
    expect(result.completedWeeks).toBe(0);
    expect(result.remainingDays).toBe(0);
    expect(result.totalDays).toBe(0);
    expect(result.currentWeekNumber).toBe(1);
    expect(result.isPregnancyActive).toBe(true);
    expect(calculateTrimester(result.completedWeeks).number).toBe(1);
  });

  it("handles LMP yesterday (1 day pregnant) cleanly", () => {
    const lmp = "2026-09-29";
    const target = "2026-09-30";
    const result = calculateGestationalAge(lmp, target);
    expect(result.completedWeeks).toBe(0);
    expect(result.remainingDays).toBe(1);
    expect(result.totalDays).toBe(1);
    expect(result.currentWeekNumber).toBe(1);
  });

  it("verifies exact trimester boundary transitions", () => {
    // 13 weeks completed (e.g. Day 91 to Day 97) is First Trimester
    expect(calculateTrimester(13).number).toBe(1);
    expect(calculateTrimester(13).name).toBe("First Trimester");

    // 14 weeks completed (Day 98) enters Second Trimester
    expect(calculateTrimester(14).number).toBe(2);
    expect(calculateTrimester(14).name).toBe("Second Trimester");

    // 27 weeks completed (Day 189 to Day 195) is Second Trimester
    expect(calculateTrimester(27).number).toBe(2);
    expect(calculateTrimester(27).name).toBe("Second Trimester");

    // 28 weeks completed (Day 196) enters Third Trimester
    expect(calculateTrimester(28).number).toBe(3);
    expect(calculateTrimester(28).name).toBe("Third Trimester");

    // 40 weeks completed (Due date reached)
    expect(calculateTrimester(40).number).toBe(3);
  });

  it("clamps extreme cycle lengths safely between 20 and 45 days", () => {
    const lmp = "2026-01-01";
    // Extreme low (e.g. 10 days) clamps to 20 days (280 + (20-28) = 272 days)
    const dueLow = calculateDueDate(lmp, 10);
    expect(differenceInDays(lmp, dueLow)).toBe(272);

    // Extreme high (e.g. 60 days) clamps to 45 days (280 + (45-28) = 297 days)
    const dueHigh = calculateDueDate(lmp, 60);
    expect(differenceInDays(lmp, dueHigh)).toBe(297);
  });
});
