/**
 * Formats a number with commas, a dollar sign, and a decimal point.
 * @param number - The number to format.
 * @returns The formatted number.
 */
export default function numberWithCommas(number: number) {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
