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
} from '../global';
import {  TUserAuth } from './auth';
import { TUserJob, TUserHierarchy } from './job';
import { TUserPersonal } from './personal';
import { TUserAttendanceDetails } from './attendance';
import { TUserLeaveDetails } from './leave';

// === CORE TYPES ===

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
  // Authentication & access
  TUserAuth &
  
  // System mixins (shared behavior)
  TAvatarMixin &
  TUserResource &
  TActivityMixin &
  TMailThread &
  
  // Domain-specific data
  TUserJob &
  TUserHierarchy &
  TUserAttendanceDetails &
  TUserLeaveDetails &
  TUserPersonal & {
    
    // === ADDITIONAL FIELDS NOT COVERED BY EXISTING TYPES ===
    // Company & organizational
    child_all_count: number;
    department_color: number;
    child_count: number;
    user_partner_id: [number, string];
    company_country_id: [number, string];
    company_country_code: string;
    
    // Localization
    lang: false | string;
    country_id: false | [number, string];
    
    // Education & qualifications
    certificate: string;
    study_field: false | string;
    study_school: false | string;
    
    // Employment details
    km_home_work: number;
    employee_type: string;
    child_ids: any[];
    category_ids: any[];
    notes: false | string;
    barcode: false | string;
    pin: false | string;
    
    // Departure information
    departure_reason_id: false | [number, string];
    departure_description: false | string;
    departure_date: false | string;
    
    // Documents & identification
    id_card: false | string;
    driving_license: false | string;
    private_car_plate: false | string;
    
    // System fields
    currency_id: [number, string];
    employee_properties: any[];
    display_name: string;
    create_uid: [number, string];
    create_date: string;
    write_uid: [number, string];
    write_date: string;
    subordinate_ids: any[];
    is_subordinate: boolean;
    resume_line_ids: any[];
    employee_skill_ids: any[];
    skill_ids: any[];
  };
