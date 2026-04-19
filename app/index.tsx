import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const IndexScreen = () => {
  const { checkingUserSession, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!checkingUserSession && !user) {
      router.replace("/landing");
    }
  }, [checkingUserSession, user]);

  return (
    <SafeAreaLayoutWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    </SafeAreaLayoutWrapper>
  );
};

export default IndexScreen;
