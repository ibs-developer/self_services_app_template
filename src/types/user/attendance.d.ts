
import { OdooFalseOr } from '../global';

/**
 * User's attendance details and statistics
 */
export type TUserAttendanceDetails = {
  attendance_ids: any[];
  last_attendance_id: OdooFalseOr<number>;
  last_check_in: OdooFalseOr<string>;
  last_check_out: OdooFalseOr<string>;
  attendance_state: string;
  hours_last_month: number;
  hours_today: number;
  hours_previously_today: number;
  last_attendance_worked_hours: number;
  hours_last_month_display: string;
  overtime_ids: any[];
  total_overtime: number;
};