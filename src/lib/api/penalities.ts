import ENDPOINTS from "@/constants/ENDPOINTS";
import api from "@/lib/api/axiosConfig";
import { OdooListResponse, OdooShowResponse, TPenalty } from "@/types";

export function apiPenaltyList(query: Record<string, string>) {
    return api<OdooListResponse<TPenalty>>({
        method: "GET",
        url: ENDPOINTS.penalties.list,
        params: {
            ...query,
        },
    });
}

export function apiPenaltyDetail(id: string, query: Record<string, string>) {
    return api<OdooShowResponse<TPenalty>>({
        method: "GET",
        url: ENDPOINTS.penalties.show(id),
        params: {
            ...query,
        },
    });
}