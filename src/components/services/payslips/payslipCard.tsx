import Badge from "@/components/reusable/badge";
import Part from "@/components/reusable/mainCardParts";
import { IPayslipCard } from "@/types/interfaces";
import {
  getPayslipStatusBgColor,
  getPayslipStatusLabel,
  getPayslipStatusTextColor,
} from "@/utils/payslipStates";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";

const PayslipCard: FC<IPayslipCard> = ({ payslip }) => {
  const { push } = useRouter();
  const currency = payslip?.currency_id[1];
  return (
    <Pressable
      onPress={() => push(`/(tabs)/services/loans/details/${payslip?.id}`)}
      className="bg-white rounded-xl"
    >
      <View className="mb-3 rounded-xl">
        <View className="p-5 rounded-xl">
          <View className="flex-row justify-between items-start gap-2 mb-2">
            <Text className="flex-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
              {payslip?.display_name}
            </Text>

            <Badge
              className={`px-3 py-1 ${getPayslipStatusBgColor(payslip?.state)}`}
              textClassName={`text-xs font-medium
                  ${getPayslipStatusTextColor(payslip?.state)}`}
              name={getPayslipStatusLabel(payslip?.state)}
            />
          </View>

          <Text className="font-bold text-base mb-2">{`Period: ${payslip.date_from} - ${payslip.date_to}`}</Text>

          <View
            style={{ borderTopWidth: 0.5, borderTopColor: "#e5e7eb" }}
            className="flex-row justify-between items-center pt-4 border-gray-200"
          >
            <Part
              title="Basic waget"
              value={`${payslip?.basic_wage} ${currency}`}
            />
            <Part title="Net wage" value={`${payslip?.net_wage} ${currency}`} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PayslipCard;
