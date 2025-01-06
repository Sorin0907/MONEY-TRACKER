/**
 * Format a timestamp to a European date format (dd/mm/yyyy).
 * @param {*} timestamp 
 * @returns
 * @example const timestamp = 1704067200000;
 * const formattedDate = formatEuropeanDate(timestamp); 
 */
export function formatEuropeanDate(timestamp) {
  const date = new Date(parseInt(timestamp, 10));
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}