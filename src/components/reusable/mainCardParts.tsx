import { IPart } from "@/types/interfaces";
import { FC } from "react";
import { Text, View } from "react-native";

const Part: FC<IPart> = ({ title, value, small }) => {
  return (
    <View
      className={`${small ? "flex-row w-[100%] items-center gap-2 justify-start" : "items-center"}`}
    >
      <Text className="text-base font-medium text-gray-400">{title}</Text>
      <Text
        className={`${small ? "text-xs w-[80%] line-clamp-1" : "font-bold text-center"}`}
      >
        {value}
      </Text>
    </View>
  );
};
export default Part;
