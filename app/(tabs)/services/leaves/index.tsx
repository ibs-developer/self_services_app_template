import NavigationHeader from "@/components/reusable/navigationHeader";
import LeaveCard from "@/components/services/leaves/leaveCard";
import { useEmployeeDetails } from "@/hooks/api/use.Hr.Employee";
import { useHrLeaveList } from "@/hooks/api/use.Hr.Leave";
import { useLoginStore } from "@/hooks/loginStore";
import { IconPlus } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const Leaves = () => {
  const { push } = useRouter();
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useLoginStore();

  // Fetch leave data
  const {
    data: leaves,
    refetch,
    isLoading,
  } = useHrLeaveList({
    domain: `[["employee_id", "=",${user?.id}]]`,
  });

  const { data: employee, refetch: refetchEmployee } = useEmployeeDetails({
    fields: "allocation_remaining_display",
  });

  const leaveData = leaves || [];

  // Calculate stats from the leave data
  const calculateStats = () => {
    const stats = {
      balance: employee?.allocation_remaining_display || "0",
      approved: 0,
      pending: 0,
      cancelled: 0,
    };

    if (leaveData && leaveData.length > 0) {
      stats.approved = leaveData.filter(
        (leave) => leave.state === "validate" || leave.state === "validate1"
      ).length;
      stats.pending = leaveData.filter(
        (leave) => leave.state === "confirm"
      ).length;
      stats.cancelled = leaveData.filter(
        (leave) => leave.state === "refuse" || leave.state === "cancel"
      ).length;
    }

    return stats;
  };

  // Filter leaves based on active filter
  const getFilteredLeaves = () => {
    if (!leaveData || leaveData.length === 0) {
      return [];
    }

    const currentDate = new Date();
    // Reset time to start of day for accurate comparison
    currentDate.setHours(0, 0, 0, 0);

    switch (activeFilter) {
      case "upcoming":
        return leaveData.filter((leave) => {
          if (!leave.date_from) return false;
          const leaveStartDate = new Date(leave.date_from);
          leaveStartDate.setHours(0, 0, 0, 0);
          return leaveStartDate >= currentDate;
        });
      case "past":
        return leaveData.filter((leave) => {
          if (!leave.date_to) return false;
          const leaveEndDate = new Date(leave.date_to);
          leaveEndDate.setHours(23, 59, 59, 999);
          return leaveEndDate < currentDate;
        });
      default:
        return leaveData;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetch(), refetchEmployee()]);
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-backGround">
      <NavigationHeader
        title="Leaves"
        subComponent={
          <Pressable
            onPress={() => push("/(tabs)/services/leaves/new_leave")}
            style={{
              position: "absolute",
              end: 10,
              padding: 10,
            }}
          >
            <IconPlus size={25} className="text-gray-600" />
          </Pressable>
        }
      />
      <FlatList
        data={leaves}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: leave }) => <LeaveCard leave={leave} />}
      />
    </View>
  );
};

export default Leaves;
