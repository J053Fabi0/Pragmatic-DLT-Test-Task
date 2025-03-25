import type { Moment } from "moment";

/**
 * Returns true if the date is the nth day of the season
 * @param date - The date to check
 * @param nth - The nth day of the season
 * @returns true if the date is the nth day of the season
 */
export default function getIsNthOfSeason(date: Moment, nth: number): boolean {
  const day = date.format("DD");
  if (nth.toString().padStart(2, "0") !== day) return false;

  const month = date.format("MM");
  // march, june, september, december
  return month === "03" || month === "06" || month === "09" || month === "12";
}
