import { IFilterButton } from "@/types/interfaces";
import { FC } from "react";
import { Pressable, Text } from "react-native";

const FilterButton: FC<IFilterButton> = ({ active, onPress, title, className }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 p-5 rounded-xl transition-all duration-200 ${className} ${active ? "bg-primary" : ""}`}
    >
      <Text
        className={`text-xl font-[600] text-center transition-all duration-200 ${active ? "text-white" : "text-black"}`}
      >
        {title}
      </Text>
    </Pressable>
  );
};
export default FilterButton;
