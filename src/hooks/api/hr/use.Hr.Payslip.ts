import {
  apiPayslipDetail,
  apiPayslipList,
} from '@/lib/api/hr/hr.payslip';
import { useQuery } from '@tanstack/react-query';

export function useHrPayslipList(query?: Record<string, any>) {
  const {
    data,
    ...param
  } = useQuery({
    queryFn: () => apiPayslipList(query),
    queryKey: ['payslip', query],
  });

  return {
    data: data?.data.data,
    ...param
  };
}

export function useHrPayslipDetail(id: string, query?: Record<string, string>) {
  const { data, ...param } = useQuery({
    queryFn: () => apiPayslipDetail(id, query),
    queryKey: ['payslip', id],
  });

  return { data: data?.data.data, ...param };
}
