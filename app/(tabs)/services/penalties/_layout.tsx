import { Stack } from 'expo-router';

const PenaltiesLayout = () => {
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

export default PenaltiesLayout;
