import {
  apiEmployeeDetails,
  apiEmployeeProfileUpdate,
} from "@/lib/api/hr/hr.employee";
import { TUserDetails } from "@/types/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLoginStore } from "../loginStore";
import onError from "./error";

export function useUpdateEmployeeProfile(onSuccess: () => void) {
  const { user } = useLoginStore();
  const mutation = useMutation({
    mutationFn: (payload: Partial<TUserDetails>) => {
      if (!user) {
        return Promise.reject("User is not logged in");
      }

      return apiEmployeeProfileUpdate(user.id.toString(), payload);
    },
    onSuccess,
    onError,
  });
  const { mutate } = mutation;
  return { doEmployeeProfileUpdate: mutate, ...mutation };
}

export function useEmployeeDetails(query?) {
  const { user } = useLoginStore();
  if (!user) {
    throw new Error("User is not logged in");
  }
  const { data, refetch, isLoading, isFetched } = useQuery({
    queryFn: () => apiEmployeeDetails(user.id, query),
    queryKey: ["employee", user.id, query],
    staleTime: 0.1 * 60 * 1000, // 1 minute
  });

  return { data: data?.data.data[0], refetch, isFetched };
}
