import { Stack } from "expo-router";

const VisitsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="new_visit" />
    </Stack>
  );
};

export default VisitsLayout;
