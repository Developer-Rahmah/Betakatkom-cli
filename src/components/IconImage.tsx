import React from "react";
import { I18nManager, Image, ImageSourcePropType } from "react-native";
import { Colors } from "Cards/assets/styles/Colors";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../services/helper/Constant";

export default function IconImage({
  source,
  color,
  small,
  style,
  transform,
  verySmall

}: {
  source: ImageSourcePropType;
  color?: Colors;
  small?: boolean;
  style?:{}
  transform?: boolean;
  verySmall?:boolean;
}) {
  return (
    <Image
      resizeMode="contain"
      source={source}
      style={[
        small
          ? {
              width: SCREEN_HEIGHT / 30,
            height: SCREEN_HEIGHT / 30,
              resizeMode: "contain"
            }
          : verySmall
            ? { width: SCREEN_WIDTH / 30, height: SCREEN_WIDTH / 30 }
          : {
              width: SCREEN_WIDTH / 7,
              height: SCREEN_WIDTH / 7
            },
        {
          tintColor: color,
          transform: [
            {
              rotateY: transform
                ? I18nManager.isRTL
                  ? '180deg'
                  : '0deg'
                : '0deg',
            },
          ],
        },style
      ]}
    />
  );
}
