import { IAttendanceCard } from "@/types/interfaces";
import { formatWorkedHoursToHHMM } from "@/utils/workedHoursDisplay";
import { IconAlarm, IconLogin2, IconLogout } from "@tabler/icons-react-native";
import React, { FC } from "react";
import { Text, View } from "react-native";

const AttendanceCard: FC<IAttendanceCard> = ({ attendance }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "Z");
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time to display hours and minutes
  const formatTime = (dateString: string | null) => {
    if (!dateString) return "00:00 am";
    const date = new Date(dateString + "Z");
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // If there's no check_out, treat as absent (checked in but didn't check out)
  const isAbsent = attendance.check_in && !attendance.check_out;

  return (
    <View className="bg-white mx-4 my-1 overflow-hidden rounded-lg shadow-sm">
      <View className="flex-row">
        {/* Blue accent line */}
        <View className={`w-1 ${isAbsent ? "bg-gray-300" : "bg-primary"}`} />

        {/* Content */}
        <View className="flex-1 px-4 py-4">
          {/* Title */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <Text className="text-primary">
                <IconAlarm size={20} />
              </Text>
              <Text className="text-base font-medium text-gray-900 ">
                {formatDate(attendance.create_date)}
              </Text>
            </View>
            {/* Work duration */}
            <Text className="text-sm text-gray-600 mb-2">
              {true
                ? "Absent"
                : "Work Duration: " +
                  (formatWorkedHoursToHHMM(attendance.worked_hours) || "N/A")}
            </Text>
          </View>

          {/* Time entries */}
          <View className="flex-row justify-between">
            {/* Check-in */}
            <View className="flex-row items-center gap-2">
              <Text className="text-primary">
                <IconLogin2 size={20} />
              </Text>
              <Text className="text-sm text-gray-600 mr-2">
                {formatTime(attendance.check_in)}
              </Text>
            </View>

            {/* Check-out */}
            <View className="flex-row items-center gap-2">
              <Text className="text-red-500">
                <IconLogout size={16} />
              </Text>
              <Text className="text-sm text-gray-600">
                {formatTime(attendance.check_out)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttendanceCard;
