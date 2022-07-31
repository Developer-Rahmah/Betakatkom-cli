import Wallet from 'Cards/assets/icons/wallet.png';
import GifImg from 'Cards/assets/icons/loading.gif';
import { Colors } from 'Cards/assets/styles/Colors';
import Layout from 'Cards/assets/styles/Layout';
import Title from 'Cards/src/components/Title';
import { SCREEN_HEIGHT } from 'Cards/src/services/helper/Constant';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';



const Balance = () => {
  const [showPng, setShowPng] = useState(false)
  interface RootState {
    user: any;
    balance: string;

  }
  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const balance = (state: RootState) => state.balance;
  const userBalance = useSelector(balance);
  useEffect(() => {
    setTimeout(() => { setShowPng(true) }, 2000)

  }, [])
  return (
    <>


      <View style={[Layout.flexCenter]}>
        <View style={styles.balanceCard}>

          {showPng ?
            <>
              <Image style={styles.walletImg} source={Wallet} />

              <Title title={userBalance != null && (userBalance).toFixed(2) + '   '} style={styles.balanceTxt} fontFamily='Cairo-Bold' color={Colors.WHITE} />
              <Title fontFamily='Cairo-Bold' title='JOD' color={Colors.WHITE} />
            </>
            :
            <Image style={styles.gifImg} source={GifImg} />
          }
        </View>
      </View>

    </>
  );
};

export default Balance;

const styles = StyleSheet.create({
  balanceCard: {
    width: '50%', backgroundColor: Colors.mainColor,
    borderRadius: 30, height: SCREEN_HEIGHT / 20,
    justifyContent: 'center',
    alignItems: 'center', shadowOffset: {
      width: 1,
      height: 2,
      flex: 1,

    },
    top: -25,
    position: 'absolute',
    shadowOpacity: .25,
    flexDirection: 'row',
    shadowRadius: .84,
    shadowColor: Colors.BLACK,
    elevation: 20

  },
  walletImg: {
    flex: .3, marginTop: '-3%', resizeMode: 'contain',
    marginEnd: 10,
    tintColor: Colors.WHITE,
    height: '70%', marginBottom: -5
  },
  balanceTxt: {
    fontWeight: 'bold', fontSize: SCREEN_HEIGHT / 40
  },
  gifImg: {
    flex: 1, resizeMode: 'contain'
  }

})

