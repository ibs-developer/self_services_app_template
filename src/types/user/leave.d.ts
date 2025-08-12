import { OdooFalseOr, OdooIdNameTuple } from '../global';

/**
 * User's leave and time-off details
 */
export type TUserLeaveDetails = {
  current_leave_id: OdooFalseOr<OdooIdNameTuple>;
  hr_presence_state: string;
  last_activity: OdooFalseOr<string>;
  last_activity_time: OdooFalseOr<string>;
  hr_icon_display: string;
  show_hr_icon_display: boolean;
  newly_hired: boolean;
  remaining_leaves: number;
  current_leave_state: OdooFalseOr<string>;
  leave_date_from: OdooFalseOr<string>;
  leave_date_to: OdooFalseOr<string>;
  leaves_count: number;
  allocation_count: number;
  allocations_count: number;
  show_leaves: boolean;
  is_absent: boolean;
  allocation_display: string;
  allocation_remaining_display: string;
};