import { OdooIdNameTuple, OdooFalseOr } from '../global';

/**
 * Basic authenticated user information
 */
export type TUser = {
  id: string;
  access_token: string;
};

/**
 * User authentication and mobile details
 */
export type TUserAuth = {
  // Keep existing fields
  mobile_email: OdooFalseOr<string>;
  mobile_password: OdooFalseOr<string>;
  mac_address: string;

  // New fields from API
  device_id: OdooFalseOr<string>;
  mobile_password_display: string;
  new_mobile_password: string;
};
