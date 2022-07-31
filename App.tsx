import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/services/redux/store";
import LocalStorage from "./src/services/helper/LocalStorage";
import { I18nManager, YellowBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigations/AppNavigator";
// enable reactotron.p
// require('./ReactotronConfig');

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const setDirection = async () => {
    const lang = await LocalStorage.get('lang');
    const userId = await LocalStorage.get('authToken');
    console.log("lang", lang)
    if (lang === 'ar') {
      I18nManager.forceRTL(true);
    } else if (lang === 'en') {
      I18nManager.forceRTL(false);
    } else {
      I18nManager.forceRTL(true);
    }
  };
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'RNDeviceInfo', 'Warning: An update']);
  useEffect(() => {
    setDirection();
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
