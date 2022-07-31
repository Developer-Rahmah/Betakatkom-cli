import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setLanguageAction } from '../services/redux/actions';
import LocalStorage from '../services/helper/LocalStorage';
import LoginScreen from '../screens/login/LoginScreen';

const NonUserNavigator = () => {

  // init Stack Navigator
  const Stack = createStackNavigator();

  const dispatch = useDispatch();

  // get current language from the local storage
  const getLang = async () => {
    const lang = await LocalStorage.get('lang');
    dispatch(setLanguageAction(lang));
  };

  useEffect(() => {
    getLang();
  }, []);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default NonUserNavigator;