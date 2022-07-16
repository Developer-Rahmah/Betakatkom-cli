import React, { useState } from 'react';
import {
  ImageSourcePropType,
  KeyboardType,
  TouchableOpacity,
  View,
} from 'react-native';
// import { TextField } from 'rn-material-ui-textfield';
import { Colors } from 'Cards/assets/styles/Colors';
import Elements from 'Cards/assets/styles/Elements';
import Layout from 'Cards/assets/styles/Layout';
import Eye from 'Cards/assets/icons/eye.png';
import EyeWithLine from 'Cards/assets/icons/eye-with-line.png';
import { TypingAnimation } from 'react-native-typing-animation';

import IconImage from './IconImage';
import { useTranslation } from '../services/hooks';
import { TextField } from 'native-base';

export default function Input({
  onChangeText,
  keyboardType,
  leftIcon: leftIcon,
  placeholder,
  isPassword,
  maxLength = null
}: {
  onChangeText?: any;
  value?: string;
  label?: string;
  keyboardType?: KeyboardType;
  leftIcon?: ImageSourcePropType;
  placeholder?: string;
  isPassword?: boolean;
  maxLength?: number;
}) {
  const [showPassword, setShowPassword] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);
  const t = useTranslation()
  const renderRightAccessory = () => {
    return (
      <>
        {isPassword ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <IconImage
              small
              style={{ marginStart: 10 }}
              source={showPassword ? EyeWithLine : Eye}
            />
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  const renderLeftAccessory = () => {
    return <IconImage small style={{ marginEnd: 10 }} source={leftIcon} />;
  };
  const _typing = () => {
    return (
      <TypingAnimation
        dotColor="#93278f"
        style={{ marginRight: 25 }}
      />
    )
  }
  return (
    <>
      <TextField
        maxLength={maxLength}
        variant="outlined"
        renderRightAccessory={() => renderRightAccessory()}
        renderLeftAccessory={() => renderLeftAccessory()}
        label={t(placeholder)}
        secureTextEntry={showPassword}
        onBlur={() => setIsFocused(false)}
        lineWidth={0}
        labelTextStyle={{ color: 'red', fontSize: 10, top: -12 }}
        activeLineWidth={0}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onFocus={() => { setIsFocused(true) }}
        baseColor={Colors.LIGHT_GRAY}
        // affixTextStyle={{marginTop: -20}}
        // contentInset={{input: -5}}
        keyboardType={keyboardType}
        inputContainerStyle={[Layout.flexCenter, { height: 50 }]}
        // tvParallaxShiftDistanceY={-100}
        onChangeText={onChangeText}
        containerStyle={[
          Elements.inputContainer,
          { borderColor: isFocused ? Colors.PURPLE : Colors.LIGHT_GRAY, }
        ]}
      />

    </>

  );
}
