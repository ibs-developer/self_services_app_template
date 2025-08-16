import DetaileField from "@/components/reusable/deatileField";
import NavigationHeader from "@/components/reusable/navigationHeader";
import { useHrLeaveDetail } from "@/hooks/api/use.Hr.Leave";
import { THrLeave } from "@/types";
import {
  formatDate,
  formatDateRange,
  getLeaveTypeName,
  getStatusLabel,
} from "@/utils/leaveStatus";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";

const LeaveDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: leaveData,
    refetch,
    isLoading,
  } = useHrLeaveDetail(id.toString());
  const leave: THrLeave = leaveData?.[0] || ({} as THrLeave);
  return (
    <View className="flex-1 ">
      <NavigationHeader title="Leave Details" />
      <ScrollView
        contentContainerClassName="p-4"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <DetaileField title="Title" value={leave.display_name} />
        <DetaileField
          title="Leave Type"
          value={getLeaveTypeName(leave)}
          section="leave"
          badge={{
            name: getStatusLabel(leave.state),
            state: leave.state,
          }}
        />
        <DetaileField
          title="Date"
          value={formatDateRange(
            leave.date_from,
            leave.date_to,
            "MMMM dd, yyyy"
          )}
        />

        <DetaileField
          title="Description"
          value={leave.name || "No description provided"}
        />

        <DetaileField
          title="Applied On"
          value={formatDate(leave.create_date)}
        />

        <DetaileField
          title="Manager"
          value={
            Array.isArray(leave.manager_id)
              ? leave.manager_id[1]
              : "No manager assigned"
          }
        />
      </ScrollView>
    </View>
  );
};

export default LeaveDetails;
