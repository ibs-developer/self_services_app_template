import Button from "@/components/reusable/button";
import Input, { ControlledInput, InputDate } from "@/components/reusable/input";
import NavigationHeader from "@/components/reusable/navigationHeader";
import TotalInstallment from "@/components/services/loans/totalInstallment";
import { useEmployeeDetails } from "@/hooks/api/hr/use.Hr.Employee";
import { useCreateHrLoan } from "@/hooks/api/hr/use.Hr.loan";
import { THrLoan } from "@/types";
import { getMonthlyDates } from "@/utils/loanStatus";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

const NewLoan = () => {
  const { back } = useRouter();
  const { data: user } = useEmployeeDetails({
    fields: "name",
  });
  const { doHrLoanCreate, isPending } = useCreateHrLoan(() => {
    Toast.show({
      type: "success",
      text1: "New Loan created successfully",
    });
    back();
  });
  const form = useForm<THrLoan>();
  const { control, handleSubmit, watch, formState } = form;
  const { isSubmitting } = formState;
  const loanDate = watch("date");
  const loanAmount = watch("loan_amount");
  const totalInstallment = watch("installment");
  const paymentStartDate = watch("payment_date");

  const fieldsRequired =
    loanDate === undefined ||
    loanAmount === undefined ||
    totalInstallment === undefined ||
    paymentStartDate === undefined;

  const submit = (data: THrLoan) => {
    doHrLoanCreate(data);
  };
  const [installmentMonths, setMonths] = useState<string[]>([]);
  useEffect(() => {
    if (paymentStartDate && totalInstallment) {
      const months = getMonthlyDates(paymentStartDate, totalInstallment);
      setMonths(months);
    }
  }, [paymentStartDate, totalInstallment]);
  return (
    <View className="flex-1 bg-background">
      <NavigationHeader title="New Loan" />
      <ScrollView contentContainerClassName="gap-4 px-4 py-6">
        <Input
          value={user?.name || ""}
          label="Employee"
          editable={false}
          className="border-primary"
          labelClassName="text-primary"
        />
        <InputDate
          control={control}
          name="date"
          label="Date"
          className="border-primary"
          labelClassName="text-primary"
          rules={{ required: "Date is required" }}
        />
        <ControlledInput
          control={control}
          name="loan_amount"
          label="Loan Amount"
          className="border-primary"
          labelClassName="text-primary"
          rules={{ required: "Loan amount is required" }}
          keyboardType="numeric"
          placeholder="Enter loan amount"
        />
        <ControlledInput
          control={control}
          name="installment"
          label="No Of Installments"
          className="border-primary"
          labelClassName="text-primary"
          rules={{ required: "No Of Installments is required" }}
          keyboardType="numeric"
          placeholder="Enter No Of Installments"
        />
        <InputDate
          control={control}
          name="payment_date"
          label="Payment Start Date"
          className="border-primary"
          labelClassName="text-primary"
          rules={{ required: "Payment Start Date is required" }}
        />

        {/* compute installment component */}
        {totalInstallment && paymentStartDate && loanAmount ? (
          <TotalInstallment
            dates={installmentMonths}
            installment={loanAmount / totalInstallment}
          />
        ) : null}

        {/* buttons */}
        <View className="justify-between gap-3">
          <Button
            title="Discard"
            onPress={back}
            disabled={isSubmitting || isPending}
            className="bg-red-500 h-[50]"
            disabledClassName="bg-red-200"
            textClassName="text-white"
          />
          <Button
            title="Submit"
            onPress={handleSubmit(submit)}
            isPressed={isSubmitting || isPending}
            disabled={fieldsRequired}
            className="bg-primary h-[50]"
            disabledClassName="bg-secondary"
            textClassName="text-white"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default NewLoan;
