import { useMutation, useQuery } from '@tanstack/react-query';
import {
  apiLoanList,
  apiLoanDetail,
  apiCreateLoan,
  apiUpdateLoan,
  apiDeleteLoan,
} from '@/lib/api/hr.loan';
import { THrLoanCreate, THrLoanUpdate } from '@/types/hr.loan';
import { useLoginStore } from '../loginStore';
import onError from './error';

export function useHrLoanList(query?: Record<string, any>) {
  const {
    data,
    refetch,
    isFetched,
    isSuccess,
    error,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: () => apiLoanList(query),
    queryKey: ['loan', query],
  });

  // if (error) {
  //   console.error('useHrLoanList error:', {
  //     message: error.message,
  //     name: error.name,
  //     stack: error.stack,
  //     ...error,
  //   });
  // }

  // console.log('useHrLoanList', data);

  return {
    data: data?.data.data,
    refetch,
    isFetched,
    isSuccess,
    isLoading,
    isRefetching,
  };
}

export function useHrLoanDetail(id: string, query?: Record<string, string>) {
  const { data, refetch, isFetched, isRefetching, isLoading } = useQuery({
    queryFn: () => apiLoanDetail(id, query),
    queryKey: ['loan', id],
  });

  return { data: data?.data.data, refetch, isFetched, isRefetching, isLoading };
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

// // Additional hooks for loan-specific operations
// export function useApproveLoan(onSuccess: () => void) {
//   const mutation = useMutation({
//     mutationFn: (id: number) => {
//       return apiUpdateLoan(id.toString(), { state: 'approve' });
//     },

//     onSuccess,
//     onError,
//   });

//   const { mutate } = mutation;

//   return { doLoanApprove: mutate, ...mutation };
// }

// export function useRejectLoan(onSuccess: () => void) {
//   const mutation = useMutation({
//     mutationFn: (id: number) => {
//       return apiUpdateLoan(id.toString(), { state: 'refuse' });
//     },

//     onSuccess,
//     onError,
//   });

//   const { mutate } = mutation;

//   return { doLoanReject: mutate, ...mutation };
// }

// export function useCancelLoan(onSuccess: () => void) {
//   const mutation = useMutation({
//     mutationFn: (id: number) => {
//       return apiUpdateLoan(id.toString(), { state: 'cancel' });
//     },

//     onSuccess,
//     onError,
//   });

//   const { mutate } = mutation;

//   return { doLoanCancel: mutate, ...mutation };
// }
