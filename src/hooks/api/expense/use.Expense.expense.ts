import {
    apiCreateExpense,
    apiExpenseDetail,
    apiExpenseList,
    apiUpdateExpense,
} from "@/lib/api/expense/expense.expense";
import { TExpense } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import onError from "../error";

export function useExpenseList(query?: any) {
    const { data, ...params } = useQuery({
        queryFn: () => apiExpenseList(query),
        queryKey: ["expense", query],
    });

    return { data: data?.data.data, ...params };
}

export function useExpenseDetail(id: string, query?: any) {
    const { data, ...params } = useQuery({
        queryFn: () => apiExpenseDetail(id, query),
        queryKey: ["expense", id],
    });


    return { data: data?.data.data, ...params };
}

export function useCreateExpense(onSuccess: () => void) {
    const mutation = useMutation({
        mutationFn: (payload: Partial<TExpense>) => {
            return apiCreateExpense(payload);
        },
        onSuccess,
        onError,
    });

    const { mutate } = mutation;

    return { doCreateExpense: mutate, ...mutation };
}

export function useUpdateExpense(onSuccess: () => void) {
    const mutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<TExpense> }) => {
            return apiUpdateExpense(id, payload);
        },
        onSuccess,
        onError,
    });

    const { mutate } = mutation;

    return { doUpdateExpense: mutate, ...mutation };
}
