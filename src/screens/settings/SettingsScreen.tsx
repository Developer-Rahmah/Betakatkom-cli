import React, { useCallback, useEffect } from 'react';
import Header from 'Cards/src/components/Header';
import { ContainerView } from 'Cards/src/screens/settings/SettingsScreenStyled';
import { ScrollView, StyleSheet, View, Switch, I18nManager, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { Colors } from 'Cards/assets/styles/Colors';
import LocalStorage from 'Cards/src/services/helper/LocalStorage';
import { useDispatch } from 'react-redux';
// import * as Updates from 'expo-updates';
import { setAuthTokenAction, setLanguageAction } from 'Cards/src/services/redux/actions';
import Title from 'Cards/src/components/Title';
import IconImage from 'Cards/src/components/IconImage';
import Exit from 'Cards/assets/icons/exit.png';
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import { useTranslation } from 'Cards/src/services/hooks';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import TermsAndConditions from 'Cards/assets/icons/terms-and-conditions2.png'
import Info from 'Cards/assets/icons/info.png'
import Padlock from 'Cards/assets/icons/padlock.png'
// import { printAsync, selectPrinterAsync } from 'expo-print';
import Information from 'Cards/assets/icons/printing.png';

const printerUrl = 'ipp://BRW2C6FC9173DCB.local.:631/ipp/print'


export default function SettingsScreen() {
  const [lang, setLang] = useState('');
  const getLang = async () => {
    const language = await LocalStorage.get('lang');

    setLang(language);
    setIsEN(language === 'ar');
    // return language;
  };
  useEffect(() => {
    getLang();
  }, []);
  console.log('language', lang);
  const navigation = useNavigation();
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [isEN, setIsEN] = useState(lang === 'en');
  const toggleSwitchNotification = () =>
    setIsNotificationsOn((previousState) => !previousState);
  const toggleSwitchLang = async () => {
    setIsEN((!isEN));

    dispatch(setLanguageAction(lang === 'ar' ? 'en' : 'ar'));
    LocalStorage.set('lang', lang === 'ar' ? 'en' : 'ar');
    I18nManager.forceRTL(lang === 'en');
    // Updates.reloadAsync();
  };
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState()
  const t = useTranslation()
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
  //   const printSingle = useCallback(async () => {

  //     try {
  //       await printAsync({
  //         printerUrl: printerUrl, html: `

  // <html lang="en">
  //     <head>
  //         <meta charset="UTF-8">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <style>
  //             * {

  //     font-size: 12px;
  //     font-family: 'Times New Roman';

  // }

  // td,
  // th,
  // tr,
  // table {
  //     border-top: 1px solid black;
  //     border-collapse: collapse;
  //     text-align: center;
  // }
  // table {
  //    width:100%
  // }
  // td.description,
  // th.description {
  //     width: 75px;
  //     max-width: 75px;
  // }

  // td.quantity,
  // th.quantity {
  //     width: 33%;
  //     word-break: break-all;
  // }

  // td.price,
  // th.price {
  //     width: 40px;
  //     max-width: 40px;
  //     word-break: break-all;
  // }

  // .centered {
  //     text-align: center;
  //     align-content: center;
  // }

  // .ticket {
  //     border: solid;
  //     margin: -5px;
  //     padding: 5px;
  // }
  // .card-value{
  //     letter-spacing: 2px;
  //     font-weight: bold;
  //     font-size: 14px;
  //     border: dashed 1px;
  //     margin: 5px;
  //     padding-inline: 5px;
  // }

  // img {
  //     width: 100%;
  //  height: 57px;
  //     margin-bottom: 10px;
  // }
  // .date-time{
  //     display: flex;
  //     justify-content: space-between;
  // }

  // @media print {
  //     .hidden-print,
  //     .hidden-print * {
  //         display: none !important;
  //     }
  // }
  //         </style>
  //     </head>
  //     <body dir="rtl">
  //         <div class="ticket">
  //            <p class="centered">بامكانكم زيارة موقعنا الإلكتروني:
  //                 <br>www.betakatkom.com</p>
  //         </div>
  //     </body>
  // </html>





  // `, width: 595, height: 842
  //       })
  //       console.log('end print...')
  //     } catch (error) {
  //       console.error('error:', error)
  //     }

  //   }, [])
  return (
    <>
      <Header exit leftIcon={Exit} />

      <ScrollView>
        <ContainerView>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              marginVertical: 20,
              padding: 20,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',
            }}>
            <Title title="Language" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Title title="EN" />
              <Switch
                style={{ marginHorizontal: 10 }}
                trackColor={{
                  false: Colors.LIGHT_GRAY,
                  true: Colors.LIGHT_GRAY,
                }}
                thumbColor={Colors.PURPLE}
                ios_backgroundColor={Colors.LIGHT_GRAY}
                onValueChange={toggleSwitchLang}
                value={isEN}
              />
              <Title title="AR" />
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={async () => {
              const printer = Platform.OS == 'android' ? await printSingle() : selectPrinterAsync()
              console.log('printer', printer)
            }}
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              marginVertical: 0,
              padding: 20,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',
            }}>
            <Title title="Test Printer" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconImage
                small source={Information} style={{ tintColor: 'black' }} />

            </View>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePasswordScreen')}
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              marginVertical: 20,
              padding: 20,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',
            }}>
            <Title title="Change Password" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconImage
                small source={Padlock} />

            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AboutUsScreen')}
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              marginVertical: 0,
              padding: 20,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',
            }}>
            <Title title="About Us" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconImage
                small source={Info} />

            </View>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate('ConditionsAndTermsScreen')}
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              marginVertical: 20,
              padding: 20,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',
            }}>
            <Title title="Conditions and terms" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconImage
                small source={TermsAndConditions} />

            </View>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => logout()}
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              marginVertical: 0,
              padding: 20,
              borderColor: Colors.LIGHT_PURPLE,
              justifyContent: 'space-between',
            }}>
            <Title title="Log out" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconImage style={{
                transform: [
                  {
                    rotateY:
                      I18nManager.isRTL
                        ? '180deg'

                        : '0deg',
                  },
                ]
              }} small source={Exit} />

            </View>
          </TouchableOpacity>


          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={t("log out")}
            message={t("Are you sure you want to log out?")}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText={t("cancel")}
            confirmText={t("  Yes  ")}
            titleStyle={{ fontFamily: 'Cairo-Regular' }}
            messageStyle={{ fontFamily: 'Cairo-Regular' }}
            cancelButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
            confirmButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
            cancelButtonColor={Colors.PURPLE}
            confirmButtonColor={Colors.PURPLE}
            onDismiss={() => setShowAlert(false)}
            onCancelPressed={() => {
              setShowAlert(false);
            }}
            onConfirmPressed={() => {
              setTokenNull()
            }}
          />
        </ContainerView>
      </ScrollView>
    </>
  );
}
