/**
 * Canonical Pregnancy Calculation Engine
 *
 * Implements standard obstetrical calculation models (Naegele's Rule, ACOG trimester conventions).
 * Designed as a pure TypeScript domain library with zero dependencies on React or browser APIs,
 * making it directly shareable with future React Native mobile apps.
 */

import {
  addDays,
  differenceInDays,
  formatFriendlyDate,
  getTodayISODate,
  toISODateString,
} from "./dateUtils";

export const STANDARD_GESTATION_DAYS = 280; // 40 weeks = 280 days
export const STANDARD_CYCLE_DAYS = 28;
export const STANDARD_LUTEAL_PHASE_DAYS = 14;

export type TrimesterNumber = 1 | 2 | 3;

export interface TrimesterInfo {
  number: TrimesterNumber;
  name: string;
  shortDescription: string;
  weekRange: string;
  dayRange: { start: number; end: number };
}

export interface TrimesterDateRange {
  trimester: TrimesterNumber;
  name: string;
  weekSpan: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: "completed" | "current" | "upcoming";
  description: string;
}

export interface GestationalAge {
  completedWeeks: number;
  remainingDays: number;
  totalDays: number;
  currentWeekNumber: number; // e.g. at 4w 3d, patient is in week 5
  formatted: string;
  isPregnancyActive: boolean;
  isPastDue: boolean;
}

export interface PregnancyCalculationResult {
  lmpDate: string;
  calculationDate: string;
  estimatedDueDate: string;
  conceptionDate: string;
  gestationalAge: GestationalAge;
  trimester: TrimesterInfo;
  daysRemainingUntilDueDate: number;
  percentageComplete: number;
  milestones: PregnancyMilestones;
}

export interface PregnancyMilestones {
  conceptionDate: string;
  firstTrimesterEnd: string;
  halfwayMark20Weeks: string;
  secondTrimesterEnd: string;
  fullTerm37Weeks: string;
  estimatedDueDate: string;
}

/**
 * Calculates Estimated Due Date (EDD) using standard Naegele's rule (LMP + 280 days),
 * with optional menstrual cycle length adjustment.
 */
export function calculateDueDate(
  lmpDate: string | Date,
  cycleLengthDays: number = STANDARD_CYCLE_DAYS
): string {
  const safeCycle = Math.max(20, Math.min(45, cycleLengthDays));
  const cycleOffset = safeCycle - STANDARD_CYCLE_DAYS;
  const totalDays = STANDARD_GESTATION_DAYS + cycleOffset;
  return addDays(lmpDate, totalDays);
}

/**
 * Calculates approximate conception / ovulation date.
 * Typically 14 days before next expected cycle: LMP + (cycleLength - 14) days.
 */
export function calculateConceptionDate(
  lmpDate: string | Date,
  cycleLengthDays: number = STANDARD_CYCLE_DAYS
): string {
  const safeCycle = Math.max(20, Math.min(45, cycleLengthDays));
  const ovulationOffset = safeCycle - STANDARD_LUTEAL_PHASE_DAYS;
  return addDays(lmpDate, ovulationOffset);
}

/**
 * Calculates gestational age (completed weeks, extra days, total days).
 * Target date defaults to today.
 */
export function calculateGestationalAge(
  lmpDate: string | Date,
  targetDate?: string | Date
): GestationalAge {
  const effectiveTarget = targetDate ? toISODateString(targetDate) : getTodayISODate();
  const totalDays = differenceInDays(lmpDate, effectiveTarget);

  if (totalDays < 0) {
    return {
      completedWeeks: 0,
      remainingDays: 0,
      totalDays,
      currentWeekNumber: 1,
      formatted: "0 weeks, 0 days",
      isPregnancyActive: false,
      isPastDue: false,
    };
  }

  const completedWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const currentWeekNumber = completedWeeks + 1;

  const isPregnancyActive = totalDays >= 0 && totalDays <= 308; // up to 44 weeks
  const isPastDue = totalDays > STANDARD_GESTATION_DAYS;

  const weekStr = completedWeeks === 1 ? "1 week" : `${completedWeeks} weeks`;
  const dayStr = remainingDays === 1 ? "1 day" : `${remainingDays} days`;
  const formatted = remainingDays === 0 ? weekStr : `${weekStr}, ${dayStr}`;

  return {
    completedWeeks,
    remainingDays,
    totalDays,
    currentWeekNumber,
    formatted,
    isPregnancyActive,
    isPastDue,
  };
}

/**
 * Returns completed pregnancy weeks (e.g. 12 at 12w 4d).
 */
export function calculatePregnancyWeek(
  lmpDate: string | Date,
  targetDate?: string | Date
): number {
  return calculateGestationalAge(lmpDate, targetDate).completedWeeks;
}

/**
 * Returns pregnancy day into the current week (0 to 6).
 */
export function calculatePregnancyDay(
  lmpDate: string | Date,
  targetDate?: string | Date
): number {
  return calculateGestationalAge(lmpDate, targetDate).remainingDays;
}

/**
 * Returns trimester information according to standard American College of
 * Obstetricians and Gynecologists (ACOG) / NHS gestational week divisions:
 * - Trimester 1: Weeks 1 - 13 (0w0d to 13w6d)
 * - Trimester 2: Weeks 14 - 27 (14w0d to 27w6d)
 * - Trimester 3: Weeks 28 - 40+ (28w0d to birth)
 */
export function calculateTrimester(completedWeeks: number): TrimesterInfo {
  if (completedWeeks <= 13) {
    return {
      number: 1,
      name: "First Trimester",
      shortDescription: "Weeks 1 through 13. A period of rapid cellular growth and organogenesis.",
      weekRange: "Weeks 1–13",
      dayRange: { start: 0, end: 97 },
    };
  }

  if (completedWeeks < 28) {
    return {
      number: 2,
      name: "Second Trimester",
      shortDescription: "Weeks 14 through 27. Often called the golden trimester as energy returns.",
      weekRange: "Weeks 14–27",
      dayRange: { start: 98, end: 195 },
    };
  }

  return {
    number: 3,
    name: "Third Trimester",
    shortDescription: "Weeks 28 through delivery. Rapid fetal weight gain and final maturation.",
    weekRange: "Weeks 28–40+",
    dayRange: { start: 196, end: 280 },
  };
}

/**
 * Calculates calendar date ranges for all three trimesters based on an LMP date.
 */
export function calculateTrimesterSchedule(
  lmpDate: string | Date,
  targetDate?: string | Date,
  cycleLengthDays: number = STANDARD_CYCLE_DAYS
): TrimesterDateRange[] {
  const lmpIso = toISODateString(lmpDate);
  const targetIso = targetDate ? toISODateString(targetDate) : getTodayISODate();
  const currentWeeks = calculatePregnancyWeek(lmpIso, targetIso);
  const currentTrimester = calculateTrimester(currentWeeks).number;

  const t1Start = lmpIso;
  const t1End = addDays(lmpIso, 13 * 7 + 6); // 13w 6d = 97 days

  const t2Start = addDays(lmpIso, 14 * 7); // 14w 0d = 98 days
  const t2End = addDays(lmpIso, 27 * 7 + 6); // 27w 6d = 195 days

  const t3Start = addDays(lmpIso, 28 * 7); // 28w 0d = 196 days
  const t3End = calculateDueDate(lmpIso, cycleLengthDays);

  return [
    {
      trimester: 1,
      name: "First Trimester",
      weekSpan: "Weeks 1–13 (0w 0d to 13w 6d)",
      startDate: t1Start,
      endDate: t1End,
      isCurrent: currentTrimester === 1,
      status: currentTrimester > 1 ? "completed" : currentTrimester === 1 ? "current" : "upcoming",
      description: "From fertilization through organogenesis and the 12-week development milestone.",
    },
    {
      trimester: 2,
      name: "Second Trimester",
      weekSpan: "Weeks 14–27 (14w 0d to 27w 6d)",
      startDate: t2Start,
      endDate: t2End,
      isCurrent: currentTrimester === 2,
      status: currentTrimester > 2 ? "completed" : currentTrimester === 2 ? "current" : "upcoming",
      description: "Rapid fetal growth, emergence of coordinated movements, and the 20-week anatomy scan.",
    },
    {
      trimester: 3,
      name: "Third Trimester",
      weekSpan: "Weeks 28–40+ (28w 0d to delivery)",
      startDate: t3Start,
      endDate: t3End,
      isCurrent: currentTrimester === 3,
      status: currentTrimester === 3 ? "current" : "upcoming",
      description: "Subcutaneous fat gain, lung maturation, and preparation for labor and delivery.",
    },
  ];
}

/**
 * Calculates gestational age on an arbitrary future or past date.
 */
export function calculateGestationalAgeOnDate(
  lmpDate: string | Date,
  futureDate: string | Date
): GestationalAge {
  return calculateGestationalAge(lmpDate, futureDate);
}

/**
 * Calculates key milestone dates across the 40 weeks.
 */
export function calculatePregnancyMilestones(
  lmpDate: string | Date,
  cycleLengthDays: number = STANDARD_CYCLE_DAYS
): PregnancyMilestones {
  const conceptionDate = calculateConceptionDate(lmpDate, cycleLengthDays);
  const firstTrimesterEnd = addDays(lmpDate, 13 * 7 + 6); // 13w 6d
  const halfwayMark20Weeks = addDays(lmpDate, 20 * 7);    // 20w 0d
  const secondTrimesterEnd = addDays(lmpDate, 27 * 7 + 6); // 27w 6d
  const fullTerm37Weeks = addDays(lmpDate, 37 * 7);       // 37w 0d
  const estimatedDueDate = calculateDueDate(lmpDate, cycleLengthDays);

  return {
    conceptionDate,
    firstTrimesterEnd,
    halfwayMark20Weeks,
    secondTrimesterEnd,
    fullTerm37Weeks,
    estimatedDueDate,
  };
}

/**
 * Comprehensive calculator helper returning all pregnancy data points at once.
 */
export function calculateFullPregnancy(
  lmpDate: string | Date,
  targetDate?: string | Date,
  cycleLengthDays: number = STANDARD_CYCLE_DAYS
): PregnancyCalculationResult {
  const lmpIso = toISODateString(lmpDate);
  const targetIso = targetDate ? toISODateString(targetDate) : getTodayISODate();

  const estimatedDueDate = calculateDueDate(lmpIso, cycleLengthDays);
  const conceptionDate = calculateConceptionDate(lmpIso, cycleLengthDays);
  const gestationalAge = calculateGestationalAge(lmpIso, targetIso);
  const trimester = calculateTrimester(gestationalAge.completedWeeks);
  const milestones = calculatePregnancyMilestones(lmpIso, cycleLengthDays);

  const daysRemaining = differenceInDays(targetIso, estimatedDueDate);
  const clampedTotalDays = Math.max(0, Math.min(STANDARD_GESTATION_DAYS, gestationalAge.totalDays));
  const percentageComplete = Math.min(100, Math.round((clampedTotalDays / STANDARD_GESTATION_DAYS) * 100));

  return {
    lmpDate: lmpIso,
    calculationDate: targetIso,
    estimatedDueDate,
    conceptionDate,
    gestationalAge,
    trimester,
    daysRemainingUntilDueDate: daysRemaining,
    percentageComplete,
    milestones,
  };
}
