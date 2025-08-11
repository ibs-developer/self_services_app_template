import ENDPOINTS from '@/constants/ENDPOINTS';
import api from './axiosConfig';
import { THrAttendance } from '@/types/hr.attendance';
import { OdooResponse } from '@/types/response';

export function apiAttendanceList(query?) {
  return api({
    method: 'GET',
    url: ENDPOINTS.hr.attendance.list,
    params: {
      ...query,
    },
  });
}

export function apiAttendanceDetail(
  id: string,
  query?: Record<string, string>,
) {
  return api<OdooResponse<THrAttendance>>({
    method: 'GET',
    url: ENDPOINTS.hr.attendance.show(id),
    params: {
      ...query,
    },
  });
}

export function apiCreateAttendance(
  payload: Partial<THrAttendance>,
  userId: string,
) {
  return api({
    method: 'POST',
    url: ENDPOINTS.hr.attendance.create,
    data: {
      ...payload,
      employee_id: userId,
    },
  });
}

export function apiUpdateAttendance(
  id: string,
  payload: Partial<THrAttendance>,
) {
  return api({
    method: 'PUT',
    url: ENDPOINTS.hr.attendance.update(id),
    data: {
      ...payload,
    },
  });
}
