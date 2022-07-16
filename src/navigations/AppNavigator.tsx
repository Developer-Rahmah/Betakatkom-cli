import React, { useEffect, useState } from "react";

import LocalStorage from "../services/helper/LocalStorage";
import { setAuthTokenAction, setBalanceAction, setUserAction } from "../services/redux/actions";
import NonUserNavigator from "./NonUserNavigator";
import UsersNavigator from "./UsersNavigator";
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from "@react-navigation/stack";
import { Client } from "../services/config/clients";
import { GET } from "../services/config/api";
import { useToast } from "native-base";

const AppNavigator = () => {
  interface RootState {
    authToken: string;
    user: any;
  }
  interface RootState {
    user: any;
    balance: string;

  }
  const user = (state: RootState) => state.user;
  const userInfo = useSelector(user);
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);
  const dispatch = useDispatch();
  const getUser = async () => {
    const user = await LocalStorage.get('user');
    dispatch(setBalanceAction(user?.Wallet.balance));

    dispatch(setUserAction(user));
  };
  const getToken = async () => {
    const authToken = await LocalStorage.get('authToken');
    console.log('authTokennnnnn', authToken);

    dispatch(setAuthTokenAction(authToken));
    // if (useToken !== null) {
    getUserInfo(authToken);
    // }
  };
  const toast = useToast()
  const [currentUser, setCurrentUser] = useState({})

  const setUserBaalance = async () => {

    dispatch(setBalanceAction(19.50));
  };

  const getUserInfo = (authToken) => {
    Client.get(
      GET.USER,
      {
        headers: {
          "Authorization": authToken,

        }
      }

    )
      .then((res) => {
        if (res.status == 200) {
          console.log("data", res.data.data)
          dispatch(setBalanceAction(res.data.data.Wallet.balance));

          dispatch(setUserAction(res.data.data));
          LocalStorage.set('user', res.data.data);
        }
      })
      .catch((error) => {
        // toast.show({
        //   title: "error",
        //   status: "error",
        //   description: error.message,
        //   width: SCREEN_WIDTH,
        // })
      });
  }
  // const getUserInfo = async () => {
  //   const userId = await LocalStorage.get('userId');
  //   console.log('userIdfffff', userId);
  //   dispatch(setUserIdAction(userId));
  // };

  useEffect(() => {
    getToken();
    // if (useToken !== null) {
    getUser()
    // }
    // setUserBaalance()
  }, []);

  const Stack = createStackNavigator();
  console.log('rrrrrr', useToken === null);

  return (



    <Stack.Navigator headerMode="none">
      {/* {useToken === null ? (
        <Stack.Screen name="NonUser" component={NonUserNavigator} />
      ) : ( */}
      <Stack.Screen name="User" component={UsersNavigator} />
      {/* )} */}
    </Stack.Navigator>

  );
};

export default AppNavigator;

