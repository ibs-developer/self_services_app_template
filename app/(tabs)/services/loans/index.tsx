import FilterKeys from "@/components/reusable/filterKeys";
import NavigationHeader from "@/components/reusable/navigationHeader";
import StateCard from "@/components/reusable/stateCard";
import LoanCard from "@/components/services/loans/loanCard";
import { useHrLoanList } from "@/hooks/api/use.Hr.loan";
import { useLoginStore } from "@/hooks/loginStore";
import { IconPlus } from "@tabler/icons-react-native";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const Loans = () => {
  const { push } = useRouter();
  const { user } = useLoginStore();
  const {
    data: loans,
    isLoading: isLoansLoading,
    isRefetching: isLoansRefetching,
    refetch: loansRefetch,
  } = useHrLoanList({
    domain: `[["employee_id", "=",${user?.id}]]`,
  });
  const loansData = loans ? [...loans].reverse() : [];

  const [activeFilter, setActiveFilter] = useState<string>("upcoming");

  const calculateLoansStats = () => {
    const stats = {
      draft: 0,
      waiting_approval_1: 0,
      approved: 0,
      refuse: 0,
      cancel: 0,
    };

    if (loansData && loansData.length > 0) {
      stats.draft = loansData.filter((loan) => loan.state === "draft").length;
      stats.waiting_approval_1 = loansData.filter(
        (loan) => loan.state === "waiting_approval_1"
      ).length;
      stats.approved = loansData.filter(
        (loan) => loan.state === "approve"
      ).length;
      stats.refuse = loansData.filter((loan) => loan.state === "refuse").length;
      stats.cancel = loansData.filter((loan) => loan.state === "cancel").length;
    }

    return stats;
  };
  const sates = [
    {
      id: 1,
      title: "Drafted Loans",
      value: calculateLoansStats().draft,
      bgColor: "bg-gray-50 border-gray-500",
      textColor: "text-gray-500",
    },
    {
      id: 2,
      title: "Submitted Loans",
      value: calculateLoansStats().waiting_approval_1,
      bgColor: "bg-yellow-50 border-yellow-500",
      textColor: "text-yellow-500",
    },
    {
      id: 3,
      title: "Approved Loans",
      value: calculateLoansStats().approved,
      bgColor: "bg-blue-50 border-blue-500",
      textColor: "text-blue-500",
    },
    {
      id: 4,
      title: "Refused Loans",
      value: calculateLoansStats().refuse,
      bgColor: "bg-red-50 border-red-500",
      textColor: "text-red-500",
    },
    {
      id: 5,
      title: "Canceled Loans",
      value: calculateLoansStats().cancel,
      bgColor: "bg-orange-50 border-orange-500",
      textColor: "text-orange-500",
    },
  ];

  useFocusEffect(
    useCallback(() => {
      loansRefetch();
    }, [])
  );

  if (isLoansLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text>Loading loans...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-background">
      <NavigationHeader
        title="Loans"
        subComponent={
          <Pressable
            onPress={() => push("/(tabs)/services/loans/new_loan")}
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
        data={loansData}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoansRefetching}
        onRefresh={loansRefetch}
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
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
        renderItem={({ item: loan }) => <LoanCard loan={loan} />}
      />
    </View>
  );
};

export default Loans;
