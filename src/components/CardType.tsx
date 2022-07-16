import React, { useEffect, useState } from 'react';
import { Alert, I18nManager, StyleSheet } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import IconImage from 'Cards/src/components/IconImage';
import { Card, CardContainer, CardtypeContainer } from './ComponentStyled';
import { useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import Charge from "Cards/assets/images/credit-card.png";
import Game from "Cards/assets/images/mobile-game.png";
import Pay from "Cards/assets/images/debit-card.png";
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import Stores from 'Cards/assets/images/online-shopping.png';
import { SCREEN_WIDTH } from '../services/helper/Constant';
import { Client } from '../services/config/clients';
import { GET } from '../services/config/api';
import { useSelector } from 'react-redux';
import { useToast } from 'native-base';
import Orange from "Cards/assets/images/orange.png";
import { useTranslation } from '../services/hooks';
import OnlineLesson from 'Cards/assets/images/online-lesson.png';
import ElectronicWallets from 'Cards/assets/images/electronic-wallets.png';


const CardType = ({
  item,
  index,
}: {
  item?: any;
  index?: number;
}) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    padding: { padding: 10 },
    marginVertical: {
      marginVertical: 10,
    },
  });
  let source: number;
  switch (index - 1) {
    case 1:
      source = require("../../assets/images/zain-logo.png");
      break;
    case 2:
      source = require("../../assets/images/orange-logo.png");
      break;
    case 3:
      source = require("../../assets/images/umniah.png");
      break;
  }
  const toast = useToast()
  interface RootState {
    authToken: string;
  }
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const [games, setGames] = useState([])
  const [storesAndChanels, setStoresAndChanels] = useState([])
  const [educationalPlatforms, setEducationalPlatforms] = useState([])
  const [electronicWallets, setElectronicWallets] = useState([])
  const [paymentOfBills, setPaymentOfBills] = useState([])



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
        setAllData(res.data.data)

        var gamingCards = res.data.data.filter(item => item.id === 221);
        setGames(gamingCards[0].children)

        var storesAndChanelsCards = res.data.data.filter(item => item.id === 233);
        setStoresAndChanels(storesAndChanelsCards[0].children)

        var educationalPlatformsCards = res.data.data.filter(item => item.id === 240);
        setEducationalPlatforms(educationalPlatformsCards[0].children)

        var electronicWalletsCards = res.data.data.filter(item => item.id === 243);
        setElectronicWallets(electronicWalletsCards[0].children)

        var paymentOfBillsCards = res.data.data.filter(item => item.id === 228);
        setPaymentOfBills(paymentOfBillsCards[0].children)

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
  const t = useTranslation()
  return (
    <CardtypeContainer onPress={() => item.type === 3 ? navigation.navigate('HomeScreen', { type: item.type, data: storesAndChanels, item: storesAndChanels, id: 233 }) : index - 1 === -1 ? navigation.navigate('HomeScreen', { type: index - 1 }) : item.type === 2 ? navigation.navigate('PaymentOfBillsScreen', { data: paymentOfBills, parentType: item.type }) : item.type === 5 ? navigation.navigate('ElectronicWalletsScreen', { data: electronicWallets }) : item.type === 4 ? navigation.navigate('EducationalPlatformsScreen', { data: educationalPlatforms }) : navigation.navigate('CardListingScreen', { type: index - 1, source: source, items: games, children: allData, title: item.name, isGaming: true, notChargeCard: true, id: 221 })} style={{ width: SCREEN_WIDTH / 2.15 }}>
      <Card style={[General.shadow, { backgroundColor: Colors.GOLD, borderColor: Colors.BLACK, borderWidth: 1 }]}>
        {index - 1 == -1 ?
          <IconImage source={Charge} style={ImageStyles.mediumIcon} />
          : index - 1 == 0 ?
            <IconImage source={Game} style={[ImageStyles.mediumIcon, { height: '25%' }]} />
            :
            index - 1 == 1 ?
              <IconImage source={Pay} style={[ImageStyles.mediumIcon, { height: '25%' }]} />
              :
              index - 1 == 2 ?
                <IconImage source={Stores} style={[ImageStyles.mediumIcon, { height: '25%' }]} />
                :
                index - 1 == 3 ?
                  <IconImage source={OnlineLesson} style={[ImageStyles.mediumIcon, { height: '25%' }]} />
                  :
                  index - 1 == 4 ?
                    <IconImage source={ElectronicWallets} style={[ImageStyles.mediumIcon, { height: '25%' }]} />
                    :
                    <IconImage source={Charge} style={ImageStyles.mediumIcon} />
        }
        <Title style={{ fontSize: 20 }} fontFamily='Cairo-Regular' title={item.name} color={Colors.BLACK} numberOfLines={0} />
      </Card>

    </CardtypeContainer >
  );
};

export default CardType;
