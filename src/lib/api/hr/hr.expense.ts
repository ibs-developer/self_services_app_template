import ENDPOINTS from '@/constants/ENDPOINTS';
import { OdooResponse, THrExpense } from '@/types/index';
import api from '../axiosConfig';

export function apiExpenseList(query?: any) {
    return api({
        method: 'GET',
        url: ENDPOINTS.expense.list,
        params: {
            ...query,
        },
    });
}

export function apiExpenseDetail(
    id: string,
    query?: Record<string, string>,
) {
    return api<OdooResponse<THrExpense>>({
        method: 'GET',
        url: ENDPOINTS.expense.show(id),
        params: {
            ...query,
        },
    });
}

export function apiCreateExpense(
    payload: Partial<THrExpense>,
    userId: string,
) {
    return api({
        method: 'POST',
        url: ENDPOINTS.expense.create,
        data: {
            ...payload,
            employee_id: userId,
        },
    });
}

export function apiUpdateExpense(
    id: string,
    payload: Partial<THrExpense>,
) {
    return api({
        method: 'PUT',
        url: ENDPOINTS.expense.update(id),
        data: {
            ...payload,
        },
    });
}
