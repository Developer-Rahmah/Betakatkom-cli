import React, { useCallback, useEffect } from 'react';
import Header from 'Cards/src/components/Header';
import { ContainerView } from 'Cards/src/screens/mandoub/MandoubScreenStyled';
import { ScrollView, StyleSheet, View, Switch, I18nManager, TouchableOpacity, Image, Linking } from 'react-native';
import { useState } from 'react';
import { Colors } from 'Cards/assets/styles/Colors';
import LocalStorage from 'Cards/src/services/helper/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
// import * as Updates from 'expo-updates';
import { setAuthTokenAction, setLanguageAction } from 'Cards/src/services/redux/actions';
import Title from 'Cards/src/components/Title';
import IconImage from 'Cards/src/components/IconImage';
import Exit from 'Cards/assets/icons/exit.png';
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import { useTranslation } from 'Cards/src/services/hooks';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Businessman from 'Cards/assets/images/avatar.png'
import Whatsapp from 'Cards/assets/icons/whatsapp.png'
import Arrow from 'Cards/assets/icons/arrow.png'
import ContactUs from 'Cards/assets/images/contact-us6.png'
import QRCode from 'react-native-qrcode-svg'
import ReceiveAmount from 'Cards/assets/images/receive-amount.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import Icon from 'Cards/assets/images/full-size-logo.png';
import { useToast } from 'native-base';
import { Client } from 'Cards/src/services/config/clients';
import { GET } from 'Cards/src/services/config/api';


export default function MandoubScreen() {
  const [lang, setLang] = useState('');
  const [mandoubInfo, setmandoubInfo] = useState({})
  const [data, setData] = useState([])
  const getLang = async () => {
    const language = await LocalStorage.get('lang');

    setLang(language);
    setIsEN(language === 'ar');
    // return language;
  };
  interface RootState {
    authToken: string;
    user: any;
  }

  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const UId = (state: RootState) => state.authToken;
  const userId = useSelector(UId);
  const getUserInfo = async () => {
    // const userId = await LocalStorage.get('userId');
    console.log('userId userId', userId);
  }
  useEffect(() => {
    // getUserInfo()

    getLang();

  }, []);
  console.log('useeeeer', userInfo);
  const toast = useToast()
  const navigation = useNavigation();
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [isEN, setIsEN] = useState(lang === 'en');
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState()
  const t = useTranslation()
  const toggleSwitchNotification = () =>
    setIsNotificationsOn((previousState) => !previousState);
  const toggleSwitchLang = async () => {
    setIsEN((previousState) => !previousState);

    dispatch(setLanguageAction(lang === 'ar' ? 'en' : 'ar'));
    LocalStorage.set('lang', lang === 'ar' ? 'en' : 'ar');
    I18nManager.forceRTL(lang === 'en');
    // Updates.reloadAsync();
  };

  const logout = () => {
    setShowAlert(true);

  }
  const setTokenNull = () => {
    dispatch(setAuthTokenAction(null));
    LocalStorage.set('authToken', null);
  }
  const styles = StyleSheet.create({
    marginEnd: {
      marginEnd: 3,
    },
  });
  console.log("useeer iddd", userId)
  const getData = () => {
    Client.get(
      GET.SELLERS, {
      headers: {
        "Authorization": 'Bearer U2FsdGVkX19L/TXxBCYW+LjgfgVj2h7OMFhbJGkln1DWPRw6cVHRpn5yaK+X1io95q5l+6DsCAGOJlvVyIS5Basg9o5YLTFPEjevjXLL6txm3RKB8FCcMLHt0th9fmvEg3bAVcqyP2JlHHS6BONauz5tXchnBgcUwuB/p6nyTayKUh90pLjhcVf3lvjwvF7/OhRa+CiAD5zFhIRUuSWvZxl/nrXAiD/ozNI3VlGMz6SWlIteEOiUxDDy/3s1NN9wffyfHnScNtlnX6exY8+N9HnV0if0kksDTnRVtyRAYnwhDjx1ZKDWqMDVHjR2IuHLvRzBAntaEIPLUFC+ohVGtJXRxSfocMhV5T1THB7pRqJO3KOEfkPZ+6pW1PVUlgzbevHRd+7Qq0iYJDN3bAw8FArB2wI7XWh6AZuoUcvN9koBAPNn2YkgfkJ3I8d7Y2LH5lwZXvznOJ6bjQgGqYs/3mTefvmzveBzirFNbhqdjJiFtndO8OvF3zBPOPqU2dUtBtcWJUneBkYWouFAhtijWRS5OIk3QHKKsO2dAy3hhS8mcnAZfxoF14KzhIxgDkH1SqGBf7q8Z2Rk/7jC9mFsQtynbAZtlXe/XHeuRp96A4Y=',

      }
    },

    )
      .then((res) => {
        // if (res.status == 200) {
        console.log("data", res.data)
        setData(res.data.data)
        var result = res.data.data.filter(item => item.id === userInfo.createdBy);
        console.log("filter", result)
        setmandoubInfo(result[0]);
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
  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  );
  console.log("mandoubInfomandoubInfomandoubInfo", mandoubInfo)
  return (
    <>
      <Header exit leftIcon={Exit} />

      <ScrollView style={{ backgroundColor: 'white' }}>

        <ContainerView >
          <Image source={ContactUs} style={{ width: '80%', height: SCREEN_HEIGHT / 4, marginTop: -5 }} resizeMode='cover' />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 1,
              marginTop: -20,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',

            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60%'
              }} >
              <IconImage
                style={{ width: 40, height: 40 }} source={Businessman} />
              <View style={{ width: 1, height: '150%', backgroundColor: Colors.LIGHT_PURPLE, marginStart: 13 }} />

            </View>

            <View style={{ marginEnd: (SCREEN_HEIGHT / 30) + 10, alignItems: 'flex-start', width: '63%' }}>
              <Title title='Store Name' style={{}} />
              <Title title={mandoubInfo?.phone || ''} color={Colors.LIGHT_GRAY3} />

            </View>


          </View>


          <View
            onPress={() => Linking.openURL(`tel:${':+962792898145'}`)}
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              marginVertical: 20,
              paddingHorizontal: 20,
              alignItems: 'center',
              paddingVertical: 1,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',

            }}>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60%',
              }} >
              <IconImage
                style={{ width: 40, height: 40 }} source={ReceiveAmount} />
              <View style={{ width: 1, height: '150%', backgroundColor: Colors.LIGHT_PURPLE, marginStart: 13 }} />
            </View>
            <View style={{ marginEnd: (SCREEN_HEIGHT / 30) + 10, alignItems: 'flex-start', width: '63%' }}>
              <Title title='Total receivables' style={{}} />
              <View style={{ flexDirection: 'row', }}>
                <Title title={userInfo?.Wallet?.dept && userInfo?.Wallet?.dept + '   '} color={Colors.RED} />
                <Title title='JOD' color={Colors.RED} />
              </View>


            </View>

          </View>





          <TouchableOpacity
            onPress={() => Linking.openURL(
              'whatsapp://send?text=' +
              'enter your message' +
              `&phone=${'962' + mandoubInfo?.username}`,
            )}
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 20,
              alignItems: 'center',
              paddingVertical: 1,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',

            }}>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60%',
              }} >
              <IconImage
                style={{ width: 40, height: 40 }} source={Whatsapp} />
              <View style={{ width: 1, height: '150%', backgroundColor: Colors.LIGHT_PURPLE, marginStart: 13 }} />
            </View>
            <View style={{ marginEnd: 10, alignItems: 'flex-start', width: '63%' }}>
              <Title title='WhatsApp' style={{}} />
              <Title title={mandoubInfo?.username} color={Colors.LIGHT_GRAY3} />

            </View>
            <IconImage
              color={Colors.LIGHT_GRAY}
              transform
              verySmall source={Arrow} />
          </TouchableOpacity>
          <View style={{ paddingVertical: 20 }}>
            <QRCode

              value={userId + ""}
              color={Colors.BLACK}
              backgroundColor={'white'}
              size={SCREEN_WIDTH / 2.3}
              // logo={Icon} // or logo={{ uri: base64logo }}
              logoMargin={2}
              // logoSize={SCREEN_WIDTH/7}
              logoBorderRadius={10}
              logoBackgroundColor={'transparent'}
            />

          </View>


        </ContainerView>
      </ScrollView>
    </>
  );
}
