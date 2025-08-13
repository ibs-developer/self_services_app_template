import Badge from "@/components/reusable/badge";
import Part from "@/components/reusable/mainCardParts";
import { ILeaveCard } from "@/types/interfaces";
import {
  formatDateRange,
  getApproverName,
  getStatusBgColor,
  getStatusLabel,
  getStatusTextColor,
} from "@/utils/leaveStatus";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";

const LeaveCard: FC<ILeaveCard> = ({ leave }) => {
  const { push } = useRouter();
  return (
    <Pressable
      onPress={() => push(`/(tabs)/services/leaves/details/${leave.id}`)}
      className="bg-white rounded-xl"
    >
      <View className="mb-3 rounded-xl">
        <View className="p-5 rounded-xl">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {leave.name}
            </Text>
            <Badge
              className={`px-3 py-1 ${getStatusBgColor(leave.state)}`}
              textClassName={`text-xs font-medium
                  ${getStatusTextColor(leave.state)}`}
              name={getStatusLabel(leave.state)}
            />
          </View>

          <Text className="font-bold text-base mb-2">
            {formatDateRange(leave.date_from, leave.date_to)}
          </Text>

          <View
            style={{ borderTopWidth: 0.5, borderTopColor: "#e5e7eb" }}
            className="flex-row justify-between items-center pt-4 border-gray-200"
          >
            <Part
              title="Apply Days"
              value={`${leave.number_of_days || 0} Days`}
            />
            <Part
              title="Leave Type"
              value={leave.holiday_status_id?.[1] || "N/A"}
            />
            <Part title="Approved By" value={getApproverName(leave)} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default LeaveCard;
