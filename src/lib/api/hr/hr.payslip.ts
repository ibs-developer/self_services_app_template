import ENDPOINTS from "@/constants/ENDPOINTS";
import api from "../axiosConfig";

export function apiPayslipList(query?: any) {
  return api({
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
  return api({
    method: 'GET',
    url: ENDPOINTS.hr.payslip.show(id),
    params: {
      ...query,
    },
  });
}