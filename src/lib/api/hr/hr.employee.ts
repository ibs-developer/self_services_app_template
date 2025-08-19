import ENDPOINTS from '@/constants/ENDPOINTS';
import api from '../axiosConfig';

export function apiEmployeeProfileUpdate(
  id: string,
  payload: Record<string, any>,
) {
  return api({
    method: 'PUT',
    url: ENDPOINTS.hr_employee.update(id),

    data: {
      ...payload,
    },
  });
}

export function apiEmployeeDetails(id: string, query?: any) {
  return api({
    method: 'GET',
    url: ENDPOINTS.hr_employee.details(id),
    params: query,
  });
}
