import ENDPOINTS from '@/constants/ENDPOINTS';
import { OdooResponse, TCrmLeadVisit } from '@/types';
import api from '../../axiosConfig';

export function apiVisitList(query?: any) {
    return api<OdooResponse<TCrmLeadVisit>>({
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
    return api<OdooResponse<TCrmLeadVisit>>({
        method: 'GET',
        url: ENDPOINTS.crm.lead.visit.show(id),
        params: {
            ...query,
        },
    });
}

export function apiCreateVisit(
    payload: Partial<TCrmLeadVisit>,
    userId: string,
) {
    return api({
        method: 'POST',
        url: ENDPOINTS.crm.lead.visit.create,
        data: {
            ...payload,
            salesperson_id: userId,
        },
    });
}

export function apiUpdateVisit(
    id: string,
    payload: Partial<TCrmLeadVisit>
) {
    return api({
        method: 'PUT',
        url: ENDPOINTS.crm.lead.visit.update(id),
        data: {
            ...payload,
        },
    });
}
