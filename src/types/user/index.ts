// === IMPORTS ===
// Re-export modular types following SRP (Single Responsibility Principle)
export * from './auth';
export * from './job';
export * from './personal';
export * from './attendance';
export * from './leave';

// Import shared types
import {
  TUserResource,
  TActivityMixin,
  TAvatarMixin,
  TMailThread,
  TDatabaseAuditDetails,
  OdooIdNameTuple,
  OdooFalseOr,
} from '../global';
import { TUserAuth } from './auth';
import { TUserJob, TUserHierarchy, TUserPresence } from './job';
import { TUserPersonal } from './personal';
import { TUserAttendanceDetails } from './attendance';
import { TUserLeaveDetails } from './leave';

// === CORE TYPES ===

/**
 * Contract and Employment Details
 */
export type TUserContract = {
  vehicle: OdooFalseOr<string>;
  contract_ids: number[];
  contract_id: OdooFalseOr<number>;
  calendar_mismatch: boolean;
  contracts_count: number;
  contract_warning: boolean;
  first_contract_date: OdooFalseOr<string>;
};

/**
 * Location and Geolocation Details
 */
export type TUserLocation = {
  is_location_restricted: boolean;
  employee_latitude: number;
  employee_longitude: number;
  work_location_radius: number;
  work_location_name: string;
};

/**
 * Payroll and Financial Details
 */
export type TUserPayroll = {
  slip_ids: number[];
  payslip_count: number;
  registration_number: OdooFalseOr<string>;
  salary_attachment_ids: number[];
  salary_attachment_count: number;
  mobile_invoice: OdooFalseOr<string>;
  sim_card: OdooFalseOr<string>;
  internet_invoice: OdooFalseOr<string>;
};

/**
 * Application and Recruitment Details
 */
export type TUserRecruitment = {
  newly_hired_employee: boolean;
  applicant_id: number[];
};

/**
 * Permission and Access Control
 */
export type TUserPermissions = {
  can_see_mobile_details: boolean;
  can_see_location_details: boolean;
};

/**
 * Complete user/employee details from API.
 * Follows composition over inheritance - built from smaller, focused types.
 * 
 * This satisfies:
 * - DRY: Reuses existing type definitions
 * - SRP: Each imported type has single responsibility  
 * - OCP: Easy to extend without modification
 * - LSP: All component types are substitutable
 * - ISP: Consumers can import only what they need
 * - DIP: Depends on abstractions (imported types)
 */
export type TUserDetails =
  // System mixins (shared behavior)
  TAvatarMixin &
  TUserResource &
  TActivityMixin &
  TMailThread &
  TDatabaseAuditDetails &

  // Authentication & access
  TUserAuth &

  // Domain-specific data
  TUserJob &
  TUserHierarchy &
  TUserPresence &
  TUserAttendanceDetails &
  TUserLeaveDetails &
  TUserPersonal &
  TUserContract &
  TUserLocation &
  TUserPayroll &
  TUserRecruitment &
  TUserPermissions & {

    // === CORE IDENTIFICATION ===
    id?: number; // Not always present in API response
    display_name: string;
    __last_update: string;

    // === COMPANY & ORGANIZATIONAL ===
    child_all_count: number;
    child_count?: number; // Not in current API response
    user_partner_id: OdooFalseOr<OdooIdNameTuple>;
    company_country_id: OdooIdNameTuple;
    company_country_code: string;

    // === LOCALIZATION ===
    lang: string;
    country_id: OdooFalseOr<OdooIdNameTuple>;

    // === EDUCATION & QUALIFICATIONS ===
    certificate: string;
    study_field: OdooFalseOr<string>;
    study_school: OdooFalseOr<string>;

    // === EMPLOYMENT DETAILS ===
    km_home_work: number;
    employee_type: string; // Keep as string - enum values may change from backend
    child_ids: number[];
    category_ids: number[];
    notes: OdooFalseOr<string>;
    barcode: OdooFalseOr<string>;
    pin: OdooFalseOr<string>;

    // === DEPARTURE INFORMATION ===
    departure_reason_id: OdooFalseOr<OdooIdNameTuple>;
    departure_description: OdooFalseOr<string>;
    departure_date: OdooFalseOr<string>;

    // === DOCUMENTS & IDENTIFICATION ===
    id_card: OdooFalseOr<string>;
    driving_license: OdooFalseOr<string>;
    private_car_plate?: OdooFalseOr<string>; // Not in current API response

    // === SYSTEM FIELDS ===
    currency_id: OdooIdNameTuple;
    employee_properties?: any[]; // Not in current API response
    subordinate_ids: number[];
    is_subordinate?: boolean; // Not in current API response
    resume_line_ids: number[];
    employee_skill_ids: number[];
    skill_ids: number[];
  };
