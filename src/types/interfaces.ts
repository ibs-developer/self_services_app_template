import { Href } from "expo-router";
import { ReactNode } from "react";
import { ImageProps, PressableProps, TextInputProps } from "react-native";

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
