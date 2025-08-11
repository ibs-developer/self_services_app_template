import { IServiceTab } from "@/types/interfaces";
import React, { FC } from "react";
import { Pressable, Text } from "react-native";

const ServiceTab: FC<IServiceTab> = ({
  onPress,
  className,
  textClassName,
  icon,
  label,
}) => {
  return (
    <Pressable
      onPress={onPress && onPress}
      className={`w-[48%] aspect-square border rounded-xl justify-center items-center gap-4 ${className}`}
    >
      {icon}
      <Text
        className={`text-lg font-[600] ${textClassName || "text-textColor"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default ServiceTab;
