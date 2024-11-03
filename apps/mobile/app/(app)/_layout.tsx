import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="coffee-details/[id]"
        options={{
          title: "Coffee details",
          headerBackTitle: "Back",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
