import { IPart } from "@/types/interfaces";
import { FC } from "react";
import { Text, View } from "react-native";

const Part: FC<IPart> = ({ title, value }) => {
  return (
    <View>
      <Text className="text-base font-medium text-gray-400 dark:text-gray-400">
        {title}
      </Text>
      <Text className="font-bold text-center">{value}</Text>
    </View>
  );
};
export default Part