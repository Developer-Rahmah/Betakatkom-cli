import React from 'react';
import { I18nManager, StyleSheet, Image, ImageBackground, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import IconImage from 'Cards/src/components/IconImage';
import { GridCardContainer, GridCardImage, Button, Card, CardContainer, GamingCardContainer, TouchableCard } from './ComponentStyled';
import { useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import Zain from "Cards/assets/images/zain.png";
import Orange from "Cards/assets/images/orange.png";
import Umniah from "Cards/assets/images/u.png";
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import { Gaming } from 'Cards/assets/images/gaming-sec-image.jpeg';
import { opacity } from 'styled-system';

const GamingColumnCard = ({
  item,
  index,
  title,
  listing,
  disabled = false,
  notChargeCard,
  type,
  groupID
}: {
  item?: any;
  index?: number;
  title?: string;
  listing?: any;
  disabled?: boolean;
  type?: number;
  groupID?: number;
  notChargeCard?: boolean;
}) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    padding: { padding: 10 },
    marginVertical: {
      marginVertical: 10,
    },
  });
  console.log("first", groupID)
  return (

    <GamingCardContainer >
      <TouchableCard onPress={() => navigation.navigate('CardDetailsScreen', { groupID: groupID, notChargeCard: notChargeCard, type: type, name: item.nameEnglish, title: title, subData: item.children, parentID: item.id, parentIndex: index })} style={[General.shadow, { backgroundColor: type == 0 ? Colors.BLACK : type == 1 ? Colors.ORANGE_COLOR : type == 2 ? Colors.UMNIAH_COLOR : Colors.secondaryColor }]}>
        <ImageBackground imageStyle={{ borderRadius: 15 }} source={{ uri: item.image }} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} resizeMode='stretch'>
          <View style={{ width: '80%', height: 50, backgroundColor: Colors.BLACK, opacity: .7 }}>
            <Title style={{ fontSize: 23, }} fontFamily='Cairo-Regular' title={I18nManager.isRTL ? item.nameArabic : item.nameEnglish} color={Colors.GOLD} />
          </View>
        </ImageBackground>

      </TouchableCard>


    </GamingCardContainer>
  );
};

export default GamingColumnCard;
