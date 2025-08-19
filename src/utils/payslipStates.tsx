export const getPayslipStatusBgColor = (state: string) => {
  switch (state) {
    case "draft":
      return "bg-gray-100 border-gray-200";
    case "verify":
      return "bg-yellow-100 border-yellow-200";
    case "done":
      return "bg-green-50 border-green-500";
    case "paid":
      return "bg-blue-50 border-blue-500";
    case "cancel":
      return "bg-orange-100 border-orange-200";
    default:
      return "bg-gray-100 border-gray-200";
  }
};
export const getPayslipStatusTextColor = (state: string) => {
  switch (state) {
    case "draft":
      return "text-gray-600";
    case "verify":
      return "text-yellow-600";
    case "done":
      return "text-green-500";
    case "paid":
      return "text-blue-500";
    case "cancel":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
};
export const getPayslipStatusLabel = (state: string) => {
  switch (state) {
    case "draft":
      return "Draft";
    case "verify":
      return "Waiting";
    case "done":
      return "Done";
    case "paid":
      return "Paid";
    case "cancel":
      return "Cancelled";
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
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

  return `${format(startDate)} - ${format(endDate)}`;
};

export const getMonthlyDates = (
  startDateISO: string,
  months: number
): string[] => {
  const startDate = new Date(startDateISO);
  const result: string[] = [];

  for (let i = 0; i < months; i++) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      startDate.getDate()
    );
    const formatted = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    result.unshift(formatted); // من الأحدث إلى الأقدم
  }

  return result.reverse();
};
