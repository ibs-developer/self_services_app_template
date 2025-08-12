import { OdooIdNameTuple } from '../global';

/**
 * Basic authenticated user information
 */
export type TUser = {
  id: string;
  access_token: string;
};

/**
 * User authentication credentials
 */
export type TUserAuth = {
  mobile_email: string;
  mobile_password: string;
  mac_address: string;
};
