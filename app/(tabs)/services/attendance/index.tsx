import NavigationHeader from "@/components/reusable/navigationHeader";
import AttendanceCard from "@/components/services/attendance/attendanceCard";
import { useHrAttendanceList } from "@/hooks/api/hr/use.Hr.attendance";
import { useLoginStore } from "@/hooks/loginStore";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Attendance = () => {
  const { user } = useLoginStore();
  // Fetch attendance data using the custom hook
  const { data: attendanceList, isLoading } = useHrAttendanceList({
    domain: `[["employee_id", "=", ${user?.id}]]`,
    order: "check_in desc",
  });

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading . . .</Text>
      </View>
    );
  return (
    <View className="flex-1">
      <NavigationHeader title="Attendance" />
      <FlatList
        data={attendanceList}
        keyExtractor={(item) => item.id}
        renderItem={({ item: attendance }) => (
          <AttendanceCard attendance={attendance} />
        )}
      />
    </View>
  );
};

export default Attendance;
