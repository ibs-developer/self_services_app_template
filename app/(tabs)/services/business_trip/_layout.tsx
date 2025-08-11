import { Stack } from 'expo-router';
const BusinessTripLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};
export default BusinessTripLayout;
