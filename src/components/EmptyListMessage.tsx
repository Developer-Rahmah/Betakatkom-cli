import React from 'react';
import {View} from 'react-native';
import {Colors} from 'Cards/assets/styles/Colors';
import Elements from 'Cards/assets/styles/Elements';
import Layout from 'Cards/assets/styles/Layout';
import Title from './Title';

const EmptyListMessage = ({}) => {
  return (
    <View
      style={[
        Layout.flexCenter,
        Elements.noItemsMessageContainer,
        Layout.fullWidth,
      ]}>
      <Title color={Colors.GRAY} numberOfLines={0} title="No Record Found" />
    </View>
  );
};

export default EmptyListMessage;
