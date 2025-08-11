import { format } from 'date-fns';
import { THrLeave } from '~/types/hr.leave';

export const getStatusBgColor = (state: string) => {
  switch (state) {
    case 'validate':
      return 'bg-green-100 border-green-200 dark:bg-green-900 dark:border-green-700';
    case 'validate1':
      return 'bg-blue-100 border-blue-200 dark:bg-blue-900 dark:border-blue-700';
    case 'confirm':
      return 'bg-yellow-100 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700';
    case 'refuse':
      return 'bg-red-100 border-red-200 dark:bg-red-900 dark:border-red-700';
    case 'cancel':
      return 'bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700';
    default:
      return 'bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700';
  }
};

export const getStatusTextColor = (state: string) => {
  switch (state) {
    case 'validate':
      return 'text-green-800 dark:text-green-200';
    case 'validate1':
      return 'text-blue-800 dark:text-blue-200';
    case 'confirm':
      return 'text-yellow-800 dark:text-yellow-200';
    case 'refuse':
      return 'text-red-800 dark:text-red-200';
    case 'cancel':
      return 'text-gray-800 dark:text-gray-200';
    default:
      return 'text-gray-800 dark:text-gray-200';
  }
};

export const getStatusLabel = (state: string) => {
  switch (state) {
    case 'validate':
      return 'Approved';
    case 'validate1':
      return 'Second Approval';
    case 'confirm':
      return 'To Approve';
    case 'refuse':
      return 'Refused';
    case 'cancel':
      return 'Cancelled';
    default:
      return state;
  }
};

export const getApproverName = (leave: THrLeave) => {
  if (leave.manager_id && Array.isArray(leave.manager_id)) {
    return leave.manager_id[1] || 'Manager';
  }
  if (leave.first_approver_id && Array.isArray(leave.first_approver_id)) {
    return leave.first_approver_id[1] || 'Approver';
  }
  if (leave.second_approver_id && Array.isArray(leave.second_approver_id)) {
    return leave.second_approver_id[1] || 'Second Approver';
  }
  return 'N/A';
};

export const getLeaveTypeName = (leave: THrLeave) => {
  if (leave.holiday_status_id && Array.isArray(leave.holiday_status_id)) {
    return leave.holiday_status_id[1] || 'N/A';
  }
  return 'N/A';
};

export const formatDateRange = (
  dateFrom: string,
  dateTo: string,
  dateFormat = 'MMM dd, yyyy',
) => {
  if (!dateFrom || !dateTo) return 'N/A';
  const fromFormatted = format(new Date(dateFrom + 'Z'), dateFormat);
  const toFormatted = format(new Date(dateTo + 'Z'), dateFormat);
  return fromFormatted === toFormatted
    ? fromFormatted
    : `${fromFormatted} - ${toFormatted}`;
};

export const formatDate = (
  dateString: string,
  dateFormat = 'MMMM dd, yyyy',
) => {
  if (!dateString) return 'N/A';
  return format(new Date(dateString), dateFormat);
};
