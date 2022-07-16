import Icon from 'Cards/assets/images/gold-logo.png';
import { Colors } from 'Cards/assets/styles/Colors';
import General from 'Cards/assets/styles/General';
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import Button from 'Cards/src/components/Button';
import ErrorMsg from 'Cards/src/components/ErrorMsg';
import IconImage from 'Cards/src/components/IconImage';
import Input from 'Cards/src/components/Input';
import Title from 'Cards/src/components/Title';
import { GET, POST, PUT } from 'Cards/src/services/config/api';
import { Client } from 'Cards/src/services/config/clients';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import LocalStorage from 'Cards/src/services/helper/LocalStorage';
import { validateEmail } from 'Cards/src/services/helper/validation';
import { setAuthTokenAction, setBalanceAction, setUserAction, setUserIdAction } from 'Cards/src/services/redux/actions';
import { useToast } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Dimensions, I18nManager, ImageBackground, Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, StatusBar, StyleSheet, Switch, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
// import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
import Toggle from 'react-native-toggle-element';
import { setLanguageAction } from 'Cards/src/services/redux/actions';
// import * as Updates from 'expo-updates';
import { marginRight, right } from 'styled-system';
import Whatsapp from 'Cards/assets/icons/whatsapp.png'
import Call from 'Cards/assets/icons/telephone.png'
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function LoginScreen() {
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
  const [inputValue, setInputValue] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [isEN, setIsEN] = useState(lang === 'en');
  const toast = useToast()
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const getUserInfo = (authToken) => {
    Client.get(
      GET.USER,
      {
        headers: {
          "Authorization": authToken,

        }
      }

    )
      .then((res) => {
        if (res.status == 200) {
          console.log("data", res.data.data)
          LocalStorage.set('user', res.data.data);
          dispatch(setBalanceAction(res.data.data.Wallet.balance));
          dispatch(setUserAction(res.data.data));
          dispatch(setAuthTokenAction(authToken));
          LocalStorage.set('authToken', authToken);
        }
      })
      .catch((error) => {
        toast.show({
          title: "error",
          status: "error",
          description: error.message,
          width: SCREEN_WIDTH,
        })
        setDisableBtn(false);
      });
  }
  const onSubmit = (data: any) => {
    setDisableBtn(true);
    console.log("data", data);
    // if (expoPushToken.length > 0) {
    Client.post(
      POST.LOGIN,
      {
        data: {
          "username": data.ID,
          "password": data.password
        }
      }

    )
      .then((res) => {
        if (res.status == 200) {
          console.log("data", res.data.data.token)
          getUserInfo(res.data.data.token)
          //  dispatch(setUserIdAction(data.ID));
          // LocalStorage.set('userId', data.ID );

          setDisableBtn(false);
          Client.put(
            PUT.SAVE_DEVICEE_TOKEN,

            {
              data: {
                "token": expoPushToken

              }

            },
            {
              headers: {
                "Authorization": res.data.data.token,

              },
            }


          )
            .then((response) => {
              if (response.status == 200) {
                console.log("data", response.data.data)
                getUserInfo(res.data.data.token)
                //  dispatch(setUserIdAction(data.ID));
                // LocalStorage.set('userId', data.ID );

                setDisableBtn(false);
              }
            })
            .catch((error) => {
              toast.show({
                title: "error",
                status: "error",
                description: error.message,
                width: SCREEN_WIDTH,
              })
              setDisableBtn(false);
            });
        }
      })
      .catch((error) => {
        toast.show({
          title: "error",
          status: "error",
          description: error.message,
          width: SCREEN_WIDTH,
        })
        setDisableBtn(false);
      });
    //}
    // dispatch(setUserIdAction(data.ID));
    // LocalStorage.set('userId', data.ID );
    // dispatch(setAuthTokenAction('ffff'));
    // LocalStorage.set('authToken', 'fffff');
  };

  useEffect(() => {
  }, [inputValue])

  // const registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // };

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token),

  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response, "response");
  //     });


  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  const toggleSwitchLang = async () => {
    setIsEN((previousState) => !previousState);

    dispatch(setLanguageAction(lang === 'ar' ? 'en' : 'ar'));
    LocalStorage.set('lang', lang === 'ar' ? 'en' : 'ar');
    I18nManager.forceRTL(lang === 'en');
    Updates.reloadAsync();
  };
  console.log("expoPushTokenexpoPushTokenexpoPushToken", expoPushToken)
  return (

    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={General.flex}>

        <View style={styles.container}>

          <StatusBar barStyle="light-content" />
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.header}>

              <ImageBackground
                source={require("../../../assets/images/header.png")}
                style={styles.imageBackground}
              >


                <IconImage source={Icon} style={[{ marginVertical: 5, width: '100%', height: '50%' }]} />
                <Title title='يتبع لمركز دوار الشهيد - سحاب' color={Colors.WHITE} style={{ display: 'none' }} />

              </ImageBackground>

            </TouchableWithoutFeedback >
            <ScrollView style={{ flex: 1, }}>

              <View style={styles.footer}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
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
                <Controller

                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      isPassword={false}
                      maxLength={10}
                      keyboardType="number-pad"
                      placeholder='Phone number'
                      onChangeText={(value: string) => { onChange(value), setInputValue(parseInt(value)) }}
                      // onChangeText={(value: string) => { onChange(value) }}
                      value={value}
                    />
                  )}
                  name="ID"
                  rules={{
                    required: true,
                    minLength: {
                      value: 10,
                      message: "min length is 10"
                    },

                    maxLength: {
                      value: 10,
                      message: "max length is 10"
                    }
                  }}
                />
                {(errors.ID || isNaN(inputValue)) && <ErrorMsg errorMsg="Invalid ID." />}
                {/* {errors.ID && <ErrorMsg errorMsg="Invalid ID." />} */}

                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      isPassword
                      placeholder={'Password'}
                      onChangeText={(value: string) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="password"
                  rules={{ required: true }}
                />
                {errors.password && <ErrorMsg errorMsg="This is required." />}

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    backgroundColor={Colors.PURPLE}
                    locked={!isValid || disableBtn}
                    onClick={handleSubmit(onSubmit)}
                    title="Login"
                    txtColor={Colors.WHITE}
                  />



                </View>
                <Title numberOfLines={0} title={`Contact us`} style={{ marginBottom: 5 }} />

                <View style={{ paddingBottom: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${':+962792898145'}`)}>

                    <IconImage
                      style={{ width: 40, height: 40, marginEnd: 20 }} source={Call} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(
                      'whatsapp://send?text=' +
                      'enter your message' +
                      `&phone=962792898145`,
                    )}
                  >
                    <IconImage
                      style={{ width: 40, height: 40, marginStart: 20 }} source={Whatsapp} />
                  </TouchableOpacity>
                </View>


              </View>
            </ScrollView>

          </View>

        </View>

      </KeyboardAvoidingView>

      <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>

        <Title numberOfLines={0} title={`All Copyright reserved for `} />
        <Title numberOfLines={0} title={`Betakatom.com ${new Date().getFullYear()}`} />

      </View>

    </View>

  );
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    padding: 40,
    paddingTop: 0,

  },
  imageBackground: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '80%'
  },
  paddingBottom: {
    paddingBottom: 30, paddingHorizontal: 10
  },
  firstTxt: {
    marginBottom: 5,
    fontSize: SCREEN_HEIGHT / 40,

  }

});

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }