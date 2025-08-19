import { IconChevronLeft } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { INavigationHeader } from "../../types/interfaces";

const NavigationHeader: FC<INavigationHeader> = ({
  title,
  onBackPress,
  subComponent,
}) => {
  const { back } = useRouter();
  const handleBack = () => {
    back();
    onBackPress && onBackPress();
  };
  return (
    <View className="flex-row items-center justify-center p-4 relative">
      <View className="absolute left-4">
        <IconChevronLeft size={25} onPress={handleBack} />
      </View>
      <View>
        <Text className="text-lg font-bold">{title}</Text>
      </View>
      <View className="absolute right-4">
        <Text>{subComponent}</Text>
      </View>
    </View>
  );
};

export default NavigationHeader;
