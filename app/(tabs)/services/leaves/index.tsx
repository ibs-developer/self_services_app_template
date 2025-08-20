import FilterKeys from "@/components/reusable/filterKeys";
import NavigationHeader from "@/components/reusable/navigationHeader";
import LeaveCard from "@/components/services/leaves/leaveCard";
import LeavesStates from "@/components/services/leaves/leavesStates";
import { useEmployeeDetails } from "@/hooks/api/hr/use.Hr.Employee";
import { useHrLeaveList } from "@/hooks/api/hr/use.Hr.Leave";
import { useLoginStore } from "@/hooks/loginStore";
import { IconPlus } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const Leaves = () => {
  const { push } = useRouter();
  const { user } = useLoginStore();
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [refreshing, setRefreshing] = useState(false);

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
  33;
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
  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text className="text-gray-500 dark:text-gray-400">
          Loading leaves...
        </Text>
      </View>
    );
  }

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
        contentContainerClassName="p-4 gap-4"
        data={getFilteredLeaves()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <LeavesStates leaves={leaveData} employee={employee} />
            <FilterKeys
              className="my-5"
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              filters={[
                { key: "upcoming", label: "Upcoming" },
                { key: "past", label: "Past" },
              ]}
            />
          </View>
        }
        renderItem={({ item: leave }) => <LeaveCard leave={leave} />}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-8">
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              No leave requests found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Leaves;
