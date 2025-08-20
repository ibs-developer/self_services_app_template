import {
    apiCreateCrmLead,
    apiCrmLeadDetail,
    apiCrmLeadList,
    apiDeleteCrmLead,
    apiUpdateCrmLead,
} from '@/lib/api/crm/lead/crm.lead.api';
import { TCrmLead } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import onError from '../../error';

export function useCrmLeadList(query?: any) {
    const { data, ...params } = useQuery({
        queryFn: () => apiCrmLeadList(query),
        queryKey: ['crmLead', query],
    });
    return { data: data?.data.data, ...params };
}

export function useCrmLeadDetail(id: string, query?: Record<string, string>) {
    const { data, ...params } = useQuery({
        queryFn: () => apiCrmLeadDetail(id, query),
        queryKey: ['crmLead', id],
    });
    // Handle both single object and array responses
    return { data: data?.data.data, ...params };
}

export function useCreateCrmLead(onSuccess: () => void) {
    const mutation = useMutation({
        mutationFn: (payload: Partial<TCrmLead>) => apiCreateCrmLead(payload),
        onSuccess,
        onError,
    });
    const { mutate } = mutation;
    return { DoCreateLead: mutate, ...mutation };
}

export function useUpdateCrmLead(onSuccess: () => void) {
    const mutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<TCrmLead> }) =>
            apiUpdateCrmLead(id, payload),
        onSuccess,
        onError,
    });
    const { mutate } = mutation;
    return { DoUpdateLead: mutate, ...mutation };
}

export function useDeleteCrmLead(onSuccess: () => void) {
    const mutation = useMutation({
        mutationFn: (id: string) => apiDeleteCrmLead(id),
        onSuccess,
        onError,
    });
    const { mutate } = mutation;
    return { DoDeleteLead: mutate, ...mutation };
}
