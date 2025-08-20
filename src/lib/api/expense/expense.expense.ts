import ENDPOINTS from '@/constants/ENDPOINTS';
import { OdooResponse, TExpense } from '@/types/index';
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
    return api<OdooResponse<TExpense>>({
        method: 'GET',
        url: ENDPOINTS.expense.show(id),
        params: {
            ...query,
        },
    });
}

export function apiCreateExpense(
    payload: Partial<TExpense>,
) {
    return api({
        method: 'POST',
        url: ENDPOINTS.expense.create,
        data: {
            ...payload,
        },
    });
}

export function apiUpdateExpense(
    id: string,
    payload: Partial<TExpense>,
) {
    return api({
        method: 'PUT',
        url: ENDPOINTS.expense.update(id),
        data: {
            ...payload,
        },
    });
}
