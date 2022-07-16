import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Layout from 'Cards/assets/styles/Layout';
import General from 'Cards/assets/styles/General';
import Title from './Title';
import Elements from 'Cards/assets/styles/Elements';

export default function Button(props: {
  onClick: () => void;
  locked?: boolean;
  title: string;
  withBorder?: boolean;
  backgroundColor?: Colors;
  txtColor: Colors;
  style?: any;
}) {
  const handlePress = async () => {
    if (!props.locked) {
      await props.onClick();
      return;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={props.locked}
      style={[
        Layout.flexCenter,
        Elements.primaryButton,
        General.largeMarginVertical, {},
        { opacity: props.locked ? 0.3 : 1, ...props.style }
      ]}>
      <Title title={props.title} color={props.txtColor} />
    </TouchableOpacity>
  );
}
