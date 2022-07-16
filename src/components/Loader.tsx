import { Colors } from 'Cards/assets/styles/Colors';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = ({}) => {
  return <ActivityIndicator color={Colors.BLACK} size="large" />;
};

export default Loader;
