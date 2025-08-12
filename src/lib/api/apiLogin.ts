import ENDPOINTS, { odoo,db,email,password } from "@/constants/ENDPOINTS";
import {
  TForgetPasswordForm,
  TloginForm,
  TResetPasswordForm,
} from "@/types/global";
import axios from "axios";
import api from "./axiosConfig";

export function apiLogin() {
  return axios({
    method: "POST",
    url: ENDPOINTS.login,
    headers: {
      db: db,
      username: email,
      password: password,
    },
    baseURL: odoo,
  });
}

export function apiEmployeeLogin(
  payload: TloginForm,
  access_token: string,
  query?: Record<string, string>
) {
  return api({
    method: "POST",
    url: "/api/v1/employee/login",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    data: {
      email: payload.email,
      password: payload.password,
      // device_id: payload.device_id,
    },
    // params: {
    //   domain: `[["mobile_email", "=", "${payload.email}"], ["mobile_password", "=", "${payload.password}"]]`,
    //   limit: 1,
    //   ...query,
    // },
  });
}

export function apiForgetPassword(payload: TForgetPasswordForm) {
  return api({
    method: "POST",
    url: ENDPOINTS.hr_employee.forgetPassword,
    data: {
      email: payload.email,
    },
  });
}

export function apiResetPassword(payload: TResetPasswordForm) {
  return api({
    method: "POST",
    url: ENDPOINTS.hr_employee.resetPassword,
    data: {
      password: payload.password,
      token: payload.token,
    },
  });
}

export function apiLogout() {
  return Promise.resolve();
}
