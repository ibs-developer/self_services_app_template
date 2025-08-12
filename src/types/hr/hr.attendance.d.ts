import { TMailThread, OdooFalseOr, OdooIdNameTuple } from '../global';

export type THrAttendance = {
  id: number;
  employee_id: [number, string]; // [ID, Name]
  department_id: false | [number, string]; // might be null or an array
  check_in: date | null; // ISO timestamp
  check_out: date | boolean | null; // ISO timestamp or false
  worked_hours: number;
  color: number;
  overtime_hours: number;
  in_latitude: number;
  in_longitude: number;
  in_country_name: string | boolean;
  in_city: string | boolean;
  in_ip_address: string | boolean;
  in_browser: string | boolean;
  in_mode: string;
  out_latitude: number;
  out_longitude: number;
  out_country_name: string | boolean;
  out_city: string | boolean;
  out_ip_address: string | boolean;
  out_browser: string | boolean;
  out_mode: string;
  display_name: string;
  create_uid: [number, string];
  create_date: string;
  write_uid: [number, string];
  write_date: string;
} & TMailThread;

