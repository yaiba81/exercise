import CustomButton from "@/components/custom-button";
import CustomText from "@/components/custom-text";
import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { loginUser } from "@/services/users";
import { Link, RelativePathString, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await loginUser(data);
      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "You have been logged in successfully.",
        });
        setTimeout(() => {
          router.replace("/user/home" as RelativePathString);
        }, 1000);
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2:
          error instanceof Error
            ? error.message
            : "An error occured during login. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaLayoutWrapper>
      <View
        style={{
          flex: 1,
          paddingVertical: 25,
          paddingHorizontal: 30,
          gap: 20,
          backgroundColor: "#ffffff",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/landing")}>
          <Icon source="arrow-left" size={30} />
        </TouchableOpacity>
        <View
          style={{
            gap: 10,
            marginTop: 80,
          }}
        >
          <CustomText
            value="Welcome Back"
            fontSize={35}
            fontWeight="700"
            color={primaryColor}
          />
          <CustomText
            value="Enter all the details to continue"
            fontSize={16}
            fontWeight="600"
            color="#454545ff"
          />
        </View>

        <View
          style={{
            flex: 1,
            gap: 30,
          }}
        >
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  mode="outlined"
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && <Text>This is required.</Text>}
          </View>

          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  mode="outlined"
                  label="Password"
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}
          </View>

          <CustomButton
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          >
            Login
          </CustomButton>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <CustomText
              value="Don't have an account? "
              color={primaryColor}
              fontSize={16}
              fontWeight="600"
            />
            <Link href="/register" style={{ textDecorationLine: "underline" }}>
              <CustomText
                value="Register"
                color={primaryColor}
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

export default LoginScreen;
