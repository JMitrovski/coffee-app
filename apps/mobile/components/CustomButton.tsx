import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { COLORS } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { Surface } from "react-native-paper";

interface ICustomButton extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

function CustomButton({ title, style, children, ...props }: ICustomButton) {
  return (
    <Pressable {...props}>
      <Surface
        testID="button-surface"
        elevation={4}
        style={[styles.container, style]}
      >
        {children}
        <ThemedText type="defaultSemiBold" style={styles.text}>
          {title}
        </ThemedText>
      </Surface>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 22,
    height: 44,
    backgroundColor: COLORS.blue,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
});
