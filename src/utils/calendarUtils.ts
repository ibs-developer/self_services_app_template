// calendarUtils.ts
import { THrLeave, THrLeaveType } from '@/types/index';

// Sample mapping from odoo colors or status to hex (customize as needed)
const colorMap: { [key: string]: string } = {
  validated: '#34D399', // green-400
  refused: '#F87171', // red-400
  draft: '#FBBF24', // yellow-400
  default: '#3B82F6', // blue-500
};

export const mapHrLeaveToCalendarEvent = (
  leaves: THrLeave[],
  types: THrLeaveType[],
) => {
  return leaves.map((leave) => {
    const type = types.find((t) => t.id ===  leave.holiday_status_id?.[0]);
    const colorKey = type?.color || 'default';
    const colorHex = colorMap[colorKey] || colorMap['default'];

    return {
      id: leave.id,
      startDate: leave.date_from,
      endDate: leave.date_to,
      color: colorHex,
    };
  });
};

/**
 * Converts Odoo time string (e.g. "8", "8.5", "23.5") to a JS Date object (today's date).
 */
export function odooTimeStringToDate(timeStr: string): Date {
  const [hours, half] = timeStr.split('.');
  const date = new Date();
  date.setHours(Number(hours), half === '5' ? 30 : 0, 0, 0);
  return date;
}

/**
 * Converts a JS Date object to Odoo time string ("8", "8.5", etc.).
 */
export function dateToOdooTimeString(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return minutes >= 30 ? `${hours}.5` : `${hours}`;
}

/**
 * Converts Odoo time string to a human-readable time (e.g. "8:00 AM", "8:30 PM").
 */
export function odooTimeStringToDisplay(timeStr: string): string {
  const date = odooTimeStringToDate(timeStr);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes === 0 ? '00' : '30'} ${ampm}`;
}
