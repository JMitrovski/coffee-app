import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedViewProps } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

function DisabledView({ lightColor, darkColor }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundOpacity"
  );
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]} />
  );
}

export default DisabledView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
