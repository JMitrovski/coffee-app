import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ImageComponent } from "./ImageComponent";
import { Transform } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import { COLORS } from "@/constants/Colors";
import { IModifications } from "@/interfaces/modifications";
import { TTypeOfModification } from "@/types/types";
import { ThemedView } from "./ThemedView";

export interface IOrderCardProps extends ViewProps {
  title: string;
  image: string;
  modifications?: IModifications<TTypeOfModification>[];
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
}

export function OrderCard({
  title,
  image,
  modifications = [],
  onPress,
  lightColor,
  darkColor,
  style,
  ...rest
}: IOrderCardProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const _renderDeleteButton = () => {
    return (
      <CustomButton
        title={"Remove item"}
        style={{
          height: 34,
          padding: 0,
          backgroundColor: COLORS.red,
        }}
        onPress={onPress}
        children={
          <View style={styles.customButtonSubview}>
            <Ionicons name="remove-outline" size={14} />
          </View>
        }
      />
    );
  };

  return (
    <View
      style={[styles.container, style, { backgroundColor: backgroundColor }]}
      {...rest}
    >
      <ImageComponent url={image} style={{ width: 80, height: 80 }} />
      <View style={{ flex: 1, padding: 8, alignItems: "center", gap: 12 }}>
        <ThemedText style={styles.title}>
          {Transform.capitalizeText(title)}
        </ThemedText>
        <ThemedView style={{ width: "100%", paddingHorizontal: 24 }}>
          <ThemedText type="subtitle" style={{ fontSize: 16 }}>
            Modifiers:
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>
            {Transform.stringifyModifiers(modifications)}
          </ThemedText>
        </ThemedView>
        {_renderDeleteButton()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
  },
  title: { fontSize: 20, fontWeight: 600, textAlign: "center" },
  customButtonSubview: {
    backgroundColor: "white",
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 8,
  },
});
