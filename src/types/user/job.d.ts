import { OdooIdNameTuple, OdooFalseOr } from '../global';

/**
 * Job and Department Details
 */
export type TUserJob = {
  name: string;
  active: boolean;
  color: number;
  department_id: OdooIdNameTuple;
  member_of_department: boolean;
  job_id: OdooFalseOr<OdooIdNameTuple>;
  job_title: OdooFalseOr<string>;
  address_id: OdooIdNameTuple;
  work_phone: OdooFalseOr<string>;
  mobile_phone: OdooFalseOr<string>;
  work_email: string;
  work_contact_id: OdooIdNameTuple;
  work_location_id: OdooFalseOr<OdooIdNameTuple>;
  // New fields from API
  related_contact_ids: number[];
  related_contacts_count: number;
};

/**
 * HR Presence and Status
 */
export type TUserPresence = {
  hr_presence_state: string;
  last_activity: OdooFalseOr<string>;
  last_activity_time: OdooFalseOr<string>;
  hr_icon_display: string;
  show_hr_icon_display: boolean;
};

/**
 * Hierarchy and Manager Details
 */
export type TUserHierarchy = {
  user_id: OdooFalseOr<OdooIdNameTuple>;
  parent_id: OdooFalseOr<OdooIdNameTuple>;
  coach_id: OdooFalseOr<OdooIdNameTuple>;
  leave_manager_id: OdooFalseOr<OdooIdNameTuple>;
  // Keep existing field
  attendance_manager_id: OdooFalseOr<OdooIdNameTuple>;
  // New field from API
  expense_manager_id: OdooFalseOr<OdooIdNameTuple>;
};
