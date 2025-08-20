export const getVisitStatusBgColor = (state: string) => {
  switch (state) {
    case "planned":
      return "bg-blue-50 border-blue-500";
    case "in_progress":
      return "bg-orange-50 border-orange-500";
    case "completed":
      return "bg-green-50 border-green-500";
    case "cancelled":
      return "bg-red-50 border-red-500";
    default:
      return "bg-gray-100 border-gray-200";
  }
};
export const getVisitStatusTextColor = (state: string) => {
  switch (state) {
    case "planned":
      return "text-blue-500";
    case "in_progress":
      return "text-orange-500";
    case "completed":
      return "text-green-500";
    case "cancelled":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
};
export const getVisitStatusLabel = (state: string) => {
  switch (state) {
    case "planned":
      return "Planned";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return state;
  }
};
