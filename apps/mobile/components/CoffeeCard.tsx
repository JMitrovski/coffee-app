import { Pressable, StyleSheet, View, type ViewProps } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORS } from "@/constants/Colors";
import { ImageComponent } from "./ImageComponent";
import { TransformService } from "@/services/transform";

export interface ICoffeeCardProps extends ViewProps {
  title: string;
  description: string;
  image: string;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
}

export function CoffeeCard({
  title,
  description,
  image,
  onPress,
  lightColor,
  darkColor,
  style,
  ...rest
}: ICoffeeCardProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      style={[{ backgroundColor: backgroundColor }, styles.container, style]}
      {...rest}
    >
      <View style={styles.innerContainer}>
        <ImageComponent url={image} style={styles.image} />
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            {TransformService.getInstance().capitalizeText(title)}
          </ThemedText>
          <ThemedText style={styles.description} numberOfLines={3}>
            {description}
          </ThemedText>
        </View>
      </View>
      <Pressable onPress={onPress}>
        <ThemedText style={styles.seeMore}>See more</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: { width: 110, height: 110 },
  textContainer: { gap: 6, padding: 8, flex: 1 },
  title: { fontSize: 24, fontWeight: 600, textAlign: "center" },
  description: { fontSize: 16 },
  seeMore: {
    textAlign: "center",
    marginBottom: 12,
    textDecorationLine: "underline",
    color: COLORS.blue,
    fontSize: 14,
  },
});
