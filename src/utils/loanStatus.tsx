export const getLoanStatusBgColor = (state: string) => {
  switch (state) {
    case 'draft':
      return 'bg-gray-100 border-gray-200 dark:bg-green-900 dark:border-green-700';
    case 'waiting_approval_1':
      return 'bg-yellow-100 border-yellow-200 dark:bg-blue-900 dark:border-blue-700';
    case 'approved':
      return 'bg-blue-100 border-blue-200 dark:bg-yellow-900 dark:border-yellow-700';
    case 'refuse':
      return 'bg-red-100 border-red-200 dark:bg-red-900 dark:border-red-700';
    case 'cancel':
      return 'bg-orange-100 border-orange-200 dark:bg-gray-900 dark:border-gray-700';
    default:
      return 'bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700';
  }
};
export const getLoanStatusTextColor = (state: string) => {
  switch (state) {
    case 'draft':
      return 'text-gray-600 dark:text-green-200';
    case 'waiting_approval_1':
      return 'text-yellow-600 dark:text-blue-200';
    case 'confirm':
      return 'text-blue-600 dark:text-yellow-200';
    case 'refuse':
      return 'text-red-600 dark:text-red-200';
    case 'cancel':
      return 'text-orange-600 dark:text-gray-200';
    default:
      return 'text-gray-600 dark:text-gray-200';
  }
};
export const getLoanStatusLabel = (state: string) => {
  switch (state) {
    case 'draft':
      return 'Draft';
    case 'waiting_approval_1':
      return 'Submitted';
    case 'approved':
      return 'Approved';
    case 'refuse':
      return 'Refused';
    case 'cancel':
      return 'Cancelled';
    default:
      return state;
  }
};
export const formatLoanDateRange = (date: string, months: number): string => {
  const year = +date.slice(0, 4);
  const month = +date.slice(5, 7);
  const day = +date.slice(8);
  const startDate = new Date(year, month - 1, day);

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months - 1);

  const format = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

  return `${format(startDate)} - ${format(endDate)}`;
};

export const getMonthlyDates = (
  startDateISO: string,
  months: number,
): string[] => {
  const startDate = new Date(startDateISO);
  const result: string[] = [];

  for (let i = 0; i < months; i++) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      startDate.getDate(),
    );
    const formatted = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    result.unshift(formatted); // من الأحدث إلى الأقدم
  }

  return result.reverse();
};
