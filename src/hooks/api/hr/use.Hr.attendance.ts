import { apiAttendanceDetail, apiAttendanceList, apiCreateAttendance, apiUpdateAttendance } from '@/lib/api/hr/hr.attendance';
import { THrAttendance } from '@/types/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLoginStore } from '../../loginStore';
import onError from '../error';

export function useHrAttendanceList(query?) {
  const { data, refetch, isFetched, isSuccess, error, isLoading, isRefetching } = useQuery({
    queryFn: () => apiAttendanceList(query),
    queryKey: ['attendance', query],
  });

  // if (error) {
  //   console.error('useHrAttendanceList error:', {
  //     message: error.message,
  //     name: error.name,
  //     stack: error.stack,
  //     ...error,
  //   });
  // }

  // console.log('useHrAttendanceList', data);

  return { data: data?.data.data, refetch, isFetched, isSuccess, isLoading, isRefetching };
}

export function useHrAttendanceDetail(id: string, query?) {
  const { data, refetch, isFetched } = useQuery({
    queryFn: () => apiAttendanceDetail(id, query),
    queryKey: ['attendance', id],
  });

  return { data: data?.data.data, refetch, isFetched };
}

export function useCreateHrAttendance(onSuccess: () => void) {
  const { user } = useLoginStore();

  if (!user) {
    throw new Error('User is not logged in');
  }

  const mutation = useMutation({
    mutationFn: (payload: Partial<THrAttendance>) => {
      return apiCreateAttendance(payload, user?.id);
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doHrAttendanceCreate: mutate, ...mutation };
}

export function useUpdateHrAttendance(onSuccess: () => void) {
  const mutation = useMutation({
    mutationFn: (attendance: Partial<THrAttendance>) => {
      const { id, ...payload } = attendance;

      if (!id) {
        return Promise.reject('Attendance ID is required');
      }

      return apiUpdateAttendance(id.toString(), payload);
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doAttendanceUpdate: mutate, ...mutation };
}
