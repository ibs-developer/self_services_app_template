import ENDPOINTS from '@/constants/ENDPOINTS';
import api from '@/lib/api/axiosConfig';
import { TCrmLead } from '@/types';
import { OdooResponse } from '@/types/response';

export function apiCrmLeadList(query?: any) {
    return api({
        method: 'GET',
        url: ENDPOINTS.crm.lead.list,
        params: { ...query },
    });
}

export function apiCrmLeadDetail(id: string, query?: Record<string, string>) {
    return api<OdooResponse<TCrmLead>>({
        method: 'GET',
        url: ENDPOINTS.crm.lead.show(id),
        params: { ...query },
    });
}

export function apiCreateCrmLead(payload: Partial<TCrmLead>) {
    return api({
        method: 'POST',
        url: ENDPOINTS.crm.lead.create,
        data: payload,
    });
}

export function apiUpdateCrmLead(id: string, payload: Partial<TCrmLead>) {
    return api({
        method: 'PUT',
        url: ENDPOINTS.crm.lead.update(id),
        data: payload,
    });
}

export function apiDeleteCrmLead(id: string) {
    return api({
        method: 'DELETE',
        url: ENDPOINTS.crm.lead.delete(id),
    });
}
