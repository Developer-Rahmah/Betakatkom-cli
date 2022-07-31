import React, { useEffect } from 'react';
import {
  ImageBackground,
} from 'react-native';

import Background from 'Cards/assets/images/background.jpeg';

import Header from 'Cards/src/components/Header';
import Exit from "Cards/assets/icons/exit.png";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';

export default function NotificationsScreen() {

  useEffect(() => {
  }, [])

  return (
    <ImageBackground style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} resizeMode='repeat' source={Background}>
      <Header exit leftIcon={Exit} />

    </ImageBackground>

  );
}

