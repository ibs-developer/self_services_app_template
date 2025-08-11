import { Stack } from 'expo-router';

const LoansLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="new_loan" />
    </Stack>
  );
};

export default LoansLayout;
