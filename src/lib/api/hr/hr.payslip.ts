import ENDPOINTS from "@/constants/ENDPOINTS";
import api from "../axiosConfig";
import { OdooResponse, THrPayslip } from "@/types";

export function apiPayslipList(query?: any) {
  return api<OdooResponse<THrPayslip>>({
    method: 'GET',
    url: ENDPOINTS.hr.payslip.list,
    params: {
      ...query,
    },
  });
}

export function apiPayslipDetail(
  id: string,
  query?: Record<string, string>,
) {
  return api<OdooResponse<THrPayslip>>({
    method: 'GET',
    url: ENDPOINTS.hr.payslip.show(id),
    params: {
      ...query,
    },
  });
}