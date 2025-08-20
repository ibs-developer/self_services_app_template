import Badge from "@/components/reusable/badge";
import Part from "@/components/reusable/mainCardParts";
import { ILoanCard } from "@/types/interfaces";
import {
  formatLoanDateRange,
  getLoanStatusBgColor,
  getLoanStatusLabel,
  getLoanStatusTextColor,
} from "@/utils/loanStatus";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";

const LoanCard: FC<ILoanCard> = ({ loan }) => {
  const { push } = useRouter();
  const currency = Array.isArray(loan?.currency_id) && loan?.currency_id[1];
  return (
    <Pressable
      onPress={() => push(`/(tabs)/services/loans/details/${loan.id}`)}
      className="bg-white rounded-xl"
    >
      <View className="mb-3 rounded-xl">
        <View className="p-5 rounded-xl">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {loan.name}
            </Text>
            <Badge
              className={`px-3 py-1 ${getLoanStatusBgColor(loan.state)}`}
              textClassName={`text-xs font-medium
                  ${getLoanStatusTextColor(loan.state)}`}
              name={getLoanStatusLabel(loan.state)}
            />
          </View>

          <Text className="font-bold text-base mb-2">
            {formatLoanDateRange(loan.payment_date, loan.installment)}
            {/* {formatLoanDateRange('2025-04-12', 24)} */}
          </Text>

          <View
            style={{ borderTopWidth: 0.5, borderTopColor: "#e5e7eb" }}
            className="flex-row justify-between items-center pt-4 border-gray-200"
          >
            <Part
              title="Loan Amount"
              value={`${loan.loan_amount.toLocaleString("en-US") || 0} ${currency}`}
            />
            <Part title="Installment" value={loan.installment || 0} />
            <Part
              title="Installment amount"
              value={`${(loan.loan_amount / loan.installment).toLocaleString("en-US") || 0} ${currency}`}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default LoanCard;
