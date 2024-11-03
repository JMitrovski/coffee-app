import { Image, ImageProps } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

interface IImageProps extends ImageProps {
  url: string;
  lightColor?: string;
  darkColor?: string;
}

export function ImageComponent({
  style,
  url,
  lightColor,
  darkColor,
  ...rest
}: IImageProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondaryBackground"
  );
  return (
    <Image
      style={[style, { backgroundColor: backgroundColor }]}
      resizeMode="cover"
      source={{ uri: url }}
      {...rest}
    />
  );
}
