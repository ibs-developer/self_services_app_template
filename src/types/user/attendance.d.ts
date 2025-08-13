
import { OdooFalseOr } from '../global';

/**
 * User's attendance details and statistics
 */
export type TUserAttendanceDetails = {
  attendance_ids: number[];
  last_attendance_id: OdooFalseOr<number>;
  last_check_in: OdooFalseOr<string>;
  last_check_out: OdooFalseOr<string>;
  attendance_state: string; // Keep as string - enum values may change from backend
  hours_last_month: number;
  hours_today: number;
  hours_last_month_display: string;
  overtime_ids: number[];
  total_overtime: number;
  // Keep existing fields that might not be in current API response
  hours_previously_today: number;
  last_attendance_worked_hours: number;
};