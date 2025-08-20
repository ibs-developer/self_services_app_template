import { Stack } from "expo-router";
import React from "react";

const LoginLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="device_mismatch" />
      <Stack.Screen name="forgot_password" />
      <Stack.Screen name="new_password" />
      <Stack.Screen name="otp_verification" />
    </Stack>
  );
};

export default LoginLayout;
