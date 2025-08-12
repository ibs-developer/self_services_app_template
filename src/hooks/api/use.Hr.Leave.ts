import { useMutation, useQuery } from '@tanstack/react-query';
import {
  apiCreateLeave,
  apiDeleteLeave,
  apiLeaveDetail,
  apiLeaveList,
  apiLeaveTypes,
  apiUpdateLeave,
} from '@/lib/api/hr.leave.api';
import { THrLeave } from '@/types/hr/hr.leave';
import { useLoginStore } from '../loginStore';
import onError from './error';

export function useHrLeaveList(query?) {
  const { data, ...param } = useQuery({
    queryFn: () => apiLeaveList(query),
    queryKey: ['hrLeave', query],
  });

  return { data: data?.data.data,...param };
}

export function useHrLeaveDetail(id: string, query?) {

  const { data, ...param } = useQuery({
    queryFn: () => apiLeaveDetail(id, query),
    queryKey: ['hrLeave', id],
  });

  return { data: data?.data.data, ...param };
}

export function useCreateHrLeave(onSuccess: () => void) {
  const { user } = useLoginStore();

  if (!user) {
    throw new Error('User is not logged in');
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
    mutationFn: (payload: Partial<THrLeave>) => {
      return apiUpdateLeave(payload);
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

export function useHrLeaveTypes( query?) {
  const { data, ...param } = useQuery({
    queryFn: () => apiLeaveTypes(query),
    queryKey: ['hrLeaveTypes'],
  });

  if (param.isError) {
    console.error('Error fetching leave types:', param.error);
    if (param.error && typeof param.error === 'object') {
      Object.entries(param.error).forEach(([key, value]) => {
        console.error(`error.${key}:`, value);
      });
    }
  }

  return { data: data?.data.data, ...param };
}
