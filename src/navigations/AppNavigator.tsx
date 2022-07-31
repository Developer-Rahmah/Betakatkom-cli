import React, { useEffect } from "react";
import NonUserNavigator from "./NonUserNavigator";
import UsersNavigator from "./UsersNavigator";
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from "@react-navigation/stack";
import LocalStorage from "../services/helper/LocalStorage";
import { setAuthTokenAction } from "../services/redux/actions";

const AppNavigator = () => {
  interface RootState {
    authToken: string;
    user: any;
  }

  useEffect(() => {
    getToken();
  }, []);
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);

  const dispatch = useDispatch();

  // init Stack Navigator
  const Stack = createStackNavigator();

  const getToken = async () => {
    const authToken = await LocalStorage.get('authToken');
    dispatch(setAuthTokenAction('authToken'));
  };
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {useToken === null ? (
        <Stack.Screen name="NonUser" component={NonUserNavigator} />
      ) : (
        <Stack.Screen name="User" component={UsersNavigator} />
      )}
    </Stack.Navigator>

  );
};

export default AppNavigator;