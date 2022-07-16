import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "Cards/assets/styles/Colors";

import { SCREEN_HEIGHT } from "../services/helper/Constant";
import { useTranslation } from "../services/hooks";

export default function Title({
  title,
  color = Colors.BLACK,
  numberOfLines = 1,
  fontFamily = "Cairo-Regular",
  small = false,
  medium = false,
  large = false,
  style
}: {
  title?: string;
  color?: string;
  numberOfLines?: number;
  fontFamily?: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  style?:{}
}) {
  const t = useTranslation();

  return (
    <Text
      style={[
        styles.title,
        {
          color,
          fontFamily: fontFamily,
          fontSize: small
            ? SCREEN_HEIGHT / 60
            : medium
            ? SCREEN_HEIGHT / 47
            : large
            ? SCREEN_HEIGHT / 25
            : SCREEN_HEIGHT / 55
        },style
      ]}
      numberOfLines={numberOfLines}
    >
      {t(title)}
          </Text>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: SCREEN_HEIGHT / 35,
    textAlign: "center"
  }
});
