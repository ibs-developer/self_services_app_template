import { Href } from "expo-router";
import { ReactNode } from "react";
import { ImageProps, PressableProps, TextInputProps } from "react-native";
import { THrAttendance } from "./hr.attendance";
import { THrLeave } from "./hr.leave";
import { THrLoan } from "./hr.loan";

export interface IInput extends TextInputProps {
  labelClassName?: string;
  label?: string;
  error?: string;
}
export interface IEncryptedPassword {
  isVisible: boolean;
  toggleVisibility: () => void;
}
export interface IButton extends PressableProps {
  title?: string;
  textClassName?: string;
  isPressed?: boolean;
  loaderSize?: number | "small" | "large" | undefined;
  disabledClassName?: string;
}
export interface INavigationHeader {
  title?: string;
  onBackPress?: () => void;
  subComponent?: ReactNode;
}
export interface IAvatar extends ImageProps {
  className?: string;
}
export type TDay = { isToday: boolean; name: string; num: number };
export interface ISquare {
  icon: ReactNode;
  title: string;
  time: string;
  text: string;
  isRow?: boolean;
  day?: string;
}
export interface ITodayAttendance {
  checkIn?: boolean;
  attendanceDay: string;
  day: TDay;
}
export interface IServiceTab {
  icon: ReactNode;
  label: string;
  className?: string;
  textClassName?: string;
  onPress?: () => void;
}
export interface IconItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  route: Href;
  className?: string;
  textClassName?: string;
}
export interface IAttendanceCard {
  attendance: THrAttendance;
}
export interface ILoanCard extends PressableProps {
  loan: THrLoan;
}
export interface IFilterButton {
  active?: boolean;
  onPress: () => void;
  title: string;
  className?: string;
}
export interface IFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: { key: string; label: string }[];
  className?: string;
}
export interface IStateCard extends PressableProps {
  className?: string;
  textClassName?: string;
  name?: string;
  count?: number;
}
export interface IBadge {
  className?: string;
  textClassName?: string;
  name?: string;
}
export interface IPart {
  title: string;
  value: string | number;
}
export interface ILeaveCard extends PressableProps {
  leave: THrLeave;
}
