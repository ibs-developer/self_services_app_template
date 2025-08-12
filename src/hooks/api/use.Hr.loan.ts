import { useMutation, useQuery } from '@tanstack/react-query';
import {
  apiLoanList,
  apiLoanDetail,
  apiCreateLoan,
  apiUpdateLoan,
  apiDeleteLoan,
} from '@/lib/api/hr.loan';
import { THrLoanCreate, THrLoanUpdate } from '@/types/hr/hr.loan';
import { useLoginStore } from '../loginStore';
import onError from './error';

export function useHrLoanList(query?: Record<string, any>) {
  const {
    data, ...param
  } = useQuery({
    queryFn: () => apiLoanList(query),
    queryKey: ['loan', query],
  });

  return {
    data: data?.data.data,
    ...param
  };
}

export function useHrLoanDetail(id: string, query?: Record<string, string>) {
  const { data, ...param } = useQuery({
    queryFn: () => apiLoanDetail(id, query),
    queryKey: ['loan', id],
  });

  return { data: data?.data.data, ...param };
}

export function useCreateHrLoan(onSuccess: () => void) {
  const { user } = useLoginStore();

  if (!user) {
    throw new Error('User is not logged in');
  }

  const mutation = useMutation({
    mutationFn: (payload: THrLoanCreate) => {
      return apiCreateLoan(payload, user?.id);
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doHrLoanCreate: mutate, ...mutation };
}

export function useUpdateHrLoan(onSuccess: () => void) {
  const mutation = useMutation({
    mutationFn: (loan: THrLoanUpdate & { id: number }) => {

      const { id, ...payload } = loan;

      if (!id) {
        return Promise.reject('Loan ID is required');
      }

      return apiUpdateLoan(id.toString(), payload);
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doLoanUpdate: mutate, ...mutation };
}

export function useDeleteHrLoan(onSuccess: () => void) {
  const mutation = useMutation({
    mutationFn: (id: number) => {
      // Note: You'll need to implement apiDeleteLoan in your API file
      return apiDeleteLoan(id.toString());
    },

    onSuccess,
    onError,
  });

  const { mutate } = mutation;

  return { doLoanDelete: mutate, ...mutation };
}
