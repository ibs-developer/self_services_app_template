export type OdooIdNameTuple = [number, string] | number;
export type OdooFalseOr<T> = T | false;

export type TloginForm = {
  email: string;
  password: string;
  device_id: string;
};

export type TForgetPasswordForm = {
  email: string;
};

export type TResetPasswordForm = {
  password: string;
  token: string;
};

export type TImageMixin = {
  image_1920?: string | false;
  image_1024?: string | false;
  image_512?: string | false;
  image_256?: string | false;
  image_128?: string | false;
};

// Avatar and Image Details
export type TAvatarMixin = {
  avatar_1920?: string | false;
  avatar_1024?: string | false;
  avatar_512?: string | false;
  avatar_256?: string | false;
  avatar_128?: string | false;
} & TImageMixin;

// Resource and Company Details
export type TUserResource = {
  resource_id: OdooIdNameTuple;
  company_id: OdooIdNameTuple;
  resource_calendar_id: OdooIdNameTuple;
  tz: string;
};

// Activity Details
export type TActivityMixin = {
  activity_ids: any[];
  activity_state: boolean;
  activity_user_id: OdooFalseOr<OdooIdNameTuple>;
  activity_type_id: OdooFalseOr<OdooIdNameTuple>;
  activity_type_icon: OdooFalseOr<string>;
  activity_date_deadline: OdooFalseOr<string>;
  my_activity_date_deadline: OdooFalseOr<string>;
  activity_summary: OdooFalseOr<string>;
  activity_exception_decoration: OdooFalseOr<string>;
  activity_exception_icon: OdooFalseOr<string>;
  activity_calendar_event_id: OdooFalseOr<number>;
};

// Messaging Details
export type TMailThread = {
  message_is_follower: boolean;
  message_follower_ids: any[];
  message_partner_ids: any[];
  message_ids: number[];
  has_message: boolean;
  message_needaction: boolean;
  message_needaction_counter: number;
  message_has_error: boolean;
  message_has_error_counter: number;
  message_attachment_count: number;
  rating_ids: any[];
  website_message_ids: any[];
  message_has_sms_error: boolean;
  message_main_attachment_id: OdooFalseOr<number>;
};

export type TDatabaseAuditDetails = {
  create_uid: [number, string];
  create_date: string; // Could use Date type if you'll parse it
  write_uid: [number, string];
  write_date: string; // Could use Date type if you'll parse it
};
