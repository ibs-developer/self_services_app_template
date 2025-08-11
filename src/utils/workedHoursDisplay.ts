export function formatWorkedHoursToHHMM(hoursDecimal: number): string {
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

export function formatWorkedHoursToISOString(
  hoursDecimal: number | undefined,
): string {
  if (hoursDecimal === undefined || hoursDecimal < 0) {
    return new Date().toISOString(); // Return current time if input is invalid
  }
  const now = new Date();
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);
  now.setUTCHours(hours, minutes, 0, 0);
  return now.toISOString();
}
