import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
// import AppLoading from 'expo-app-loading';
import { fetchFonts } from "./assets/styles/Fonts";
import { Provider } from "react-redux";
import store from "./src/services/redux/store";
import LocalStorage from "./src/services/helper/LocalStorage";
import { I18nManager } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigations/AppNavigator copy";
// enable reactotron.
// require('./ReactotronConfig');

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const setDirection = async () => {
    const lang = await LocalStorage.get('lang');
    const userId = await LocalStorage.get('authToken');

    console.log('langlang', lang);
    if (lang === 'ar') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else if (lang === 'en') {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    } else {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
  };
  console.disableYellowBox = true;
  useEffect(() => {
    setDirection();
  }, []);
  console.disableYellowBox = true;
  // if (!dataLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setDataLoaded(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
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
