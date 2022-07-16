import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ImageBackground,
  I18nManager,
  ScrollView,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import Background from 'Cards/assets/images/background.jpeg';
import Information from 'Cards/assets/icons/information.png';
import Trash from 'Cards/assets/icons/trash.png';

import Header from 'Cards/src/components/Header';
import Exit from "Cards/assets/icons/exit.png";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import ColumnCard from 'Cards/src/components/ColumnCard';
import SmallHeightColumnCard from 'Cards/src/components/SmallHeightColumnCard';
import IconImage from 'Cards/src/components/IconImage';
import { Colors } from 'Cards/assets/styles/Colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTranslation } from 'Cards/src/services/hooks';
import NotificationCard from 'Cards/src/components/NotificationCard';
import { useToast } from 'native-base';
import { useSelector } from 'react-redux';
import { Client } from 'Cards/src/services/config/clients';
import { GET } from 'Cards/src/services/config/api';
import { useFocusEffect } from '@react-navigation/native';

export default function NotificationsScreen() {
  const [showAlert, setShowAlert] = useState()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const toast = useToast()

  interface RootState {
    authToken: string;

  }


  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const t = useTranslation()
  const [listData, setListData] = useState([])

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

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
  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  );
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
    setMessage(data.item.text)
    setTitle(data.item.key)
    setShowAlert(true)
    closeRow(rowMap, data.item.key)

  }
  const renderHiddenItem = (data, rowMap) => (
    <View style={[styles.rowBack, { marginRight: 0, marginLeft: -10, height: '100%', bottom: data.item.key != listData.length - 1 ? 7 : 7 }]}>


      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight, { width: 100, justifyContent: 'center', alignItems: 'center', marginRight: 10, height: '100%' }]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        {/* <Text style={styles.backTextWhite}>Delete</Text> */}
        <IconImage style={{ marginRight: '-2%', marginTop: -15 }} small source={Trash} />
      </TouchableOpacity>
    </View>
  );
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
          var result = res.data.data.filter(item => item.type === 1 || item.type === 6);
          setListData(result.reverse());

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
  useEffect(() => {
    getData()

  }, [])

  return (
    <ImageBackground style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} resizeMode='repeat' source={Background}>
      <Header exit leftIcon={Exit} />
      <View style={styles.container}>
        <ImageBackground style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} resizeMode='repeat' source={Background}>
          <ScrollView>
            <SwipeListView
              contentContainerStyle={{ width: SCREEN_WIDTH, flex: 1, alignItems: 'center', paddingBottom: '59%' }}
              data={listData}
              renderItem={({ item, index }) => {
                return (
                  <NotificationCard
                    // type={route.params.type}
                    item={item}
                    index={index}
                    title={'title'}

                  />
                );
              }}
            // renderHiddenItem={renderHiddenItem}
            // leftOpenValue={I18nManager.isRTL ?100:0}
            // rightOpenValue={I18nManager.isRTL? 0:-100}
            // previewRowKey={'0'}
            // previewOpenValue={-40}
            // previewOpenDelay={3000}
            // onRowDidOpen={onRowDidOpen}
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
    marginVertical: 0
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
});