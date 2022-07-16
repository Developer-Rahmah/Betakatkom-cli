import React from 'react';
import {View} from 'react-native';
import { SCREEN_WIDTH } from '../services/helper/Constant';

export default function Col({
  children,
  style = {},
}: {
  children: JSX.Element;
  style: object;
}) {
  return <View style={[style]}>{children}</View>;
}
