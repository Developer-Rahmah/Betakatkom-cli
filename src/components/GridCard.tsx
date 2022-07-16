import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, Modal, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import { GridCardContainer, GridView } from './ComponentStyled';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../services/helper/Constant';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTranslation } from '../services/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useToast, View } from 'native-base';
import { setBalanceAction, setUserAction } from '../services/redux/actions';
import { Client } from '../services/config/clients';
import { GET, POST } from '../services/config/api';
import LocalStorage from '../services/helper/LocalStorage';
import { alignItems, height, justifyContent, marginTop, paddingBottom, width } from 'styled-system';
import IconImage from './IconImage';
import Close from 'Cards/assets/icons/close.png'
import Plus from 'Cards/assets/icons/plus.png'
import Minus from 'Cards/assets/icons/minus.png'

import Button from './Button';
let trs = []
const GridCard = ({
  item,
  index,
  title,
  secTitle,
  type,
  disabled = false,
  name,
  groupID
}: {
  item: any;
  index?: number;
  title?: string;
  secTitle?: string;
  disabled: boolean;
  type: number;
  name: string;
  groupID: number
}) => {
  const navigation = useNavigation();
  interface RootState {
    user: any;
    authToken: string;

  }

  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const [disableBtn, setDisableBtn] = useState(false)


  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);

  const styles = StyleSheet.create({
    padding: { padding: 10 },
    marginVertical: {
      marginVertical: 10,
    },
    whiteBox: {
      width: '100%', backgroundColor: 'white', height: 30, marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.7)',
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
    }
  });
  const anim = useRef(new Animated.Value(1));
  const [startValue] = useState(new Animated.Value(0));
  const [endValue] = useState(SCREEN_WIDTH + SCREEN_WIDTH);
  const [duration] = useState(2000);
  const toast = useToast()
  const [showAlert, setShowAlert] = useState(false)
  const [current, setCurrentUser] = useState({})
  const [cost, setCost] = useState<number>(1)
  const [transactions, setTransactions] = useState([]);


  const t = useTranslation()
  const dispatch = useDispatch();
  interface RootState {
    balance: string;
  }

  const balance = (state: RootState) => state.balance;
  const userBalance = useSelector(balance);
  const [modalVisible, setModalVisible] = useState(false);
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
      navigation.navigate('DetailsScreen', { isCard: true, type: type, name: item.name, title: title, secTitle: secTitle, isPrinting: false, transactions: transactions });

    } else {
      toast.show({
        title: t("Error"),
        status: "error",
        width: SCREEN_WIDTH,
        description: t("Your balance is not enough"),

      })
    }
  }

  const onCancelPressed = () => {
    setShowAlert(false)
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
  const sendData = async () => {
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
        // if (res.status == 200) {
        let obj =
          setTransactions(transactions => [...transactions, { serialNumber: res.data.data.serialNumber, code: res.data.data.code }])
        getUserInfo(res.data.data.serialNumber, res.data.data.code)
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
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const onConfirm = async () => {
    if (trs.length > 0) {
      trs = []
    }
    setModalVisible(false);
    for (let i = 1; i <= cost; i++) {
      // await setTimeout(() => {
      //   sendData()
      // }, 5000);
      await sendData()
      await sleep(1000)
    }
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
        console.log("tttttttttt", transactions)
        trs.push({ "serialNumber": serialNumber, "code": code });
        console.log("trrssssss", trs)
        // if (transactions.length > 0)
        navigation.navigate('DetailsScreen', {
          isCard: title === 'Egyptian Cards' ? false : true, type: type, price: userInfo.class === 'A' ? item.priceA : userInfo.class === 'B' ? item.priceB : item.priceC, title: title, secTitle: secTitle, isPrinting: true, cat: I18nManager.isRTL ? item.nameArabic : item.nameEnglish, serialNumber: serialNumber, code: code, transactions: trs, groupID: groupID
        });
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
  const increment = () => {
    if (cost + 1 <= 5) {
      setCost(cost + 1);
    }
  }
  const decrement = () => {
    if (cost - 1 >= 1) {
      setCost(cost - 1);
    }
  }
  useEffect(() => {
    // getUserInfo()
    console.log('Fruit', transactions);

  }, [transactions])
  return (
    <TouchableOpacity onPress={() => { title === 'ZAIN' || title === 'ORANGE' || title === 'UMNIAH' ? setShowAlert(true) : setShowAlert(true) }}>
      <GridCardContainer source={{ uri: item.image }} style={[General.shadow, { backgroundColor: title === 'ZAIN' ? Colors.BLACK : title === 'ORANGE' ? Colors.ORANGE_COLOR : title === 'UMNIAH' ? Colors.UMNIAH_COLOR : 'transparent' }]} >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, General.shadow]}>
              <View style={{ justifyContent: 'center', flexDirection: 'row', top: -25 }}>
                <TouchableOpacity onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                  <IconImage
                    small
                    source={Close}
                    style={{ left: -90 }}
                  />
                </TouchableOpacity>
                <Title title={`${title + ': ' + name + ': ' + item.nameEnglish}`} fontFamily='Cairo-Bold' />

              </View>
              <Title title={`${t("The cost value will be deducted when you press purchase")}`} numberOfLines={0} />
              <View style={{ paddingHorizontal: 40, paddingTop: 20, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => increment()}>
                  <IconImage
                    small
                    source={Plus}
                    style={{ left: 0 }}
                  />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 20, height: 40, borderColor: Colors.BLACK, borderWidth: 1, width: 90, justifyContent: 'center', alignItems: 'center' }}>
                  <Text >{cost + ''}</Text>
                </View>
                <TouchableOpacity onPress={() => decrement()}>
                  <IconImage
                    small
                    source={Minus}
                    style={{ left: 0, top: 9 }}
                  />
                </TouchableOpacity>
              </View>
              <Title title={`${t('Cost: ')}${parseFloat(userInfo.class === 'A' ? item.priceA * cost : userInfo.class === 'B' ? item.priceB * cost : item.priceC * cost).toFixed(2)}`} numberOfLines={0} style={{ marginTop: 15 }} />
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  style={{ width: 90, marginTop: 20, marginBottom: -9 }}
                  onClick={() => onConfirm()}
                  title="Confirm"
                  txtColor={Colors.WHITE}
                />
              </View>
            </View>
          </View>
        </Modal>
        <GridView  >
          {/* <Animated.View style={{ transform: [{ scale: anim.current }] }}> */}
          {/* </Animated.View> */}
          {/* <Title style={{ fontSize: SCREEN_HEIGHT / 50, marginTop: -25 }} title={title === 'Egyptian Cards' ? 'EGP' : 'JOD'} color={title === 'ZAIN' ? Colors.PURPLE : title === 'ORANGE' ? Colors.WHITE : title === 'UMNIAH' ? Colors.SAMI_BLACK : Colors.WHITE} /> */}
          {title === 'ZAIN' || title === 'ORANGE' || title === 'UMNIAH' ?
            <>
              <Animated.View style={{ transform: [{ scale: anim.current }] }}>
                <Title style={{ fontSize: SCREEN_HEIGHT / 20, marginTop: -15 }} title={I18nManager.isRTL ? item.nameArabic : item.nameEnglish} color={title === 'ZAIN' ? Colors.ZAIN_COLOR : title === 'ORANGE' ? Colors.WHITE : title === 'UMNIAH' ? Colors.WHITE : Colors.WHITE} />
              </Animated.View>
              <View style={styles.whiteBox}>
                <Title style={{ fontSize: SCREEN_HEIGHT / 40, marginTop: -5 }} title={parseFloat(userInfo.class === 'A' ? item.priceA : userInfo.class === 'B' ? item.priceB : item.priceC) + ''} />
              </View>
            </>
            :
            <View style={[styles.whiteBox, { backgroundColor: item.image === null ? 'white' : 'black', width: item.image === null ? '90%' : '100%', height: item.image === null ? '55%' : '70%', opacity: item.image === null ? 1 : .7 }]}>
              <Title style={{ fontSize: 35, marginBottom: -9 }} title={I18nManager.isRTL ? item.nameArabic : item.nameEnglish} color={title === 'ZAIN' ? Colors.ZAIN_COLOR : title === 'ORANGE' ? Colors.WHITE : title === 'UMNIAH' ? Colors.WHITE : Colors.WHITE} />
              <Title style={{ fontSize: 25, color: item.image === null ? Colors.PURPLE : Colors.WHITE }} title={parseFloat(userInfo.class === 'A' ? item.priceA : userInfo.class === 'B' ? item.priceB : item.priceC) + ''} />
            </View>
          }
        </GridView>

        <AwesomeAlert
          show={showAlert == true ? true : false}
          showProgress={false}
          title={`${'          ' + title + ': ' + name + ': ' + item.nameEnglish + '\n'}${t("The cost value will be deducted when you press purchase")}`}
          message={`${t('Cost: ')}${parseFloat(userInfo.class === 'A' ? item.priceA * cost : userInfo.class === 'B' ? item.priceB * cost : item.priceC)}`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={!disableBtn}
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

export default GridCard;