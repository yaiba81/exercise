import { primaryColor } from "@/constants";
import { AuthState, useAuthStore } from "@/store/auth-store";
import * as NavigationBar from "expo-navigation-bar";
import { RelativePathString, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider, useTheme } from "react-native-paper";

NavigationBar.setButtonStyleAsync("dark");

export default function RootLayout() {
  const router = useRouter();
  const theme = useTheme();
  const { checkUserSession, user }: AuthState = useAuthStore();

  theme.colors.primary = primaryColor;

  useEffect(() => {
    checkUserSession();
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/user/home" as RelativePathString);
    }
  }, [user]);

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </PaperProvider>
  );
}
