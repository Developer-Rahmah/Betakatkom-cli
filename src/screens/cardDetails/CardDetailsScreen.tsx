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
import GridCard from 'Cards/src/components/GridCard';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';
import { ScrollView } from 'react-native-gesture-handler';
import GamingGridCard from 'Cards/src/components/GamingGridCard';


const CardDetailsScreen = () => {
  const route = useRoute() as any;

  return (
    <>
      <Header />

      <ImageBackground resizeMode='repeat' style={[General.flex, Layout.flexCenter]} source={Background}>
        <Balance />
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
          <View style={styles.stepIndicator}>
            <Step currentPage={2} labels={[`${route.params.title}`, , `${route.params.name}`, '', '']} />
          </View>


        </View>
        <ScrollView>
          <AnimatedFlatList
            contentContainerStyle={{ width: SCREEN_WIDTH, flex: 1, alignItems: 'center' }}
            animationType={AnimationType.SlideFromBottom}
            animationDuration={1000}
            focused={true}
            numColumns={2}
            data={route.params.subData}
            renderItem={({ item, index }) => {
              return (
                <>
                  {route.params.notChargeCard ?
                    <GamingGridCard
                      parentIndex={route.params.parentIndex}
                      type={route.params.type}
                      item={item}
                      index={index}
                      title={route.params.title}
                      secTitle={route.params.name}
                      parentID={route.params.parentID}
                      groupID={route.params.groupID}

                    />
                    :
                    <GridCard
                      type={route.params.type}
                      item={item}
                      index={index}
                      title={route.params.title}
                      secTitle={route.params.name}
                      name={route.params.name}
                      groupID={route.params.groupID}

                    />
                  }
                </>
              );
            }}
          />
        </ScrollView>

      </ImageBackground>
    </>
  );
};

export default CardDetailsScreen;




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
    color: Colors.mainColor,
  },



});