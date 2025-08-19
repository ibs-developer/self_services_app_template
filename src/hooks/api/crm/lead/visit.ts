import {
    apiCreateVisit,
    apiUpdateVisit,
    apiVisitDetail,
    apiVisitList,
} from "@/lib/api/crm/lead/visit";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "../../../loginStore";
import onError from "../../error";

export function useVisitList(query?: any) {
    const { data, ...params } = useQuery({
        queryFn: () => apiVisitList(query),
        queryKey: ["visit", query],
    });

    return { data: data?.data.data, ...params };
}

export function useVisitDetail(id: string, query?: Record<string, string>) {
    const { data, ...params } = useQuery({
        queryFn: () => apiVisitDetail(id, query),
        queryKey: ["visit", id],
    });

    return { data: data?.data.data, ...params };
}

export function useCreateVisit(onSuccess: () => void) {
    const { user } = useLoginStore();

    if (!user) {
        throw new Error("User is not logged in");
    }

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return apiCreateVisit(payload, user?.id);
        },

        onSuccess,
        onError,
    });

    const { mutate } = mutation;

    return { doVisitCreate: mutate, ...mutation };
}

export function useUpdateVisit(onSuccess: () => void) {
    const mutation = useMutation({
        mutationFn: (visit: any) => {
            const { id, ...payload } = visit;
            if (!id) {
                return Promise.reject("Visit ID is required");
            }

            return apiUpdateVisit(id.toString(), payload);
        },

        onSuccess,
        onError,
    });

    const { mutate } = mutation;

    return { doVisitUpdate: mutate, ...mutation };
}
