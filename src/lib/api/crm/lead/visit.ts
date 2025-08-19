import ENDPOINTS from '@/constants/ENDPOINTS';
import api from '../../axiosConfig';

export function apiVisitList(query?: any) {
    return api({
        method: 'GET',
        url: ENDPOINTS.crm.lead.visit.list,
        params: {
            ...query,
        },
    });
}

export function apiVisitDetail(
    id: string,
    query?: Record<string, string>,
) {
    return api({
        method: 'GET',
        url: ENDPOINTS.crm.lead.visit.show(id),
        params: {
            ...query,
        },
    });
}

export function apiCreateVisit(
    payload: any,
    userId: string,
) {
    return api({
        method: 'POST',
        url: ENDPOINTS.crm.lead.visit.create,
        data: {
            ...payload,
            employee_id: userId,
        },
    });
}

export function apiUpdateVisit(
    id: string,
    payload: any
) {
    return api({
        method: 'PUT',
        url: ENDPOINTS.crm.lead.visit.update(id),
        data: {
            ...payload,
        },
    });
}
