import React, { useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import { GridCardContainer, GridView } from './ComponentStyled';
import { useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../services/helper/Constant';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTranslation } from '../services/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'native-base';
import { setBalanceAction, setUserAction } from '../services/redux/actions';
import { Gaming } from 'Cards/assets/images/gaming-sec-image.jpeg';
import { Client } from '../services/config/clients';
import { GET, POST } from '../services/config/api';
import LocalStorage from '../services/helper/LocalStorage';

const GamingGridCard = ({
  item,
  index,
  title,
  secTitle,
  type,
  parentID,
  parentIndex,
  disabled = false,
  groupID
}: {
  item: any;
  index?: number;
  title?: string;
  secTitle?: string;
  disabled: boolean;
  type: number;
  parentID: any
  parentIndex?: number;
  groupID?: number
}) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    padding: { padding: 10 },
    marginVertical: {
      marginVertical: 10,
    },
    whiteBox: {
      width: '100%', backgroundColor: 'white', height: 30, marginBottom: 5,
    }
  });
  const anim = useRef(new Animated.Value(1));
  const [startValue] = useState(new Animated.Value(0));
  const [endValue] = useState(SCREEN_WIDTH + SCREEN_WIDTH);
  const [duration] = useState(2000);
  const toast = useToast()
  const [showAlert, setShowAlert] = useState(false)
  const [current, setCurrentUser] = useState({})
  const [disableBtn, setDisableBtn] = useState(true)


  const t = useTranslation()
  const dispatch = useDispatch();
  interface RootState {
    balance: string;
    user: any;
    authToken: string;

  }


  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);

  console.log("parentID", parentID)
  const balance = (state: RootState) => state.balance;
  const userBalance = useSelector(balance);
  // useEffect(() => {

  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(anim.current, {
  //         toValue: 1.5,
  //         duration: 1000,
  //         useNativeDriver: true
  //       }),
  //       Animated.timing(anim.current, {
  //         toValue: 1,
  //         duration: 1000,
  //         useNativeDriver: true
  //       })
  //     ])
  //   ).start();
  //   Animated.loop(
  //     Animated.timing(startValue, {
  //       toValue: endValue,
  //       duration: duration,
  //       useNativeDriver: false
  //       // easing: Easing.linear
  //     })
  //   ).start();
  // }, [])

  const onCancelPressed = () => {
    setDisableBtn(true);
    Client.post(
      POST.PURCHASE, {
      "data": {
        "type": item.id

      }
    }, {
      headers: {
        "Authorization": useToken,

      }
    },

    )
      .then((res) => {
        console.log("reeeeseeeeeses", res)
        // if (res.status == 200) {
        console.log("data", res.data)
        setDisableBtn(false);
        getUserInfo(res.data.data.serialNumber, res.data.data.code)
      })
      .catch((error) => {
        setDisableBtn(false);
        toast.show({
          title: "خطأ",
          status: "error",
          description: error.response.data.data.error == 'No Enough Ballance In Wallet!' ? 'لا يوجد لديك رصيد كافي لاتمام هذه العملية ' : error.response.data.data.error == 'Only Leaf Card Types Allowed' ? ' نفذت الكمية من هذه الفئه' : error.response.data.data.error,
          width: SCREEN_WIDTH,
        })
      });
  }
  const getUserInfo = (serialNumber, code) => {
    Client.get(
      GET.SELLING_POINTS,
      {
        headers: {
          "Authorization": 'Bearer U2FsdGVkX19L/TXxBCYW+LjgfgVj2h7OMFhbJGkln1DWPRw6cVHRpn5yaK+X1io95q5l+6DsCAGOJlvVyIS5Basg9o5YLTFPEjevjXLL6txm3RKB8FCcMLHt0th9fmvEg3bAVcqyP2JlHHS6BONauz5tXchnBgcUwuB/p6nyTayKUh90pLjhcVf3lvjwvF7/OhRa+CiAD5zFhIRUuSWvZxl/nrXAiD/ozNI3VlGMz6SWlIteEOiUxDDy/3s1NN9wffyfHnScNtlnX6exY8+N9HnV0if0kksDTnRVtyRAYnwhDjx1ZKDWqMDVHjR2IuHLvRzBAntaEIPLUFC+ohVGtJXRxSfocMhV5T1THB7pRqJO3KOEfkPZ+6pW1PVUlgzbevHRd+7Qq0iYJDN3bAw8FArB2wI7XWh6AZuoUcvN9koBAPNn2YkgfkJ3I8d7Y2LH5lwZXvznOJ6bjQgGqYs/3mTefvmzveBzirFNbhqdjJiFtndO8OvF3zBPOPqU2dUtBtcWJUneBkYWouFAhtijWRS5OIk3QHKKsO2dAy3hhS8mcnAZfxoF14KzhIxgDkH1SqGBf7q8Z2Rk/7jC9mFsQtynbAZtlXe/XHeuRp96A4Y=',


        }
      }

    )
      .then((res) => {
        var result = res.data.data.filter(item => item.id === userInfo.id);
        setCurrentUser(result[0]);
        console.log("result[0]vvvvvvv", result[0])
        dispatch(setBalanceAction(result[0].Wallet.balance));
        dispatch(setUserAction(result[0]));
        LocalStorage.set('user', result[0]);
        setShowAlert(false);
        navigation.navigate('DetailsScreen', { groupID: groupID, type: type, price: userInfo.class === 'A' ? item.priceA : userInfo.class === 'B' ? item.priceB : item.priceC, title: title, secTitle: secTitle, isPrinting: true, cat: I18nManager.isRTL ? item.nameArabic : item.nameEnglish, serialNumber: serialNumber, code: code, isGaming: true, id: item.id });
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
  const onConfirmPressed = () => {
    setShowAlert(false);
    if (userBalance >= item.name) {
      dispatch(setBalanceAction(parseFloat(userBalance) - parseFloat(item.name)));
      toast.show({
        title: t("Success"),
        status: "success",
        description: t("Card has been purchased"),
        width: SCREEN_WIDTH,
      })
      navigation.navigate('DetailsScreen', { type: type, name: item.name, title: title, secTitle: secTitle, isPrinting: false });

    } else {
      toast.show({
        title: t("Error"),
        status: "error",
        width: SCREEN_WIDTH,
        description: t("Your balance is not enough"),

      })
    }
  }
  console.log("itemitem", item)
  return (
    <TouchableOpacity onPress={() => setShowAlert(true)}>
      <GridCardContainer style={[General.shadow, { backgroundColor: type == 0 ? Colors.BLACK : type == 1 ? Colors.ORANGE_COLOR : type == 2 ? Colors.UMNIAH_COLOR : Colors.LIGHT_PURPLE }]} >
        <GridView imageStyle={{ borderRadius: 15, resizeMode: 'contain' }} source={{ uri: item.image }} >
          <Animated.View style={{ transform: [{ scale: anim.current }] }}>
            <View style={{ width: SCREEN_WIDTH / 3, height: '90%', backgroundColor: Colors.BLACK, opacity: .7, marginTop: 0, justifyContent: 'center' }}>
              <Title numberOfLines={0} style={{ fontSize: 25, marginTop: 0 }} title={I18nManager.isRTL ? item.nameArabic : item.nameEnglish} color={Colors.GOLD} />
              {/* <Title style={{ fontSize: SCREEN_HEIGHT / 50, marginTop: -13 }} title={parentIndex === 0 ? '$' : parentIndex === 1 ? 'UC' : 'Diamonds'} color={Colors.GOLD} /> */}
              <View style={styles.whiteBox}>
                <Title numberOfLines={0} style={{ fontSize: SCREEN_HEIGHT / 40, marginTop: -2 }} title={parseFloat(userInfo.class === 'A' ? item.priceA : userInfo.class === 'B' ? item.priceB : item.priceC) + ''} />
              </View>
            </View>

          </Animated.View>

        </GridView>

        <AwesomeAlert
          show={showAlert == true ? true : false}
          showProgress={false}
          title={t("please choose charging method")}
          message={`${t('Cost: ')}${parseFloat(userInfo.class === 'A' ? item.priceA : userInfo.class === 'B' ? item.priceB : item.priceC)}`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText={t("Purchase")}
          confirmText={t("Balance transfer")}
          titleStyle={{ fontFamily: 'Cairo-Regular' }}
          messageStyle={{ fontFamily: 'Cairo-Regular' }}
          cancelButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
          confirmButtonStyle={{ disabled: true, opacity: 0.5 }}
          confirmButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
          cancelButtonColor={Colors.PURPLE}
          cancelButtonStyle={{ width: 90, justifyContent: 'center', alignItems: 'center' }}
          confirmButtonColor={Colors.PURPLE}
          onDismiss={() => setShowAlert(false)}
          onCancelPressed={() => {
            onCancelPressed()
          }}
        // onConfirmPressed={() => {
        //   onConfirmPressed()
        // }}
        />
      </GridCardContainer>
    </TouchableOpacity>
  );
};

export default GamingGridCard;
