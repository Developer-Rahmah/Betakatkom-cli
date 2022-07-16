import { useRoute } from '@react-navigation/native';
import Background from 'Cards/assets/images/background.jpeg';
import General from 'Cards/assets/styles/General';
import Layout from 'Cards/assets/styles/Layout';
import Balance from 'Cards/src/components/Balance';
import Header from 'Cards/src/components/Header';
import Rows from 'Cards/src/components/Rows';
import { SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import ColumnCard from 'Cards/src/components/ColumnCard';
import Step from 'Cards/src/components/Step';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';
import GamingColumnCard from 'Cards/src/components/GamingColumnCard';


const CardListingScreen = () => {
  const route = useRoute() as any;
  console.log("rooouroute.params.items.notChargeCardte", route.params.id)
  return (
    <>
      <Header />

      <ImageBackground resizeMode='repeat' style={[General.flex, Layout.flexCenter]} source={Background}>
        <Balance />
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
          <View style={styles.stepIndicator}>
            <Step currentPage={1} labels={[`${route.params.title}`, '', '', '']} />
          </View>


        </View>

        <AnimatedFlatList
          contentContainerStyle={{ width: SCREEN_WIDTH, }}
          animationType={AnimationType.SlideFromRight}
          animationDuration={1000}
          focused={true}
          numColumns={route.params.notChargeCard || route.params.id === 234 ? 2 : 1}
          data={route.params.items}
          renderItem={({ item, index }) => {
            return (
              <>
                {route.params.notChargeCard ?
                  <GamingColumnCard
                    notChargeCard={route.params.notChargeCard}
                    type={route.params.type}
                    item={item}
                    index={index}
                    title={route.params.title}
                    groupID={route.params.id}
                  />

                  :

                  <ColumnCard
                    parentType={route.params.parentType}
                    id={route.params.id}
                    notChargeCard={route.params.notChargeCard}
                    type={route.params.type}
                    item={item}
                    index={index}
                    title={route.params.title}
                    groupID={route.params.groupID}

                  />
                }
              </>
            );
          }}
        />
      </ImageBackground>
    </>
  );
};

export default CardListingScreen;




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