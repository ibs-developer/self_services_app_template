import { TActivityMixin, TAvatarMixin, TMailThread } from './global';

//logged in user ie employee
export type TUser = {
  id: string;
  access_token: string;
};

// Job and Department Details
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

// Hierarchy and Manager Details
export type TUserHierarchy = {
  user_id: OdooIdNameTuple;
  parent_id: OdooFalseOr<OdooIdNameTuple>;
  coach_id: OdooFalseOr<OdooIdNameTuple>;
  leave_manager_id: OdooFalseOr<OdooIdNameTuple>;
  attendance_manager_id: OdooFalseOr<OdooIdNameTuple>;
};

// Attendance Details
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

// Attendance and Leave Details
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

// Personal Details
export type TUserPersonal = {
  gender: OdooFalseOr<string>;
  marital: string;
  spouse_complete_name: OdooFalseOr<string>;
  spouse_birthdate: OdooFalseOr<string>;
  children: number;
  place_of_birth: OdooFalseOr<string>;
  country_of_birth: OdooFalseOr<string>;
  birthday: OdooFalseOr<string>;
  ssnid: OdooFalseOr<string>;
  sinid: OdooFalseOr<string>;
  identification_id: OdooFalseOr<string>;
  passport_id: OdooFalseOr<string>;
  bank_account_id: OdooFalseOr<OdooIdNameTuple>;
  permit_no: OdooFalseOr<string>;
  visa_no: OdooFalseOr<string>;
  visa_expire: OdooFalseOr<string>;
  work_permit_expiration_date: OdooFalseOr<string>;
  has_work_permit: boolean;
  work_permit_scheduled_activity: boolean;
  work_permit_name: string;
  additional_note: OdooFalseOr<string>;
  emergency_contact: OdooFalseOr<string>;
  emergency_phone: OdooFalseOr<string>;
} & TUserPrivateAddress;

// Address Details
export type TUserPrivateAddress = {
  private_street: OdooFalseOr<string>;
  private_street2: OdooFalseOr<string>;
  private_city: OdooFalseOr<string>;
  private_state_id: OdooFalseOr<OdooIdNameTuple>;
  private_zip: OdooFalseOr<string>;
  private_country_id: OdooFalseOr<OdooIdNameTuple>;
  private_phone: OdooFalseOr<string>;
  private_email: string;
};

export type TUserAuth = {
  mobile_email: string;
  mobile_password: string;
  mac_address: string;
};

export type TUserDetails = TUserAuth &
  TAvatarMixin &
  TUserResource &
  TActivityMixin &
  TMailThread &
  TUserJob &
  TUserHierarchy &
  TUserLeaveDetails &
  TUserAttendanceDetails &
  TUserPersonal & {
    child_all_count: number;
    department_color: number;
    child_count: number;
    user_partner_id: OdooIdNameTuple;
    company_country_id: OdooIdNameTuple;
    company_country_code: string;
    lang: OdooFalseOr<string>;
    country_id: OdooFalseOr<OdooIdNameTuple>;
    certificate: string;
    study_field: OdooFalseOr<string>;
    study_school: OdooFalseOr<string>;

    km_home_work: number;
    employee_type: string;
    child_ids: any[];
    category_ids: any[];
    notes: OdooFalseOr<string>;
    barcode: OdooFalseOr<string>;
    pin: OdooFalseOr<string>;
    departure_reason_id: OdooFalseOr<OdooIdNameTuple>;
    departure_description: OdooFalseOr<string>;
    departure_date: OdooFalseOr<string>;
    id_card: OdooFalseOr<string>;
    driving_license: OdooFalseOr<string>;
    private_car_plate: OdooFalseOr<string>;
    currency_id: OdooIdNameTuple;
    employee_properties: any[];
    display_name: string;
    create_uid: OdooIdNameTuple;
    create_date: string;
    write_uid: OdooIdNameTuple;
    write_date: string;
    subordinate_ids: any[];
    is_subordinate: boolean;
    resume_line_ids: any[];
    employee_skill_ids: any[];
    skill_ids: any[];
  };
