import FilterKeys from "@/components/reusable/filterKeys";
import NavigateHeder from "@/components/reusable/navigationHeader";
import StateCard from "@/components/reusable/stateCard";
import VisitCard from "@/components/services/visits/visitCard";
import { useVisitList } from "@/hooks/api/crm/lead/visit";
import { useLoginStore } from "@/hooks/loginStore";
import { IconPlus } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const Visits = () => {
  const { user } = useLoginStore();
  const { push } = useRouter();
  const {
    data: visits,
    isLoading,
    refetch,
    isRefetching,
  } = useVisitList({
    domain: `[["salesperson_id", "=",${user.id}]]`,
  });
  const [activeFilter, setActiveFilter] = useState<string>("upcoming");

  const calculateVisitsStats = () => {
    const stats = {
      planned: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    };

    if (visits && visits.length > 0) {
      stats.planned = visits.filter(
        (visit) => visit.state === "planned"
      ).length;
      stats.inProgress = visits.filter(
        (visit) => visit.state === "in_progress"
      ).length;
      stats.completed = visits.filter(
        (visit) => visit.state === "completed"
      ).length;
      stats.cancelled = visits.filter(
        (visit) => visit.state === "cancelled"
      ).length;
    }

    return stats;
  };
  const sates = [
    {
      id: 1,
      title: "PLanned Visits",
      value: calculateVisitsStats().planned,
      bgColor: "bg-blue-50 border-blue-500",
      textColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Visits In Progress",
      value: calculateVisitsStats().inProgress,
      bgColor: "bg-orange-50 border-orange-500",
      textColor: "text-orange-500",
    },
    {
      id: 3,
      title: "Completed Visits",
      value: calculateVisitsStats().completed,
      bgColor: "bg-green-50 border-green-500",
      textColor: "text-green-500",
    },
    {
      id: 4,
      title: "Cancelled Visits",
      value: calculateVisitsStats().cancelled,
      bgColor: "bg-red-50 border-red-500",
      textColor: "text-red-500",
    },
  ];

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading . . . </Text>
      </View>
    );
  return (
    <View className="flex-1 bg-background">
      <NavigateHeder
        title="Visits"
        subComponent={
          <Pressable
            onPress={() => push("/(tabs)/services/visits/new_visit")}
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
        refreshing={isRefetching}
        onRefresh={refetch}
        contentContainerClassName="gap-5 p-5"
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text>There is no visits</Text>
          </View>
        }
        ListHeaderComponent={
          <View>
            <View className="flex-row flex-wrap gap-4">
              {sates.map((state) => (
                <StateCard
                  key={state.id}
                  name={state.title}
                  count={state.value}
                  className={state.bgColor}
                  textClassName={state.textColor}
                />
              ))}
            </View>
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
        data={visits}
        keyExtractor={(item) => item.id}
        renderItem={({ item: visit }) => <VisitCard visit={visit} />}
      />
    </View>
  );
};

export default Visits;
