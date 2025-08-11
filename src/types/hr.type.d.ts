import { TDatabaseAuditDetails } from './global';

export type THrLeaveType = {
  id: number;
  name: string;
  sequence: number;
  create_calendar_meeting: boolean;
  color: number;
  icon_id: [number, string];
  active: boolean;
  max_leaves: number;
  leaves_taken: number;
  virtual_remaining_leaves: number;
  allocation_count: number;
  group_days_leave: number;
  company_id: boolean;
  responsible_ids: number[];
  leave_validation_type: 'both' | 'hr' | 'manager' | string; // Adjust based on possible values
  requires_allocation: 'no' | 'yes' | string; // Adjust based on possible values
  employee_requests: 'no' | 'yes' | string; // Adjust based on possible values
  allocation_validation_type: 'officer' | string; // Adjust based on possible values
  has_valid_allocation: boolean;
  time_type: 'leave' | string; // Adjust based on possible values
  request_unit: 'hour' | 'day' | string; // Adjust based on possible values
  unpaid: boolean;
  leave_notif_subtype_id: [number, string];
  allocation_notif_subtype_id: [number, string];
  support_document: boolean;
  accruals_ids: any[]; // Replace 'any' with more specific type if known
  accrual_count: number;
  allows_negative: boolean;
  max_allowed_negative: number;
  display_name: string;
  hr_attendance_overtime: boolean;
  overtime_deductible: boolean;
} & TDatabaseAuditDetails;
