import CustomButton from "@/components/custom-button";
import CustomText from "@/components/custom-text";
import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { Link, RelativePathString, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

const LandingScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaLayoutWrapper>
      <View style={styles.container}>
        <View style={styles.branding}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              marginBottom: 20,
            }}
          >
            <Icon source="finance" size={60} color={primaryColor} />
          </View>
          <CustomText
            value="FinTrack"
            color="white"
            fontSize={40}
            fontWeight="700"
          />
          <CustomText
            value="Take control of your finances with Fintrack - your personal finance companion."
            color="#c1c0c0ff"
            fontSize={15}
            textAlign="center"
            marginTop={10}
            marginHorizontal={40}
          />
        </View>
        <View style={styles.navigation}>
          <CustomButton
            onPress={() => router.push("/register" as RelativePathString)}
            mode="outlined"
          >
            Get Started
          </CustomButton>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <CustomText
              value="Already have an account? "
              color="white"
              fontSize={16}
            />
            <Link href="/login" style={{ textDecorationLine: "underline" }}>
              <CustomText
                value="Login"
                color="white"
                fontSize={16}
                fontWeight="600"
              />
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaLayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: primaryColor,
  },
  branding: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navigation: {
    display: "flex",
    padding: 20,
    gap: 10,
  },
});

export default LandingScreen;
