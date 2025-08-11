import React, { FC, ReactNode, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Background, Button, Header } from "@/components/passwordUtils";
import NavigationHeader from "@/components/reusable/navigationHeader";
import { IconMail, IconPhone } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";

interface ISelection {
  icon: ReactNode;
  title: string;
  text: string;
  isSelected?: boolean;
  onPress: () => void;
}
const Selection: FC<ISelection> = ({
  icon,
  title,
  text,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`
        ${isSelected ? "border border-blue-400" : "border-[0.5px] border-gray-600"}
         rounded-xl p-4 flex-row items-center justify-between transition-all duration-200
         `}
    >
      <View className="flex-row gap-4">
        <View
          className={` ${isSelected ? "bg-blue-400" : "bg-gray-300/50"} rounded-xl w-[45] aspect-square items-center justify-center transition-all duration-200`}
        >
          {icon}
        </View>
        <View className="gap-2">
          <Text className="font-bold"> {title} </Text>
          <Text className="text-sm"> {text} </Text>
        </View>
      </View>
      <View
        className={`rounded-full border-2 w-[25] h-[25] relative ${isSelected ? "border-blue-400" : "border-gray-600"} transition-all duration-200 `}
      >
        <View
          className={`rounded-full w-[18] h-[18] absolute top-[1.34] left-[1.34] bg-blue-400 ${isSelected ? "scale-100" : "scale-0"} transition-all duration-200`}
        />
      </View>
    </Pressable>
  );
};

const ForgotPassword = () => {
  const [selected, setSelected] = useState<"email" | "phone">("email");
  const { push } = useRouter();

  return (
    <View className="flex-1 bg-white">
      <NavigationHeader />
      <View className="p-6 pt-0 flex-1 justify-between">
        <Header
          title="Forgot password 🤔"
          subTitle="Select which contact details should we use to reset your password"
        />
        <Background imgPath={require("@/assets/images/forgot.png")} />
        <View className="gap-4">
          <Selection
            onPress={() => setSelected("email")}
            icon={
              <IconMail
                color={selected === "email" ? "white" : "gray"}
                strokeWidth={1.5}
              />
            }
            title="Email"
            text="test@test.test"
            isSelected={selected === "email"}
          />
          <Selection
            onPress={() => setSelected("phone")}
            icon={
              <IconPhone
                color={selected === "phone" ? "white" : "gray"}
                strokeWidth={1.5}
              />
            }
            title="Phone Number"
            text="010 000 000 00"
            isSelected={selected === "phone"}
          />
        </View>
        <Button
          onPress={() => {
            push("/login/otp_verification");
          }}
          text="Continue"
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
