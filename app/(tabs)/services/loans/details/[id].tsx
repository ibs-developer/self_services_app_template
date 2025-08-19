import Button from "@/components/reusable/button";
import DetaileField from "@/components/reusable/deatileField";
import NavigationHeader from "@/components/reusable/navigationHeader";
import { useHrLoanDetail, useUpdateHrLoan } from "@/hooks/api/use.Hr.loan";
import { THrLoan } from "@/types";
import { getLoanStatusLabel } from "@/utils/loanStatus";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const LoanDetails = () => {
  const { id } = useLocalSearchParams();
  const { back } = useRouter();
  const { data, isLoading, isRefetching, refetch } = useHrLoanDetail(
    id.toString()
  );
  const loan = data ? data[0] : ({} as THrLoan);
  const isCanceled = loan.state === "cancel";
  const isSubmitted = loan.state === "waiting_approval_1";
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [state, setState] = useState("");

  const { doLoanUpdate, isPending } = useUpdateHrLoan(() => {
    state === "canceled"
      ? Toast.show({
          type: "info",
          text1: "You canceled the loan",
        })
      : Toast.show({
          type: "success",
          text1: "Loan Submitted",
        });
    setUpdateState(true);
    back();
  });
  const getUpdatePayload = (
    newState: "draft" | "approve" | "refuse" | "cancel" | "waiting_approval_1"
  ) => {
    const { employee_id, id, ...rest } = loan;
    return { id, state: newState };
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading. . . . </Text>
      </View>
    );
  }

  return (
    <View style={{ height: "100%" }} className="bg-background">
      <NavigationHeader title="Loan Details" />
      <ScrollView
        contentContainerClassName="p-6"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <DetaileField
          title="Employee"
          value={loan.employee_id[1]}
          section="loan"
          badge={{ name: getLoanStatusLabel(loan.state), state: loan.state }}
        />
        <DetaileField title="Date" value={loan.date} />
        <DetaileField title="Department" value="" />
        <DetaileField title="Jop Position" value="" />
        <DetaileField title="Loan Amount" value={loan.loan_amount} />
        <DetaileField title="No Of Installments" value={loan.installment} />
        <DetaileField title="Payment Start Date" value={loan.payment_date} />
        <DetaileField
          title="Total Paid Amount"
          value={loan.total_paid_amount}
        />
        <DetaileField title="Balance Amount" value={loan.balance_amount} />

        {isCanceled || isSubmitted || updateState ? null : (
          <View className="gap-4 mt-5">
            <Button
              isPressed={isPending}
              onPress={() => {
                setState("canceled");
                doLoanUpdate(getUpdatePayload("cancel"));
              }}
              title="Cancel"
              className="bg-red-500 h-[70]"
              disabledClassName="bg-red-200"
              textClassName="text-white"
              loaderSize={25}
              
            />
            <Button
              isPressed={isPending}
              onPress={() => {
                setState("submitted");
                doLoanUpdate(getUpdatePayload("waiting_approval_1"));
              }}
              title="Submit"
              className="bg-[#881337] h-[70]"
              disabledClassName="bg-[#be123c]"
              textClassName="text-white"
              loaderSize={25}
              
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LoanDetails;
