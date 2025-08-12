import { OdooIdNameTuple, OdooFalseOr } from '../global';

/**
 * User's private address information
 */
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

/**
 * User's personal and family details
 */
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
