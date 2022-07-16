import { useRoute } from '@react-navigation/native';
import Background from 'Cards/assets/images/background.jpeg';
import General from 'Cards/assets/styles/General';
import Layout from 'Cards/assets/styles/Layout';
import Balance from 'Cards/src/components/Balance';
import Header from 'Cards/src/components/Header';
import Rows from 'Cards/src/components/Rows';
import { SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import ColumnCard from 'Cards/src/components/ColumnCard';
import Step from 'Cards/src/components/Step';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';
import CardType from 'Cards/src/components/CardType';
import Exit from "Cards/assets/icons/exit.png";
// import { BleManager } from 'react-native-ble-plx';


const FirstScreen = () => {
  // const [bleManager, setBleManager] = useState(new BleManager())
  const data = [
    { name: 'Charge Cards       Print', type: 0 },
    { name: `Charge Cards       Direct Charging`, type: 4 },
    { name: 'Gaming Cards', type: 1 },
    { name: 'Pay bills', type: 2 },
    { name: 'Stores and chanels', type: 3 },
    { name: 'Electronic wallets', type: 5 },
  ]
  // const bleManager = new BleManager();

  return (
    <>
      <Header exit leftIcon={Exit} />
      <ImageBackground resizeMode='repeat' style={[General.flex, Layout.flexCenter]} source={Background}>
        <Balance />
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
          <View style={styles.stepIndicator}>
          </View>


        </View>

        <AnimatedFlatList
          contentContainerStyle={{ width: SCREEN_WIDTH }}
          animationType={AnimationType.SlideFromRight}
          animationDuration={1000}
          focused={true}
          numColumns={2}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <CardType
                item={item}
                index={index}

              />
            );
          }}
        />
      </ImageBackground>
    </>
  );
};

export default FirstScreen;




const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_WIDTH / 2.5,
    resizeMode: 'contain',
    marginTop: '5%'
  },
  stepIndicator: {
    paddingTop: '3%',
    width: SCREEN_WIDTH
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.PURPLE,
  },



});