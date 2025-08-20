import { useHrAttendanceList } from "@/hooks/api/hr/use.Hr.attendance";
import { useEmployeeDetails } from "@/hooks/api/hr/use.Hr.Employee";
import { useLoginStore } from "@/hooks/loginStore";
import { ITodayAttendance } from "@/types/interfaces";
import { returnDate } from "@/utils/helpFunctions";
import {
  IconCalendarMonth,
  IconCoffee,
  IconLogin2,
  IconLogout,
} from "@tabler/icons-react-native";
import { format } from "date-fns";
import React, { FC, ReactNode, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import Square from "./square";

const TodayAttendance: FC<ITodayAttendance> = ({
  checkIn,
  attendanceDay,
  day,
}) => {
  const { user } = useLoginStore();
  const { data: employee } = useEmployeeDetails();

  const nextDay = returnDate(day.num + 1);

  //Past attendance queries
  const {
    data: pastAttendance,
    refetch: refetchPast,
    isLoading,
  } = useHrAttendanceList({
    domain: `[["employee_id", "=",${user?.id}], ["check_in",">=","${attendanceDay}"] ,["check_in","<","${nextDay}"]]`,
    limit: 1,
  });

  useEffect(() => {
    refetchPast();
  }, [checkIn]);

  const iconProps = { color: "#60a5fa", size: 35, strokeWidth: 1.5 };

  const widget: {
    id: string;
    icon: ReactNode;
    title: string;
    time: string;
    text: string;
  }[] = [
    {
      id: "1",
      icon: <IconLogin2 {...iconProps} />,
      title: "Check In",
      time: pastAttendance?.[0]?.check_in
        ? format(new Date(pastAttendance[0].check_in + 'Z'), 'hh:mm a')
        : "--:--",
      text: "On Time",
    },
    {
      id: "2",
      icon: <IconLogout {...iconProps} />,
      title: "Check Out",
      time: pastAttendance?.[0]?.check_out
        ? format(new Date(pastAttendance[0].check_out + 'Z'), 'hh:mm a')
        : "--:--",
      text: "Go Home",
    },
    {
      id: "3",
      icon: <IconCoffee {...iconProps} />,
      title: "Break Time",
      time: "00:30 min",
      text: "Avg Time 30 min",
    },
    {
      id: "4",
      icon: <IconCalendarMonth {...iconProps} />,
      title: "Total Working Hours",
      time: employee?.hours_last_month_display,
      text: "Worked in last month",
    },
  ];

  return (
    <View className="pt-2 rounded-b-3xl mb-5">
      <View>
        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={
            <Text className="text-lg text-black font-bold">
              {day.isToday
                ? "Todays Attendance"
                : `Attendance for day ${day.num}`}
            </Text>
          }
          data={widget}
          contentContainerStyle={{
            gap: 15,
            padding: 15,
          }}
          columnWrapperStyle={{
            gap: 15,
          }}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Square
              icon={item.icon}
              title={item.title}
              time={item.time}
              text={item.text}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={
            <Text className="text-lg text-black font-bold">Your Activity</Text>
          }
          data={widget}
          contentContainerStyle={{
            gap: 15,
            padding: 15,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Square
              isRow
              day="April 17,2025"
              icon={item.icon}
              title={item.title}
              time={item.time}
              text={item.text}
            />
          )}
        />
      </View>
    </View>
  );
};

export default TodayAttendance;
