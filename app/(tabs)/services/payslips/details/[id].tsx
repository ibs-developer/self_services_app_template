import DetaileField from "@/components/reusable/deatileField";
import NavigationHeader from "@/components/reusable/navigationHeader";
import { useHrPayslipDetail } from "@/hooks/api/hr/use.Hr.Payslip";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const PayslipDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: payslip,
    isLoading,
    refetch,
    isRefetching
  } = useHrPayslipDetail(id.toString(), {
    fields:
      "id,name,number,date_from,date_to,display_name,contract_id,struct_id,payslip_run_id,worked_days_line_ids",
    populate: "worked_days_line_ids:number_of_hours,number_of_days",
  });

  console.log("Payslip Details", JSON.stringify(payslip, null, 2));

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View className="flex-1">
      <NavigationHeader title="Payslip Details" />
      <ScrollView
        contentContainerClassName="p-6"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <DetaileField
          title="Period"
          value={`${payslip?.date_from} - ${payslip?.date_to}`}
        />
        <DetaileField title="Contarct" value={payslip?.contract_id?.[1]} />
        <DetaileField title="Batch" value={payslip?.payslip_run_id?.[1]} />
        <DetaileField title="Structure" value={payslip?.struct_id?.[1]} />
      </ScrollView>
    </View>
  );
};

export default PayslipDetails;
