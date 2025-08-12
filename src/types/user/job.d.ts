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
};

/**
 * Hierarchy and Manager Details
 */
export type TUserHierarchy = {
  user_id: OdooIdNameTuple;
  parent_id: OdooFalseOr<OdooIdNameTuple>;
  coach_id: OdooFalseOr<OdooIdNameTuple>;
  leave_manager_id: OdooFalseOr<OdooIdNameTuple>;
  attendance_manager_id: OdooFalseOr<OdooIdNameTuple>;
};
