import Badge from "@/components/reusable/badge";
import Part from "@/components/reusable/mainCardParts";
import {
  getVisitStatusBgColor,
  getVisitStatusLabel,
  getVisitStatusTextColor,
} from "@/utils/visitState";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const VisitCard = ({ visit }) => {
  const { push } = useRouter();
  return (
    <Pressable
      onPress={() => push(`/(tabs)/services/visits/details/${visit.id}`)}
      className="bg-white rounded-xl"
    >
      <View className="mb-3 rounded-xl">
        <View className="p-5 rounded-xl">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-sm text-gray-600 font-bold">
              {visit.display_name}
            </Text>
            <Badge
              className={`px-3 py-1 ${getVisitStatusBgColor(visit.state)}`}
              textClassName={`text-xs font-medium
                  ${getVisitStatusTextColor(visit.state)}`}
              name={getVisitStatusLabel(visit.state)}
            />
          </View>

          <Text className="text-base mb-2">{visit?.partner_id?.[1]}</Text>

          <View
            style={{ borderTopWidth: 0.5, borderTopColor: "#e5e7eb" }}
            className="pt-4 border-gray-200"
          >
            <Part title="Created at :" value={visit.creatted_at} />
            <Part small title="Location :" value={visit.visit_location} />
            
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default VisitCard;
