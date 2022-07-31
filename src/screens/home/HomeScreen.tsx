import Background from 'Cards/assets/images/background.jpeg';
import { Colors } from 'Cards/assets/styles/Colors';
import General from 'Cards/assets/styles/General';
import Balance from 'Cards/src/components/Balance';
import Header from 'Cards/src/components/Header';
import Card from 'Cards/src/screens/home/components/Card';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';
import { useToast } from 'native-base';
import { useSelector } from 'react-redux';
import { Client } from 'Cards/src/services/config/clients';
import { GET } from 'Cards/src/services/config/api';
import { useRoute } from '@react-navigation/native';


// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const useLazyRef = <T extends object>(initializer: () => T) => {
  const ref = useRef<T>();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};
const MARGIN = 16;



const HomeScreen = () => {
  const route = useRoute() as any;

  const [showPng, setShowPng] = useState(false)
  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = useLazyRef(() =>
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y },
          },
        },
      ],
      { useNativeDriver: true }
    )
  );
  useEffect(() => {
    setTimeout(() => { setShowPng(true) }, 2000)

  }, [])
  const toast = useToast()
  interface RootState {
    authToken: string;
  }
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const [allData, setAllData] = useState([])
  const getData = () => {
    Client.get(
      GET.CARD_TYPE, {
      headers: {
        "Authorization": useToken,

      }
    },

    )
      .then((res) => {
        // if (res.status == 200) {
        console.log("data", res.data)
        setAllData([...allData, res.data.data[0], res.data.data[1], res.data.data[2], res.data.data[3]]);

        // setAllData(res.data.data)
        // }
      })
      .catch((error) => {
        toast.show({
          title: "error",
          status: "error",
          description: error.message,
          width: SCREEN_WIDTH,
        })
      });
  }
  useEffect(() => {
    getData()

  }, [])
  return (
    <>
      <Header />
      <ImageBackground resizeMode='repeat' style={General.flex} source={Background}>
        <Balance />
        <AnimatedFlatList
          contentContainerStyle={{ width: SCREEN_WIDTH, alignItems: 'center', justifyContent: 'center' }}
          animationType={AnimationType.SlideFromRight}
          animationDuration={1000}
          focused={true}
          numColumns={route.params.data ? 2 : 1}
          data={route.params.data ? route.params.data : allData}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <Card type={index} data={item} index={index} isGrid={route.params.data} id={route.params.id} />

              </View>
            );
          }}
        />
      </ImageBackground>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  balanceCard: {
    width: '50%', backgroundColor: Colors.mainColor, borderRadius: 10, height: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: {
      width: 1,
      height: 2,

    },
    top: -50,
    position: 'absolute',
    shadowOpacity: .25,
    flexDirection: 'row',
    shadowRadius: .84,
    shadowColor: Colors.BLACK,
    elevation: 20

  },
  walletImg: {
    flex: .3, marginTop: '-3%', resizeMode: 'contain', marginEnd: 10, tintColor: Colors.WHITE
  },
  balanceTxt: {
    fontWeight: 'bold', fontSize: SCREEN_HEIGHT / 30
  },
  gifImg: {
    flex: .3, resizeMode: 'contain'
  }

})

