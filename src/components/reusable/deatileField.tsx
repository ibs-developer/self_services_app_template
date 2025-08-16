import { IDetaleField } from "@/types";
import { getStatusBgColor, getStatusTextColor } from "@/utils/leaveStatus";
import {
  getLoanStatusBgColor,
  getLoanStatusTextColor,
} from "@/utils/loanStatus";
import React, { FC } from "react";
import { Text, View } from "react-native";
import Badge from "./badge";

const DetaileField: FC<IDetaleField> = ({ title, value, badge, section }) => {
  const loan = section === "loan";
  const leave = section === "leave";


  return (
    <View
      style={{ borderBottomColor: "#d1d5db" }}
      className="space-y-3 border-b p-2 mb-2 flex-row justify-between items-center"
    >
      <View>
        <Text className="text-sm text-gray-400 mb-1">{title}</Text>

        <Text className="text-base font-medium">{value || "---"}</Text>
      </View>
      {badge ? (
        <Badge
          className={`px-3 py-1 ${loan ? getLoanStatusBgColor(badge.state) : leave ? getStatusBgColor(badge.state) : ""}`}
          textClassName={`text-xs font-medium
                  ${loan ? getLoanStatusTextColor(badge.state) : leave ? getStatusTextColor(badge.state) : ""}`}
          name={badge.name}
        />
      ) : null}
    </View>
  );
};

export default DetaileField;
