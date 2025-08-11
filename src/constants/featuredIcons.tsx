import { IconItem } from "@/types/interfaces";
import {
  IconBuildingBank,
  IconBus,
  IconCalendar,
  IconCalendarOff,
  IconCar,
  IconCashBanknote,
  IconChartHistogram,
  IconClockPlus,
  IconFileDollar,
  IconFlagOff,
} from "@tabler/icons-react-native";

const iconSize = 35;

export const featuredIcons: IconItem[] = [
  {
    id: 1,
    label: "Time Off",
    icon: (
      <IconCalendarOff size={iconSize} className="bg-red-500" color="#ef4444" />
    ),
    route: "/(tabs)/services/time-off",
    className: "border-red-500 bg-red-100",
    textClassName: "text-red-500",
  },
  {
    id: 2,
    label: "Attendance",
    icon: (
      <IconCalendar size={iconSize} className="bg-blue-500" color="#3b82f6" />
    ),
    route: "/(tabs)/services/attendance",
    className: "border-blue-500 bg-blue-50",
    textClassName: "text-blue-500",
  },
  {
    id: 3,
    label: "Payslips",
    icon: (
      <IconFileDollar
        size={iconSize}
        className="bg-yellow-500"
        color="#eab308"
      />
    ),
    route: "/(tabs)/services/payslips",
    className: "border-yellow-500 bg-yellow-100",
    textClassName: "text-yellow-500",
  },
  {
    id: 4,
    label: "Penalties",
    icon: (
      <IconFlagOff size={iconSize} className="bg-green-500" color="#22c55e" />
    ),
    route: "/(tabs)/services/penalties",
    className: "border-green-500 bg-green-100",
    textClassName: "text-green-500",
  },
  {
    id: 5,
    label: "Petty cash",
    icon: (
      <IconCashBanknote
        size={iconSize}
        className="bg-gray-500"
        color="#6b7280"
      />
    ),
    route: "/(tabs)/services/petty_cash",
    className: "border-gray-500 bg-gray-100",
    textClassName: "text-gray-500",
  },
  {
    id: 6,
    label: "Loans",
    icon: (
      <IconBuildingBank
        size={iconSize}
        className="bg-orange-500"
        color="#f97316"
      />
    ),
    route: "/(tabs)/services/loans",
    className: "border-orange-500 bg-orange-100",
    textClassName: "text-orange-500",
  },
  {
    id: 7,
    label: "Expenses",
    icon: (
      <IconChartHistogram
        className="bg-rose-500"
        size={iconSize}
        color="#f43f5e"
      />
    ),
    route: "/(tabs)/services/expenses",
    className: "border-rose-500 bg-rose-100",
    textClassName: "text-rose-500",
  },
  {
    id: 8,
    label: "Overtime",
    icon: (
      <IconClockPlus size={iconSize} className="bg-lime-500" color="#84cc16" />
    ),
    route: "/(tabs)/services/overtime",
    className: "border-lime-500 bg-lime-100",
    textClassName: "text-lime-500",
  },
  {
    id: 9,
    label: "Business trip",
    icon: <IconBus size={iconSize} className="bg-teal-500" color="#14b8a6" />,
    route: "/(tabs)/services/business_trip",
    className: "border-teal-500 bg-teal-100",
    textClassName: "text-teal-500",
  },
  {
    id: 10,
    label: "Visits",
    icon: <IconCar size={iconSize} className="bg-sky-500" color="#0ea5e9" />,
    route: "/(tabs)/services/visits",
    className: "border-sky-500 bg-sky-50",
    textClassName: "text-sky-500",
  },
];
