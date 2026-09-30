/**
 * Date-only utilities for pregnancy calculations.
 * Ensures 100% deterministic arithmetic immune to browser local timezone shifts.
 */

export interface DateParts {
  year: number;
  month: number; // 1-12
  day: number;   // 1-31
}

/**
 * Parses YYYY-MM-DD string into year, month (1-12), day.
 * Returns null if format is invalid.
 */
export function parseISODate(dateStr: string): DateParts | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const match = dateStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  // Validate actual calendar days (handles leap years, 30 vs 31 days)
  // Note: Date.UTC(year) maps 0-99 to 1900-1999, so setUTCFullYear is used explicitly.
  const utcDate = new Date(Date.UTC(2000, month - 1, day));
  utcDate.setUTCFullYear(year);

  if (
    utcDate.getUTCFullYear() !== year ||
    utcDate.getUTCMonth() !== month - 1 ||
    utcDate.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}

/**
 * Checks whether a string is a syntactically valid and calendar-valid ISO date.
 */
export function isValidISODate(dateStr: string): boolean {
  return parseISODate(dateStr) !== null;
}

/**
 * Checks if an ISO date string has a reasonable 4-digit modern year (e.g. 2000-2099)
 * to guard against intermediate browser keystrokes like 0002-08-10.
 */
export function isCompleteInputDate(dateStr: string): boolean {
  const parts = parseISODate(dateStr);
  if (!parts) return false;
  return parts.year >= 1990 && parts.year <= 2100;
}

/**
 * Formats year, month (1-12), day into YYYY-MM-DD.
 */
export function formatISODate(parts: DateParts): string {
  const y = parts.year.toString().padStart(4, "0");
  const m = parts.month.toString().padStart(2, "0");
  const d = parts.day.toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Converts a Date object or YYYY-MM-DD string to a canonical YYYY-MM-DD string.
 * When a Date object is provided, local calendar year, month, and day are extracted.
 */
export function toISODateString(input: string | Date): string {
  if (typeof input === "string") {
    const parsed = parseISODate(input);
    if (!parsed) {
      throw new Error(`Invalid ISO date string: "${input}". Expected YYYY-MM-DD.`);
    }
    return formatISODate(parsed);
  }

  if (input instanceof Date && !isNaN(input.getTime())) {
    return `${input.getFullYear()}-${String(input.getMonth() + 1).padStart(2, "0")}-${String(input.getDate()).padStart(2, "0")}`;
  }

  throw new Error(`Invalid date input provided: ${input}`);
}

/**
 * Returns today's date formatted as YYYY-MM-DD in the local user's calendar.
 */
export function getTodayISODate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * Adds an integer number of days to a YYYY-MM-DD date.
 * Uses UTC timestamp arithmetic to avoid local daylight savings shifts.
 */
export function addDays(dateInput: string | Date, daysToAdd: number): string {
  const isoStr = toISODateString(dateInput);
  const parts = parseISODate(isoStr)!;
  const utcDate = new Date(Date.UTC(2000, parts.month - 1, parts.day));
  utcDate.setUTCFullYear(parts.year);

  const resultMs = utcDate.getTime() + daysToAdd * 86_400_000;
  const result = new Date(resultMs);

  return formatISODate({
    year: result.getUTCFullYear(),
    month: result.getUTCMonth() + 1,
    day: result.getUTCDate(),
  });
}

/**
 * Calculates calendar day difference (dateB - dateA).
 * Positive if dateB is after dateA.
 */
export function differenceInDays(dateA: string | Date, dateB: string | Date): number {
  const isoA = toISODateString(dateA);
  const isoB = toISODateString(dateB);

  const partsA = parseISODate(isoA)!;
  const partsB = parseISODate(isoB)!;

  const dateAObj = new Date(Date.UTC(2000, partsA.month - 1, partsA.day));
  dateAObj.setUTCFullYear(partsA.year);

  const dateBObj = new Date(Date.UTC(2000, partsB.month - 1, partsB.day));
  dateBObj.setUTCFullYear(partsB.year);

  return Math.round((dateBObj.getTime() - dateAObj.getTime()) / 86_400_000);
}

/**
 * Formats an ISO date into a warm, human-readable display string, e.g. "October 24, 2026"
 */
export function formatFriendlyDate(dateInput: string | Date, options?: { includeDayOfWeek?: boolean }): string {
  const iso = toISODateString(dateInput);
  const parts = parseISODate(iso)!;
  const date = new Date(Date.UTC(2000, parts.month - 1, parts.day));
  date.setUTCFullYear(parts.year);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const monthName = monthNames[date.getUTCMonth()];
  const dayNum = date.getUTCDate();
  const year = date.getUTCFullYear();

  if (options?.includeDayOfWeek) {
    const dayOfWeek = dayNames[date.getUTCDay()];
    return `${dayOfWeek}, ${monthName} ${dayNum}, ${year}`;
  }

  return `${monthName} ${dayNum}, ${year}`;
}
