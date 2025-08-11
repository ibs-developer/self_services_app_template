import { Stack } from "expo-router";
import React from "react";

const ServicesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ServicesLayout;
