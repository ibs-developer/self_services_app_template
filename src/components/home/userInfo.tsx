import { useEmployeeDetails } from "@/hooks/api/hr/use.Hr.Employee";
import { getEmployeeImage } from "@/utils/getEmployeeImage";
import { IconBell } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";
import Avatar from "../reusable/avatar";

const UserInfo = () => {
  const { data: user } = useEmployeeDetails();
  const iconProps = { color: "#60a5fa", size: 35, strokeWidth: 1.5 };

  return (
    <View className="flex-row justify-between items-center p-5">
      <View className="flex-row items-center">
        <Avatar
          source={{
            uri: getEmployeeImage(user?.avatar_128) || "",
          }}
        />
        <View className="ml-4">
          <Text className="text-lg font-bold text-black dark:text-gray-100">
            {user?.name || "John Doe"}
          </Text>
          <Text className="text-sm text-black dark:text-gray-200 opacity-90">
            {user?.job_title || "Employee Role"}
          </Text>
        </View>
      </View>
      <View className="h-[45px] aspect-square justify-center items-center">
        <IconBell {...iconProps} />
      </View>
    </View>
  );
};

export default UserInfo;
