import React, { useEffect, useState } from "react";
import { Alert, I18nManager, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from "react-native";
import Logo from "Cards/assets/images/logo.png";
import { Colors } from "Cards/assets/styles/Colors";
import IconImage from "Cards/src/components/IconImage";
// import Exit from 'Cards/assets/images/exit-icon.png'
// import Exit from 'Cards/assets/icons/logout.png'
import Exit from 'Cards/assets/icons/arrow-logout.png'

import { SCREEN_WIDTH } from "../services/helper/Constant";
import { useDispatch } from "react-redux";
import { setAuthTokenAction, setUserAction } from "../services/redux/actions";
import LocalStorage from "../services/helper/LocalStorage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../services/hooks";
import AwesomeAlert from 'react-native-awesome-alerts';

export const Header = ({
  showLogo = true,
  exit = false,
  leftIcon = Exit
}: {
  showLogo?: boolean;
  childere?: JSX.Element;
  exit?: boolean;
  leftIcon?: ImageSourcePropType
}) => {
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState()
  const t = useTranslation()
  const logout = () => {
    setShowAlert(!showAlert);

  }
  const setTokenNull = () => {
    // AsyncStorage.clear()
    LocalStorage.remove('user')

    LocalStorage.set('user', null);
    dispatch(setUserAction(null));
    dispatch(setAuthTokenAction(null));
    LocalStorage.set('authToken', null);
  }
  const navigation = useNavigation();
  useEffect(() => {

  }, [showAlert])
  return (

    <View style={styles.header}>
      <TouchableOpacity onPress={() => exit ? setShowAlert(!showAlert) : navigation.goBack()}>
        <IconImage color={Colors.WHITE} small source={leftIcon} style={[styles.exitImg, {
          transform: exit ? [
            {
              rotateY:
                !I18nManager.isRTL
                  ? '180deg'

                  : '0deg',
            },
          ] :
            [
              {
                rotateY:
                  I18nManager.isRTL
                    ? '180deg'

                    : '0deg',
              },
            ]
        }]} />

      </TouchableOpacity>
      <IconImage style={styles.logoImg} source={Logo} />

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={t("log out")}
        message={t("Are you sure you want to log out?")}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={t("cancel")}
        onDismiss={() => setShowAlert(false)}
        confirmText={t("  Yes  ")}
        titleStyle={{ fontFamily: 'Cairo-Regular' }}
        messageStyle={{ fontFamily: 'Cairo-Regular' }}
        cancelButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
        confirmButtonTextStyle={{ fontFamily: 'Cairo-Regular' }}
        cancelButtonColor={Colors.PURPLE}
        confirmButtonColor={Colors.PURPLE}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          setTokenNull()
        }}
      />

    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.BLACK,
    width: "100%",
    // paddingVertical: SCREEN_HEIGHT / 45,
    // height:100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    // paddingHorizontal: 20
  },
  iconContainer: {

    justifyContent: "center"
  },
  exitImg: {
    width: SCREEN_WIDTH / 13, height: SCREEN_WIDTH / 13, resizeMode: 'contain', marginEnd: 10
    , transform: [
      {
        rotateY:
          !I18nManager.isRTL
            ? '180deg'

            : '0deg',
      },
    ]
  },
  logoImg: {
    width: '25%', resizeMode: 'contain'
  }
});
