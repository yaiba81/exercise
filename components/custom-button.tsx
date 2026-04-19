import { primaryColor } from "@/constants";
import React from "react";
import { Text } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

interface CustomButtonProps extends ButtonProps {}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <Button
      {...props}
      style={{
        borderRadius: 5,
        height: 50,
        justifyContent: "center",
        backgroundColor: props.mode === "outlined" ? "white" : primaryColor,
      }}
      mode={props.mode || "contained"}
    >
      <Text
        style={{
          fontWeight: "700",
          color: props.mode === "outlined" ? primaryColor : "white",
          fontSize: 16,
        }}
      >
        {props.children}
      </Text>
    </Button>
  );
};

export default CustomButton;
