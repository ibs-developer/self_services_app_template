import Button from "@/components/reusable/button";
import { ControlledInput } from "@/components/reusable/input";
import { useLogin } from "@/hooks/api/useLogin";
import { loginForm } from "@/types/schemas";
import getDeviceId from "@/utils/GetDeviceInfo";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  const { doLogin, isPending } = useLogin();
  const form = useForm<loginForm>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = async (data: loginForm) => {
    try {
      const device_id = await getDeviceId();
      // "470c3722f1ae7288";
      if (!device_id) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to get device MAC address. Please try again.",
        });
        return;
      }
      doLogin({
        ...data,
        device_id,
      });
    } catch (error) {
    } finally {
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 p-6 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header => Logo and welcome */}
          <View>
            {/* logo */}
            <View className="h-[120] aspect-square mb-6">
              <Image
                className="h-full w-full"
                source={require("@/assets/images/IBS.jpg")}
              />
            </View>

            {/* welcome */}
            <View className=" gap-4 mb-4">
              <Text className="font-bold text-4xl">Welcome Back 👋</Text>
              <View className="flex-row gap-3">
                <Text className="font-bold text-4xl">to</Text>
                <Text className="font-bold text-4xl text-primary">
                  Self Services
                </Text>
              </View>
              <Text className="text-gray-400 mb-4">
                Hello there, login to continue
              </Text>
            </View>
          </View>

          {/* form */}
          <View className="gap-6">
            {/* email */}
            <ControlledInput
              control={control}
              rules={{
                required: "Email is required",
              }}
              name="email"
              label="Email"
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              className="border-primary"
              labelClassName="text-primary"
            />

            {/* password */}
            <ControlledInput
              control={control}
              rules={{
                required: "Password is required",
              }}
              name="password"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              className="border-primary"
              labelClassName="text-primary"
            />

            <Link
              href={"/login/forgot_password"}
              className="text-blue-400 font-[600] self-end py-3 text-"
            >
              Forgot Password ?
            </Link>
            <Button
              onPress={handleSubmit(onSubmit)}
              isPressed={isPending}
              title="Log in"
              className="bg-primary h-[70]"
              disabledClassName="bg-secondary"
              textClassName="text-white"
              loaderSize={25}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
