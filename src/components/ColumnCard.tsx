import React from 'react';
import { I18nManager, StyleSheet, Image, ImageBackground, View, TouchableOpacity } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import IconImage from 'Cards/src/components/IconImage';
import { GridCardContainer, GridCardImage, Button, Card, CardContainer } from './ComponentStyled';
import { useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import Zain from "Cards/assets/images/zain.png";
import Orange from "Cards/assets/images/orange.png";
import Umniah from "Cards/assets/images/u.png";
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import { Gaming } from 'Cards/assets/images/gaming-sec-image.jpeg';
import { opacity } from 'styled-system';
import { SCREEN_WIDTH } from '../services/helper/Constant';

const ColumnCard = ({
  item,
  index,
  title,
  listing,
  disabled = false,
  notChargeCard,
  id,
  type,
  parentType,
  groupID
}: {
  item?: any;
  index?: number;
  title?: string;
  listing?: any;
  disabled?: boolean;
  type?: number;
  notChargeCard?: boolean;
  id: number;
  parentType: number;
  groupID: number;
}) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    padding: { padding: 10 },
    marginVertical: {
      marginVertical: 10,
    },
  });
  console.log("groupID", groupID)
  return (
    <TouchableOpacity onPress={() => parentType == 2 ? navigation.navigate('PaymentOfBillsDetailsScreen', { type: type, name: item.nameArabic, title: title, item: item }) : navigation.navigate('CardDetailsScreen', { type: type, name: item.nameEnglish, title: title, subData: item.children, groupID: groupID })} >

      <CardContainer style={{ width: id === 234 ? SCREEN_WIDTH / 2.16 : SCREEN_WIDTH, padding: id === 234 ? 7 : 0, }} >
        <Card borderRadius={15} source={{ uri: item.image }} style={[General.shadow, { backgroundColor: title === 'ZAIN' ? Colors.BLACK : title === 'ORANGE' ? Colors.ORANGE_COLOR : title === 'UMNIAH' ? Colors.UMNIAH_COLOR : 'transparent' }]}>

          {title === 'ZAIN' ?
            <IconImage source={Zain} style={ImageStyles.mediumIcon} />
            : title === 'ORANGE' ?
              <IconImage source={Orange} style={[ImageStyles.mediumIcon, { height: '25%' }]} />
              : title === 'UMNIAH' ?
                <IconImage source={Umniah} style={[ImageStyles.mediumIcon, { height: '25%' }]} />
                :
                // <IconImage source={Zain} style={ImageStyles.mediumIcon} />
                null

          }
          <View style={{ width: '80%', height: 50, backgroundColor: title === 'ZAIN' || title === 'ORANGE' || title === 'UMNIAH' ? 'transparent' : Colors.BLACK, opacity: .7 }}>

            <Title style={{ fontSize: 30 }} fontFamily='Cairo-Regular' title={I18nManager.isRTL ? item.nameArabic : item.nameEnglish} color={title === 'ZAIN' ? Colors.ZAIN_COLOR : title === 'ORANGE' ? Colors.WHITE : title === 'UMNIAH' ? Colors.SAMI_BLACK : Colors.WHITE} />
          </View>

        </Card>
      </CardContainer>
    </TouchableOpacity>

  );
};

export default ColumnCard;
