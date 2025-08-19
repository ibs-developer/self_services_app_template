import { IStateCard } from "@/types/interfaces";
import React, { FC } from "react";
import { Pressable, Text } from "react-native";

const StateCard: FC<IStateCard> = ({
  className,
  textClassName,
  name = "In progress",
  count = 40,
  ...props
}) => {
  return (
    <Pressable
      className={`border w-[48%] rounded-xl p-5 gap-2 ${className}`}
      {...props}
    >
      <Text className={`font-[600] text-lg ${textClassName}`}> {name} </Text>
      <Text className={`font-bold ${textClassName}`}> {count} </Text>
    </Pressable>
  );
};

export default StateCard;
