import FilterKeys from "@/components/reusable/filterKeys";
import NavigateHeder from "@/components/reusable/navigationHeader";
import StateCard from "@/components/reusable/stateCard";
import PayslipCard from "@/components/services/payslips/payslipCard";
import { useHrPayslipList } from "@/hooks/api/hr/use.Hr.Payslip";
import { useLoginStore } from "@/hooks/loginStore";
import { THrPayslip } from "@/types";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

const Payslips = () => {
  const { user } = useLoginStore();
  const {
    data: payslips,
    refetch,
    isRefetching,
  } = useHrPayslipList({
    domain: `[["employee_id", "=",${user?.id}],["state","in",["done","paid"]]]`,
  });
  const [activeFilter, setActiveFilter] = useState<string>("upcoming");

  const calculateLoansStats = () => {
    const stats = {
      paid: 0,
      done: 0,
    };

    if (payslips && payslips.length > 0) {
      stats.paid = payslips.filter(
        (payslip: THrPayslip) => payslip.state === "paid"
      ).length;
      stats.done = payslips.filter(
        (payslip: THrPayslip) => payslip.state === "done"
      ).length;
    }

    return stats;
  };
  const sates = [
    {
      id: 1,
      title: "Paid Payslips",
      value: calculateLoansStats().paid,
      bgColor: "bg-blue-50 border-blue-500",
      textColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Done Payslips",
      value: calculateLoansStats().done,
      bgColor: "bg-green-50 border-green-500",
      textColor: "text-green-500",
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <NavigateHeder title="Payslips" />
      <FlatList
        refreshing={isRefetching}
        onRefresh={refetch}
        contentContainerClassName="gap-5 p-5"
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
        data={payslips}
        keyExtractor={(item) => item.id}
        renderItem={({ item: payslip }) => <PayslipCard payslip={payslip} />}
      />
    </View>
  );
};

export default Payslips;
