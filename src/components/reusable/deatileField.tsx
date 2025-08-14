import { IDetaleField } from "@/types";
import { getStatusBgColor, getStatusTextColor } from "@/utils/leaveStatus";
import React, { FC } from "react";
import { Text, View } from "react-native";

const DetaileField: FC<IDetaleField> = ({ title, value, badge }) => {
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
        <View
          className={`border px-2 py-1 rounded-2xl ${getStatusBgColor(badge.state)}`}
        >
          <Text className={`${getStatusTextColor(badge.state)}`}>
            {badge.name}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default DetaileField;
