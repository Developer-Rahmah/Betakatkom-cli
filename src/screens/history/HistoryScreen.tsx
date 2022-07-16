import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ImageBackground,
  ScrollView,
  I18nManager,
  Platform,
  Alert,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import Background from 'Cards/assets/images/background.jpeg';
import Information from 'Cards/assets/icons/printing.png';
import Trash from 'Cards/assets/icons/trash.png';
// import { selectPrinterAsync, printAsync } from 'expo-print'

import Header from 'Cards/src/components/Header';
import Exit from "Cards/assets/icons/exit.png";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import ColumnCard from 'Cards/src/components/ColumnCard';
import SmallHeightColumnCard from 'Cards/src/components/SmallHeightColumnCard';
import IconImage from 'Cards/src/components/IconImage';
import { Colors } from 'Cards/assets/styles/Colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTranslation } from 'Cards/src/services/hooks';
import { Radio, Select, useToast } from 'native-base';
// import Picker from 'native-base'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from 'Cards/src/components/Button';
import { flexDirection, fontSize, justifyContent, paddingBottom, width } from 'styled-system';
import { Client } from 'Cards/src/services/config/clients';
import { GET, POST } from 'Cards/src/services/config/api';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import Title from 'Cards/src/components/Title';

// const MODE_VALUES = Platform.select({
//   ios: Object.values(IOS_MODE),
//   android: Object.values(ANDROID_MODE),
//   windows: [],
// });
export default function HistoryScreen() {
  const t = useTranslation()
  const [showAlert, setShowAlert] = useState<boolean>()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [value, setValue] = React.useState("one")
  const [show, setShow] = useState(false);
  const [stockArray, setStockArray] = useState([]);
  const [dateFrom, setDateFrom] = useState<string | Date>(t('From Date'));
  const [dateTo, setDateTo] = useState<string | Date>(t('to Date'));
  const printerUrl = 'ipp://BRW2C6FC9173DCB.local.:631/ipp/print'

  const [pickerMode, setPickerMode] = useState(null);
  const [selectedValFrom, setSelectedValFrom] = useState('0')
  const [selectedValTo, setSelectedValTo] = useState('0')
  const toast = useToast()

  interface RootState {
    authToken: string;

  }

  interface RootState {
    user: any;
  }
  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const navigation = useNavigation();
  // const [mode, setMode] = useState(MODE_VALUES[0]);
  const [listData, setListData] = useState([]);

  const IS_SMALL_DEVICE = SCREEN_WIDTH <= 420;
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  useEffect(() => {

  }, [dateFrom, dateTo, selectedValFrom, selectedValTo])
  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  );
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  //   const printSingle = useCallback(async (data) => {
  //     const item = data?.card;
  //     const price = t('Price')
  //     const inputCode = item.code
  //     const cardID = t('Card ID')
  //     var today = new Date();
  //     const title = ''
  //     const nameEnglish = ''
  //     const secTitle = 'بطاقة مباعة'
  //     const userName = userInfo.phone
  //     let logo = "https://i.ibb.co/3mN82Zh/logo.png"
  //     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //     const serialNumber = item.serialNumber
  //     const code = item.code
  //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //     var dateTime = date + ' ' + time;
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
  //             <div class="date-time">
  //                 <span>Date:${date}</span>
  //                 <span>Time:${time}</span>
  //             </div>
  //             <p class="centered market-name"><span>${userName}</span>
  //                 <br>
  //                 <br>رقم البطاقة
  //                 <br>
  //                 <span class="card-value">${code}</span></p>
  //            <center> <h1>-------- ${secTitle} --------</h1>  </center>

  //             <p class="centered">بامكانكم زيارة موقعنا الإلكتروني:
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
  const renderItem = data => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={[styles.rowFront]}
      underlayColor={'#AAA'}
    >
      <View>
        <Text>I am {data.item.text} in a SwipeListView</Text>
      </View>
    </TouchableHighlight>
  );
  const showInformation = (rowMap, data) => {
    // const jsonData = JSON.parse(data);
    // console.log("datadatadatadatadatadatadata", jsonData.item)
    setMessage(data.code)
    setTitle(data.serialNumber)
    setShowAlert(true)
    closeRow(rowMap, data.key)

  }
  const renderHiddenItem = (data, rowMap) => (
    <View style={[styles.rowBack, { marginRight: 0, backgroundColor: Colors.PURPLE, marginLeft: -10, height: '100%', bottom: data.item.key != listData.length ? 0 : 7 }]}>

      {/* <TouchableOpacity style={[styles.backRightBtnRight, {
        backgroundColor: Colors.PURPLE, marginRight: 0, marginLeft: 0, height: '80%', justifyContent: 'center', alignItems: 'flex-start',
        width: '50%',
      }]}
        
        onPress={async () => {
          const printer = Platform.OS == 'android' ? await printSingle(data) : selectPrinterAsync()
          console.log('printer', printer)
        }}

      >
        <IconImage style={{ marginLeft: IS_SMALL_DEVICE ? '22%' : '15%', marginTop: -15, tintColor: 'white' }} small source={Information} />

      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight, { width: IS_SMALL_DEVICE ? I18nManager.isRTL ? '40%' : '40%' : I18nManager.isRTL ? '40%' : '40%', justifyContent: 'center', alignItems: 'center', marginRight: 10, height: '100%' }]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <IconImage style={{ marginLeft: SCREEN_WIDTH / 7, marginTop: -15 }} small source={Trash} />
      </TouchableOpacity> */}
    </View>
  );
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDate(new Date(0));
    } else {
      setDate(currentDate);
    }
  };
  const onRadioChange = (value: string) => {
    setValue(value)
    if (value === 'custom') {
      setShow(true);
      setDateFrom(t('From Date'));
      setDateTo(t('to Date'))
      setSelectedValFrom('0')
      setSelectedValTo('0')

    } else {
      setShow(false);
    }
  }
  const onValueChange = (value) => {

  }
  const hidePicker = () => {
    setShow(false)
  };

  const handleConfirm = (date) => {
    if (selectedValFrom === 'valFrom') {
      setDateFrom(
        date.getDate() +
        '-' +
        parseInt(date.getMonth() + 1) +
        '-' +
        date.getFullYear(),
      );
      hidePicker();


    } if (selectedValTo === 'valTo') {
      setDateTo(
        date.getDate() +
        '-' +
        parseInt(date.getMonth() + 1) +
        '-' +
        date.getFullYear(),
      );
      hidePicker();
      var result = listData.filter(item =>
        // console.log("itttttttem", item),

        ((new Date(item.createdAt)).getTime() < (new Date(date)).getTime()) && ((new Date(item.createdAt)).getTime() > (new Date(dateFrom)).getTime())
      );
      console.log('resultresultresultresult', result)
      setListData(result);
    }

  };

  const getData = () => {
    Client.get(
      GET.TRANSACTIONS,
      {
        headers: {
          "Authorization": useToken,

        }
      }

    )
      .then((res) => {
        if (res.status == 200) {
          console.log("data", res.data.data)
          // setListData(res.data.data)
          var result = res.data.data.filter(item => item.type === 2);
          var stocks = res.data.data.filter(item => !item.stockTaken);

          setListData(result.reverse());
          setStockArray(stocks);

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
  const onBarrenPress = () => {
    Client.post(
      POST.BARREN, {
      "data": {
        "transaction": 2
      }
    }, {
      headers: {
        "Authorization": useToken,
      }
    },

    )
      .then((res) => {
        // if (res.status == 200) {
        console.log("data", res.data)
        toast.show({
          title: "Success",
          status: "success",
          description: 'Success!',
          width: SCREEN_WIDTH,
        })
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
  const filterData = (toDate) => {
    // function getDates(startDate, stopDate) {
    var dateArray = [];
    // var currentDate = moment(selectedValFrom);
    // var stopDate = moment(toDate);
    // while (currentDate <= toDate) {
    //   dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
    //   currentDate = moment(currentDate).add(1, 'days');
    // }
    // return dateArray;
    console.log("selectedValTo", dateTo)
    // var result = listData.filter(item =>
    //   // console.log("itttttttem", item),

    //   moment(item.createdAt) < moment(dateTo)
    // );
    // console.log('resultresultresultresult', result)
    // setListData(result);
    // }
  }
  return (
    <ImageBackground style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, }} resizeMode='repeat' source={Background}>

      <Header exit leftIcon={Exit} />
      <Radio.Group
        style={{ display: 'none', flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginBottom: -10, paddingTop: 10 }}
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={value}
        onChange={(nextValue) => {
          onRadioChange(nextValue)
        }}
      >
        <Radio value="all" my={1}>
          {t('All')}
        </Radio>
        <Radio value="custom" my={1}>
          {t('Custom Date')}
        </Radio>
      </Radio.Group>
      {/* {show && (selectedValFrom === 'valFrom' || selectedValTo === 'valTo') && (
        <DateTimePickerModal
          maximumDate={new Date()}
          isVisible={show}
          mode={'date'}
          // date={date}
          onConfirm={handleConfirm}
          onCancel={hidePicker}
        />
      )} */}
      {value === 'custom' &&
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 20 }}
        >
          <Select
            placeholder={dateFrom}
            defaultValue={dateFrom}
            selectedValue={selectedValFrom}
            value={dateFrom}
            width={150}
            backgroundColor={Colors.WHITE}
            onValueChange={(itemValue: string) => { setSelectedValFrom(itemValue), setSelectedValTo('0'), setShow(true) }}
          >
            <Select.Item label={t("select date")} value="valFrom" />
          </Select>
          <Select
            placeholder={dateTo}
            defaultValue={dateTo}
            value={dateTo}
            backgroundColor={Colors.WHITE}
            selectedValue={selectedValTo}
            width={150}
            onValueChange={(itemValue: string) => { setSelectedValTo(itemValue), setSelectedValFrom('0'), setShow(true), filterData(itemValue) }}
          >
            <Select.Item label={t("select date")} value="valTo" />
          </Select>
        </View>
      }
      <View style={{ display: 'none', width: '100%', paddingHorizontal: 70, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ marginBottom: -4, marginTop: 15 }} txtColor={Colors.WHITE} title='Reports' onClick={() => {
          Alert.alert('', `${t('Print Rreports')}`)
        }} />
      </View>
      <View style={styles.container}>

        <ImageBackground style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, paddingBottom: show ? 160 : 70 }} resizeMode='repeat' source={Background}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 10, alignItems: 'center', height: 50, paddingBottom: 10 }}>
            <Title title={'The number of cards sold after the last inventory:   '} style={styles.txt} fontFamily='Cairo-Bold' color={Colors.BLACK} />
            <View style={styles.counterContainer}>
              <Title title={stockArray.length + ''} style={styles.balanceTxt} fontFamily='Cairo-Bold' color={Colors.WHITE} />
            </View>
            <Button style={styles.button} txtColor={Colors.WHITE} title='barren' onClick={() => {
              // setShowAlert(true)
              onBarrenPress()
            }} />
          </View>
          <ScrollView>

            <SwipeListView
              contentContainerStyle={{ width: SCREEN_WIDTH, flex: 1, alignItems: 'center', paddingBottom: SCREEN_HEIGHT / 3 }}

              data={listData}
              renderItem={({ item, index }) => {
                return (

                  <SmallHeightColumnCard
                    // type={route.params.type}
                    item={item}
                    index={index}
                    title={'title'}

                  />
                );
              }}
              // renderHiddenItem={renderHiddenItem}
              leftOpenValue={I18nManager.isRTL ? SCREEN_WIDTH / 4 : SCREEN_WIDTH / 4}
              // rightOpenValue={I18nManager.isRTL ? - SCREEN_WIDTH / 4 : -SCREEN_WIDTH / 4}

              // leftOpenValue={100}
              rightOpenValue={-100}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title={t('When you press print inventory, the inventory counter will be reset')}
              // message={`${message}`}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              // showCancelButton={true}
              onDismiss={() => setShowAlert(false)}
              showConfirmButton={true}
              confirmText={t("inventory printing")}
              titleStyle={{ fontFamily: 'Cairo-Regular' }}
              messageStyle={{ fontFamily: 'Cairo-Regular' }}
              cancelButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
              confirmButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
              cancelButtonColor={Colors.PURPLE}
              confirmButtonColor={Colors.PURPLE}
              // onCancelPressed={() => {
              //   setShowAlert(false);
              // }}
              onConfirmPressed={() => {
                setShowAlert(false)
              }}
            />
          </ScrollView>
        </ImageBackground>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginVertical: 20
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    // marginHorizontal:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  counterContainer: {
    backgroundColor: Colors.RED, width: 70, height: 50, borderRadius: 7, justifyContent: 'center', alignItems: 'center', paddingBottom: 5
  },
  button: {
    width: 50, height: 50, marginStart: 10
  },
  txt: {
    fontSize: 14,
  }
});