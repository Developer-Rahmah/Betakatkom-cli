import React, { useEffect } from 'react';
import Header from 'Cards/src/components/Header';
import { ScrollView, I18nManager, View, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import LocalStorage from 'Cards/src/services/helper/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
// import * as Updates from 'expo-updates';
import { setLanguageAction } from 'Cards/src/services/redux/actions';
import { useTranslation } from 'Cards/src/services/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import Input from 'Cards/src/components/Input';
import ErrorMsg from 'Cards/src/components/ErrorMsg';
import styles from './styles';
import Button from 'Cards/src/components/Button';
import { Colors } from 'Cards/assets/styles/Colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import Bill from 'Cards/assets/images/bill.jpeg'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import General from 'Cards/assets/styles/General';
import { Client } from 'Cards/src/services/config/clients';
import { POST } from 'Cards/src/services/config/api';
import axios from 'axios';


export default function PaymentOfBillsDetailsScreen() {
  const [lang, setLang] = useState('');
  const [mandoubInfo, setmandoubInfo] = useState({})
  const [disableBtn, setDisableBtn] = useState(false);
  const [amountInput, setAmountInput] = useState<any>(0);
  const [done, setDone] = useState<boolean>(false);
  let total = Math.ceil((amountInput / 100)) * 0.25
  const [data, setData] = useState<any>()
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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const UId = (state: RootState) => state.authToken;
  const userId = useSelector(UId);
  const route = useRoute() as any;

  const getUserInfo = async () => {
    // const userId = await LocalStorage.get('userId');
    console.log('userId userId', userId);
  }
  useEffect(() => {
    // getUserInfo()

    // getLang();

  }, []);
  console.log('route', route);
  const toast = useToast()
  const navigation = useNavigation();
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [isEN, setIsEN] = useState(lang === 'en');
  const [failer, setFailer] = useState(false);
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
  const onConfirm = () => {
    setShowAlert(false)


    Client.post(
      POST.BILL,
      {
        data: {
          "amount": amountInput,
        }
      },
      {
        headers: {
          "Authorization": useToken,

        },
      }

    )
      .then((res) => {
        if (res.status == 200) {
          setDone(!done);

          if (done) {
            setFailer(false)
            navigation.navigate('FirstScreen');
          }
        } else {
          setDone(false)
          setFailer(true)
          setShowAlert(false)
        }
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


  const onSubmit = (data: any) => {
    setData(data)
    setDisableBtn(true);
    setShowAlert(true);
    console.log("data", data)
  };
  const sendSMS = async () => {
    console.log("dddata", data)
    axios.get(`http://josmsservice.com/sms/api/SendBulkMessages.cfm?numbers=962792898145&senderid=BETAKATKOM&AccName=betakatkom&AccPass=6R9H@7Hb87aG45Wws&requesttimeout=5000000&msg=${route.params.title}
    ${route.params.name}
    رقم الهاتف المفوتر: ${data.phoneNumber + ''}
    الرقم المرجعي: ${data.referenceNumber + ''}
    المبلغ المراد دفعه: ${data.amount + ''}`)
      .then((res) => {
        console.log("resresres", res)
        toast.show({
          title: "success",
          status: "success",
          description: "تم ارسال طلبك بنجاح",
          width: SCREEN_WIDTH,
        })
        navigation.navigate('FirstScreen')
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
  return (
    <>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={General.flex}>
        <ScrollView style={{ backgroundColor: 'white', }}>

          <View style={styles.container}>
            <Image source={Bill} style={{ width: '100%', height: SCREEN_HEIGHT / 3, }} resizeMode='contain' />

            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder={'Reference number / subscription number'}
                  onChangeText={(value: string) => onChange(value)}
                  value={value}
                />
              )}
              name="referenceNumber"
              rules={{ required: true }}
            />
            {errors.password && <ErrorMsg errorMsg="This is required." />}
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  keyboardType='numeric'
                  placeholder={'Postpaid phone number'}
                  onChangeText={(value: string) => onChange(value)}
                  value={value}
                />
              )}
              name="phoneNumber"
              rules={{ required: true }}
            />
            {errors.phoneNumber && <ErrorMsg errorMsg="This is required." />}
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  keyboardType='numeric'
                  placeholder={'Amount to be paid'}
                  onChangeText={(value: string) => { onChange(value), setAmountInput(parseFloat(value)) }}
                  value={value}
                />
              )}
              name="amount"
              rules={{ required: true }}
            />
            {errors.amount && <ErrorMsg errorMsg="This is required." />}

          </View>

          <View style={styles.btnContainer}>
            <Button
              backgroundColor={Colors.PURPLE}
              locked={!isValid}
              onClick={handleSubmit(onSubmit)}
              title="Pay"
              txtColor={Colors.WHITE}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <AwesomeAlert
        show={showAlert || done}
        showProgress={false}
        title={done ? t('The operation was completed successfully') : t("Payment confirmation")}
        message={done ? t("the process will take 1-5 minutes") : `${t('Amount') + ': ' + amountInput + ' + ' + total + '\n'}${t("Total amount")} : ${amountInput + total}`}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={done ? false : true}
        showConfirmButton={true}
        cancelText={t("cancel")}
        confirmText={t('Done')}
        titleStyle={{ fontFamily: 'Csairo-Regular' }}
        messageStyle={{ fontFamily: 'Cairo-Regular' }}
        cancelButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
        confirmButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
        cancelButtonColor={Colors.PURPLE}
        confirmButtonColor={Colors.PURPLE}
        onDismiss={() => setShowAlert(false)}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() =>
          !done ?
            onConfirm() : failer ? null : sendSMS()
          // setTokenNull()
        }
      />
    </>
  );
}
