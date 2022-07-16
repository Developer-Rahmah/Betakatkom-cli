import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguageAction} from '../services/redux/actions';
import LocalStorage from '../services/helper/LocalStorage';

import LoginScreen from '../screens/login/LoginScreen';


const NonUserNavigator = () => {
  interface RootState {
    langCode: string;
  }

  const selectLangCode = (state: RootState) => state.langCode;
  const langCode = useSelector(selectLangCode);
  const dispatch = useDispatch();
  const getLang = async () => {
    const lang = await LocalStorage.get('lang');

    dispatch(setLanguageAction(lang));
    
  };
  useEffect(() => {
    getLang();
  }, []);


  const Stack = createStackNavigator();

  return (
 
          
    <Stack.Navigator headerMode="none">
     
 
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
         
      
    </Stack.Navigator>
          
      
  );
};

export default NonUserNavigator;
