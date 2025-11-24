import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" translucent={false} />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="create-task"
          options={{ title: "Create New Task", headerTitleAlign: "center" }}
        />
      </Stack>
    </>
  );
}
