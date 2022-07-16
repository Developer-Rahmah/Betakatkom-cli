import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import { CardContainer, SmallCard } from './ComponentStyled';
import { useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import { SCREEN_WIDTH } from '../services/helper/Constant';
import { Client } from '../services/config/clients';
import { GET } from '../services/config/api';
import { useSelector } from 'react-redux';
import { useToast } from 'native-base';
// import { selectPrinterAsync, printAsync } from 'expo-print'
import { useTranslation } from '../services/hooks';

const SmallHeightColumnCard = ({
  item,
  index,
  title,
  listing,
  disabled = false,
  type
}: {
  item?: any;
  index?: number;
  title?: string;
  listing?: any;
  disabled?: boolean;
  type?: number;
}) => {
  const navigation = useNavigation();
  const [cards, setCards] = useState([])
  const t = useTranslation()
  const printerUrl = 'ipp://BRW2C6FC9173DCB.local.:631/ipp/print'
  interface RootState {
    user: any;
  }
  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  interface RootState {
    authToken: string;

  }


  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const toast = useToast()

  const styles = StyleSheet.create({
    padding: { padding: 10 },
    marginVertical: {
      marginVertical: 10,
    },
  });
  useEffect(() => {
    getCards()
  }, [])
  const getCards = () => {
    Client.get(
      GET.CARD_TYPE,
      {
        headers: {
          "Authorization": useToken,

        }
      }

    )
      .then((res) => {
        if (res.status == 200) {
          // setListData(res.data.data)
          console.log("cards", res.data.data)
          console.log("id", item.type)

          setCards(res.data.data)
          // const card = getCardTypeName(res.data.data, item.type)
          // console.log("carddddd", card)


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
  function getCardTypeName(cards, id) {
    let card = cards.find(card => card.id === id);
    if (card) return card.nameArabic;
    let childCard = cards
      .filter(card => getCardTypeName(card.children || [], id))
      .map(card => `${card.nameArabic} ${getCardTypeName(card.children || [], id)}`)
      .join('');
    if (childCard) return childCard;
    return '';
  }

  //   const printSingle = useCallback(async (data, type) => {
  //     const item = data?.card;
  //     console.log("item", data, type)
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
  //                   <br>${type}
  //                 <br>
  //                  <br>
  //                   <br>رقم البطاقة
  //                 <br>
  //                 <span class="card-value">${code}</span></p>
  //            <center> <h1>-------- ${secTitle} --------</h1>  </center>
  //  <p class="centered">
  //                 <br>
  //                 <br>Serial Number
  //                 <br>${serialNumber}</p>
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
  console.log("itttttetetetet", item)
  return (
    <View />
    // <TouchableOpacity
    //   onPress={async () => {
    //     const printer = Platform.OS == 'android' ? await printSingle(item, getCardTypeName(cards, item.card?.type)) : selectPrinterAsync()
    //   }}>
    //   <CardContainer >
    //     <SmallCard style={[General.shadow, { width: SCREEN_WIDTH, justifyContent: 'space-between', paddingHorizontal: 35, flexDirection: 'row', backgroundColor: item.stockTaken == false ? Colors.LIGHT_GRAY : Colors.WHITE }]}>
    //       <View >
    //         <Title numberOfLines={0} style={{ fontSize: 14, textAlign: 'left' }} fontFamily='Cairo-Regular' title={new Date(item.createdAt).getDate() + '-' + (new Date(item.createdAt).getMonth() + 1) + '-' + new Date(item.createdAt).getFullYear()} color={Colors.SAMI_BLACK} />
    //         <Title numberOfLines={0} style={{ fontSize: 14, textAlign: 'left' }} fontFamily='Cairo-Regular' title={Math.abs(new Date(item.createdAt).getHours() - 2) + ':' + Math.abs(new Date(item.createdAt).getMinutes())} color={Colors.SAMI_BLACK} />
    //       </View>
    //       <Title numberOfLines={0} style={{ fontSize: 17, textAlign: 'left' }} fontFamily='Cairo-Regular' title={getCardTypeName(cards, item.card?.type)} color={Colors.SAMI_BLACK} />
    //       <Title numberOfLines={0} style={{ fontSize: 20, textAlign: 'left' }} fontFamily='Cairo-Regular' title={Math.abs(item.amount).toString()} />
    //     </SmallCard>
    //   </CardContainer>
    // </TouchableOpacity>
  );
};

export default SmallHeightColumnCard;
