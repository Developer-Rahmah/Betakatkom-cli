import { useNavigation, useRoute } from '@react-navigation/native';
import Background from 'Cards/assets/images/background.jpeg';
import General from 'Cards/assets/styles/General';
import Layout from 'Cards/assets/styles/Layout';
import Balance from 'Cards/src/components/Balance';
import Header from 'Cards/src/components/Header';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Clipboard, ImageBackground, Linking, Modal, Platform, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Step from 'Cards/src/components/Step';
import { ScrollView } from 'react-native-gesture-handler';
import Title from 'Cards/src/components/Title';
// import { selectPrinterAsync, printAsync } from 'expo-print'
import Button from 'Cards/src/components/Button';
import { useTranslation } from 'Cards/src/services/hooks';
import { Controller, useForm } from 'react-hook-form';
import Input from 'Cards/src/components/Input';
import { WebView } from 'react-native-webview';
import ErrorMsg from 'Cards/src/components/ErrorMsg';
import IconImage from 'Cards/src/components/IconImage';
import { useToast } from 'native-base';
import { useSelector } from 'react-redux';
import Copying from 'Cards/assets/icons/copying.png'
// import { BleError, BleManager, Device } from 'react-native-ble-plx';
import Close from 'Cards/assets/icons/close.png'
import axios from 'axios';

const printerUrl = 'ipp://BRW2C6FC9173DCB.local.:631/ipp/print'


const DetailsScreen = () => {
  const route = useRoute() as any;
  const [modalVisible, setModalVisible] = useState(false);
  const [showWebView, setSwoWebView] = useState(false);
  const [webViewPreLoader, setWebViewPreLoader] = useState(true);
  const [inputValue, setInputValue] = useState(0);
  const [textInputCode, setTextInputcode] = useState('');

  const toast = useToast()
  interface RootState {
    user: any;
  }
  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {


  }, [modalVisible, inputValue])

  const onSubmit = (data: any) => {
    console.log(data)
    Linking.openURL(`tel:${`:${data.PhoneNumber}`}`)

  };
  const navigation = useNavigation();
  const t = useTranslation()
  const price = t('Price')
  const inputCode = route.params.title === 'ZAIN' ? '114' : route.params.title === 'ORANGE' ? '150' : route.params.title === 'UMNIAH' && route.params.secTitle === 'EVO' ? '127' : '133';
  const cardID = t('Card ID')
  var today = new Date();
  const title = route.params.title
  const nameEnglish = route.params.cat
  const isCard = route.params.isCard
  const secTitle = route.params.secTitle
  const userName = userInfo.phone
  const id = route.params.id
  const groupID = route.params.groupID
  const transactions = route.params.transactions
  console.log("userrrr", userName)
  console.log("route.params", route.params)

  let logo = "https://i.ibb.co/3mN82Zh/logo.png"
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log("params", route.params)
  const cardPrice = route.params.price
  const serialNumber = route.params.serialNumber
  const code = route.params.code
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var chargingMethod = isCard ? "طريقة الشحن" : ""
  var inputCodeDesc = isCard ? `${inputCode}رقم البطاقة المكون من 14 خانة#` : ""

  var dateTime = date + ' ' + time;
  //   const printSingle = useCallback(async () => {

  //     for (let i = 0; i <= transactions.length; i++) {
  //       if (transactions[i] !== undefined)
  //         try {
  //           await printAsync({
  //             printerUrl: printerUrl, html: `

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
  //             <div class="date-time">
  //                 <span>Date:${date}</span>
  //                 <span>Time:${time}</span>
  //             </div>
  //             <p class="centered market-name"><span>${userName}</span>
  //                 <br>
  //                 <br>رقم البطاقة
  //                 <br>
  //                 <span class="card-value">${transactions[i].code}</span></p>
  //             <table>
  //                 <thead>
  //                     <tr>
  //                         <th class="quantity">نوع</th>
  //                         <th class="description">صنف</th>
  //                         <th class="price">فئة</th>
  //                     </tr>
  //                 </thead>
  //                 <tbody>
  //                     <tr>
  //                         <td class="quantity">${title}</td>
  //                         <td class="description">${secTitle}</td>
  //                         <td class="price">${nameEnglish}</td>
  //                     </tr>
  //                     <tr>
  //                 </tbody>
  //             </table>
  //              <p class="centered"> ${chargingMethod}
  //                 <br>${inputCodeDesc}
  //             <p class="centered">
  //                 <br>
  //                 <br>Serial Number
  //                 <br>${transactions[i].serialNumber}</p>
  //             <p class="centered">بامكانكم زيارة موقعنا الإلكتروني:
  //                 <br>www.betakatkom.com</p>
  //         </div>
  //     </body>
  // </html>



  // `, width: 595, height: 842
  //           })
  //           console.log('end print...')
  //         } catch (error) {
  //           console.error('error:', error)
  //         }
  //     }
  //   }, [])
  useEffect(() => {

  }, [])
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `${code + ''}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  const onConfirm = async () => {

    setSwoWebView(false);
    sendSMS()


  }
  const sendSMS = async () => {
    axios.get(`http://josmsservice.com/sms/api/SendBulkMessages.cfm?numbers=962792898145&senderid=BETAKATKOM&AccName=betakatkom&AccPass=6R9H@7Hb87aG45Wws&requesttimeout=5000000&msg=${route.params.title}
    ${route.params.secTitle}
    ${route.params.cat}
    code:${code} 
    ID:${textInputCode}`)

      .then((res) => {
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

      <ImageBackground resizeMode='repeat' style={[General.flex, Layout.flexCenter]} source={Background}>
        <Balance />
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
          <View style={styles.stepIndicator}>
            <Step currentPage={4} labels={[`${route.params.title}`, , `${route.params.secTitle}`, `${route.params.cat}`, `${route.params.isPrinting ? 'Purchase' : 'Balance transfer'}`]} />
          </View>


        </View>
        <ScrollView>
          {/* {showWebView && */}
          {/* <WebView onLoad={() => setWebViewPreLoader(false)} style={{ width: '100%', height: '100%' }} source={{ uri: id == 90 ? 'https://www.midasbuy.com/midasbuy/ot/redeem/pubgm' : 'https://shop2game.com/app/100067/idlogin' }} >
              </WebView> */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={showWebView}
            onRequestClose={() => {
              setSwoWebView(!showWebView);
            }}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView, General.shadow]}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', top: -25 }}>
                  <TouchableOpacity onPress={() => {
                    setSwoWebView(!showWebView);
                  }}>
                    <IconImage
                      small
                      source={Close}
                      style={{ left: -90 }}
                    />
                  </TouchableOpacity>
                  <Title title={'Direct charge'} fontFamily='Cairo-Bold' />

                </View>
                <Title title={`${t(groupID === 233 || groupID === 240 ? "Please enter the phone number" : groupID === 243 ? "Please enter the Wallet number" : "please enter player id")}`} numberOfLines={0} />
                <View style={{ paddingHorizontal: 40, paddingTop: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Input
                        isPassword={false}
                        // keyboardType="number-pad"
                        placeholder={groupID === 233 || groupID === 240 ? 'Phone Number' : groupID === 243 ? "Wallet number" : 'player id'}
                        onChangeText={(value: string) => { onChange(value), setTextInputcode(value) }}
                        value={value}
                      />
                    )}
                    name="textInputcode"
                    rules={{
                      required: true,
                      minLength: {
                        value: 3,
                        message: "min length is 1"
                      },

                    }}
                  />
                  {(errors.textInputcode) && <View style={{ width: '100%' }}><ErrorMsg errorMsg="Invalid Code." /></View>}

                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    style={{ width: 90, marginTop: 20, marginBottom: -9 }}
                    onClick={() => onConfirm()}
                    title="Confirm"
                    locked={textInputCode.length < 3}
                    txtColor={Colors.WHITE}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {/* <TouchableOpacity onPress={() => {
              Clipboard.setString(code + ""), toast.show({
                title: "",
                status: "success",
                description: 'تم نسخ الكود',
                width: SCREEN_WIDTH,
              })
            }} style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", top: '70%', right: '81%', borderRadius: 30, width: 60, height: 60, backgroundColor: Colors.PURPLE }}>
              <IconImage
                small
                source={Copying}
              />
            </TouchableOpacity> */}


          {/* } */}
          <>
            {route.params.isPrinting ?
              <>
                {/* <Title title='latest screen: printing' style={{marginTop:20,fontSize:30}}/> */}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: '17%' }}>

                  <IconImage
                    style={{ width: SCREEN_WIDTH / 2, height: SCREEN_HEIGHT / 7 }} source={{ uri: logo }} />
                  <Title title={dateTime} />
                  <Title title={'Card has been purchased'} color={'green'} fontFamily='Cairo-Bold' style={{ fontSize: 30 }} />
                  <Title title='you can print your card agin in history section' />
                  <View style={{ flexDirection: 'row', }}>
                    <Title title="Cost: " />
                    <Title title={route.params.price} fontFamily='Cairo-Bold' style={{}} />
                    <Title title='JOD' fontFamily='Cairo-Bold' />


                  </View>
                  {/* {(!route.params.isGaming && groupID !== 233 && groupID !== 240 && groupID !== 243) &&
                    <Button txtColor={Colors.WHITE} style={{ marginBottom: 0 }} title='Print' onClick={async () => {
                      const printer = Platform.OS == 'android' ? await printSingle() : selectPrinterAsync()
                      console.log('printer', printer)
                    }} />
                  } */}
                  {(!route.params.isGaming && groupID !== 233 && groupID !== 240 && groupID !== 243) &&
                    <Button txtColor={Colors.WHITE} title='Share' style={{ marginTop: 10, marginBottom: 10 }} onClick={onShare} />
                  }
                  {(route.params.isGaming || groupID === 233 || groupID === 240 || groupID === 243 || groupID === 221) &&
                    <Button txtColor={Colors.WHITE} title={(groupID === 233) ? 'Receive by phone' : groupID === 240 ? 'Enter phone number' : groupID === 243 ? "Enter the Wallet number" : 'Direct charge'} style={{ marginTop: 0 }} onClick={() => { setSwoWebView(true) }} />
                  }
                </View>
              </>
              :
              <View style={styles.centeredView}>
                <IconImage
                  style={{ width: SCREEN_WIDTH / 2, height: SCREEN_HEIGHT / 7 }} source={{ uri: logo }} />
                <Title style={{ marginBottom: '11%' }} title={`${price} ${route.params.price}`} />

                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      isPassword={false}
                      maxLength={10}
                      keyboardType="number-pad"
                      placeholder='Phone Number'
                      onChangeText={(value: string) => { onChange(value), setInputValue(parseInt(value)) }}
                      value={value}
                    />
                  )}
                  name="PhoneNumber"
                  rules={{
                    required: true,
                    minLength: {
                      value: 10,
                      message: "min length is 5"
                    },

                    maxLength: {
                      value: 10,
                      message: "max length is 5"
                    }
                  }}
                />
                {(errors.PhoneNumber || isNaN(inputValue)) && <View style={{ width: '100%' }}><ErrorMsg errorMsg="Invalid Phone Number." /></View>}


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Button title='Balance transfer' locked={!isValid} width='42%' txtColor={Colors.WHITE} onClick={handleSubmit(onSubmit)} />

                </View>

              </View>
            }


          </>
        </ScrollView>

      </ImageBackground>
    </>
  );
};

export default DetailsScreen;




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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: '17%',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: '90%',
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },




});