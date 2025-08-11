import ENDPOINTS from "@/constants/ENDPOINTS";
import { THrLeave } from "@/types/hr.leave";
import { THrLeaveType } from "@/types/hr.type";
import { OdooListResponse, OdooShowResponse } from "@/types/response";
import api from "./axiosConfig";

export function apiLeaveList(query: Record<string, string>) {
  return api<OdooListResponse<THrLeave>>({
    method: "GET",
    url: ENDPOINTS.hr.leave.list,
    params: {
      ...query,
    },
  });
}

export function apiLeaveDetail(id: string, query: Record<string, string>) {
  return api<OdooShowResponse<THrLeave>>({
    method: "GET",
    url: ENDPOINTS.hr.leave.show(id),
    params: {
      ...query,
    },
  });
}

export function apiCreateLeave(payload: Partial<THrLeave>, userId: string) {
  return api({
    method: "POST",
    url: ENDPOINTS.hr.leave.create,
    data: {
      ...payload,
      employee_id: userId,
    },
  });
}

export function apiLeaveTypes(query) {
  return api<OdooListResponse<THrLeaveType>>({
    method: "GET",
    url: ENDPOINTS.hr.leave.types.list,
    params: {
      ...query,
    },
  });
}

export function apiUpdateLeave(payload: Partial<THrLeave>) {
  const { id, ...data } = payload;
  if (!id) {
    throw new Error("Leave ID is required for update");
  }
  return api({
    method: "PUT",
    url: ENDPOINTS.hr.leave.update(id.toString()),
    data,
  });
}

export function apiDeleteLeave(id: string) {
  return api({
    method: "DELETE",
    url: ENDPOINTS.hr.leave.delete(id),
  });
}
