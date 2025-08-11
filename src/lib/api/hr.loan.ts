import ENDPOINTS from '@/constants/ENDPOINTS';
import api from './axiosConfig';
import { OdooResponse } from '@/types/response';
import { THrLoan, THrLoanCreate, THrLoanUpdate } from '@/types/hr.loan';

export function apiLoanList(query? : any) {
  return api<OdooResponse<THrLoan>>({
    method: 'GET',
    url: ENDPOINTS.hr.loan.list,
    params: {
      ...query,
    },
  });
}

export function apiLoanDetail(
  id: string,
  query?: Record<string, string>,
) {
  return api<OdooResponse<THrLoan>>({
    method: 'GET',
    url: ENDPOINTS.hr.loan.show(id),
    params: {
      ...query,
    },
  });
}

export function apiCreateLoan(
  payload: THrLoanCreate,
  userId: string,
) {
  return api<OdooResponse<THrLoan>>({
    method: 'POST',
    url: ENDPOINTS.hr.loan.create,
    data: {
      ...payload,
      employee_id: userId,
    },
  });
}

export function apiUpdateLoan(
  id: string,
  payload: THrLoanUpdate,
) {
  return api<OdooResponse<THrLoan>>({
    method: 'PUT',
    url: ENDPOINTS.hr.loan.update(id),
    data: {
      ...payload,
    },
  });
}

export function apiDeleteLoan(id: string) {
  return api<OdooResponse<void>>({
    method: 'DELETE',
    url: ENDPOINTS.hr.loan.delete(id),
  });
}
