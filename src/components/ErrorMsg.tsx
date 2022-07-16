import React from 'react';
import {View} from 'react-native';
import {Colors} from 'Cards/assets/styles/Colors';
import Title from './Title';

export default function ErrorMsg({errorMsg}: {errorMsg: string}) {
  return (
    <View>
      <Title  numberOfLines={0} title={errorMsg} color={Colors.RED} style={{textAlign: 'left'}} />
    </View>
  );
}
