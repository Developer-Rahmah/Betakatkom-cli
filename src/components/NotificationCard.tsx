import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import IconImage from 'Cards/src/components/IconImage';
import { GridCardContainer, GridCardImage, Button, Card, CardContainer, SmallCard } from './ComponentStyled';
import { useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import Zain from "Cards/assets/images/zain.png";
import Notification from "Cards/assets/icons/notify.png";
import Umniah from "Cards/assets/images/u.png";
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import { fontSize, marginTop } from 'styled-system';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../services/helper/Constant';
import moment from 'moment';

const NotificationCard = ({
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
  const styles = StyleSheet.create({
    padding: { padding: 10 },
    marginVertical: {
      marginVertical: 10,
    },
  });
  let date = moment(item.createdAt);
  return (
    <CardContainer >
      <SmallCard style={[General.shadow, { paddingHorizontal: SCREEN_WIDTH / 12, flexDirection: 'row', backgroundColor: type == 0 ? Colors.BLACK : type == 1 ? Colors.ORANGE_COLOR : type == 2 ? Colors.UMNIAH_COLOR : Colors.WHITE }]}>
        <IconImage source={Notification} style={ImageStyles.notificationcon} />
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Title style={{ fontSize: SCREEN_WIDTH / 25, textAlign: 'center', }} fontFamily='Cairo-Regular' title={item.type === 1 ? 'You have been received' : 'You pay dept'} numberOfLines={0} />
            <Title style={{ fontSize: SCREEN_WIDTH / 20, textAlign: 'center', marginHorizontal: 7, }} fontFamily='Cairo-Bold' title={item.amount} numberOfLines={0} color={item.type === 1 ? 'green' : Colors.RED} />
            <Title style={{ fontSize: SCREEN_WIDTH / 20, textAlign: 'center', }} fontFamily='Cairo-Bold' title={'JOD'} numberOfLines={0} color={item.type === 1 ? 'green' : Colors.RED} />
          </View>
          <View style={{ width: '100%', alignItems: 'flex-start', paddingStart: 40 }}>
            <Title style={{ fontSize: SCREEN_WIDTH / 25, textAlign: 'left', marginTop: -9 }} fontFamily='Cairo-Regular' title={date.format('YYYY-MM-DD') + ''} numberOfLines={0} color={Colors.mainColor} />
          </View>
        </View>

      </SmallCard>

    </CardContainer>
  );
};

export default NotificationCard;
