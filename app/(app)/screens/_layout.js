import { Stack } from "expo-router";

export default function ScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create" />
      <Stack.Screen name="overview" />
      <Stack.Screen name="simple_overview" />
    </Stack>
  );
}
