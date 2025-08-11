import { ISquare } from "@/types/interfaces";
import React, { FC } from "react";
import { Text, View } from "react-native";

const Square: FC<ISquare> = ({ icon, title, time, text, isRow, day }) => (
  <View
    style={{ gap: 10 }}
    className={`flex-1 ${isRow ? "flex-row" : "flex-col"} justify-between p-5 bg-white rounded-xl`}
  >
    <View className="flex-row gap-2 items-center">
      <View className="bg-background w-[45] aspect-square items-center justify-center rounded-xl">
        {icon}
      </View>
      <View className="gap-2">
        <Text
          style={{
            fontSize: title.length > 11 ? 11 : 15,
          }}
          className="font-[600]"
        >
          {title}
        </Text>
        {day ? <Text className="text-gray-300"> {day} </Text> : null}
      </View>
    </View>
    <View>
      <Text className="text-[20px] font-bold">{time}</Text>
      <Text className={`${isRow ? "text-end" : "text-start"}`}>{text}</Text>
    </View>
  </View>
);

export default Square;
