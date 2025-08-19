import {
  apiCreateLeave,
  apiDeleteLeave,
  apiLeaveDetail,
  apiLeaveList,
  apiLeaveTypes,
  apiUpdateLeave,
} from "@/lib/api/hr.leave.api";
import { THrLeave } from "@/types/hr/hr.leave";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "../loginStore";
import onError from "./error";

export function useHrLeaveList(query?) {
  const { data, refetch, isLoading } = useQuery({
    queryFn: () => apiLeaveList(query),
    queryKey: ["hrLeave", query],
  });

  return { data: data?.data.data, count: data?.data.count, refetch, isLoading };
}

export function useHrLeaveDetail(id: string, query?: Record<string, string>) {
  const { data, refetch, isLoading, ...params } = useQuery({
    queryFn: () => apiLeaveDetail(id, query),
    queryKey: ["hrLeave", id],
  });

  return { data: data?.data.data, refetch, isLoading, ...params };
}

export function useCreateHrLeave(onSuccess: () => void) {
  const { user } = useLoginStore();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const mutation = useMutation({
    mutationFn: (payload: Partial<THrLeave>) => {
      return apiCreateLeave(payload, user?.id);
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doHrLeaveCreate: mutate, ...mutation };
}

export function useUpdateHrLeave(onSuccess: () => void) {
  const mutation = useMutation({
    mutationFn: (project: Partial<THrLeave>) => {
      const { id, ...payload } = project;
      if (!id) {
        return Promise.reject("Project ID is required");
      }

      return apiUpdateLeave(id.toString(), payload);
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doProjectUpdate: mutate, ...mutation };
}

export function useDeleteHrLeave(onSuccess: () => void) {
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return apiDeleteLeave(id);
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doProjectDelete: mutate, ...mutation };
}

export function useHrLeaveTypes(query?) {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryFn: () => apiLeaveTypes(query),
    queryKey: ["hrLeaveTypes"],
  });

  if (isError) {
    console.error("Error fetching leave types:", error);
    if (error && typeof error === "object") {
      Object.entries(error).forEach(([key, value]) => {
        console.error(`error.${key}:`, value);
      });
    }
  }

  return { data: data?.data.data, refetch, isLoading, isError };
}
