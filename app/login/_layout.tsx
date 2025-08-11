import { Stack } from "expo-router";
import React from "react";

const LoginLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
};

export default LoginLayout;
