import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import HomeStack from "Cards/src/navigations/HomeStack";

import BottomTab from "../components/BottomTab";
import LocalStorage from "../services/helper/LocalStorage";
import { setAuthTokenAction, setBalanceAction, setUserAction, setUserIdAction } from "../services/redux/actions";
import NonUserNavigator from "./NonUserNavigator";
import UsersNavigator from "./UsersNavigator";
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from "../screens/login/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Client } from "../services/config/clients";
import { GET } from "../services/config/api";
import { useToast } from "native-base";
import { SCREEN_WIDTH } from "../services/helper/Constant";

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
  const [currentUser, setCurrentUser] = useState({})
  const dispatch = useDispatch();
  const getUser = async () => {
    const user = await LocalStorage.get('user');
    dispatch(setBalanceAction(user?.wallet));

    dispatch(setUserAction(user));
  };
  const getToken = async () => {
    const authToken = await LocalStorage.get('authToken');
    console.log('authTokennnnnn', authToken);

    dispatch(setAuthTokenAction(authToken));
    getUserInfo(authToken);
  };
  const toast = useToast()

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
      .then((response) => {
        if (response.status == 200) {
          console.log("datatttttt", response.data.data)
          // dispatch(setUserAction(response.data.data));
          // LocalStorage.set('user', response.data.data);


          Client.get(
            GET.SELLING_POINTS,
            {
              headers: {
                "Authorization": 'Bearer U2FsdGVkX19L/TXxBCYW+LjgfgVj2h7OMFhbJGkln1DWPRw6cVHRpn5yaK+X1io95q5l+6DsCAGOJlvVyIS5Basg9o5YLTFPEjevjXLL6txm3RKB8FCcMLHt0th9fmvEg3bAVcqyP2JlHHS6BONauz5tXchnBgcUwuB/p6nyTayKUh90pLjhcVf3lvjwvF7/OhRa+CiAD5zFhIRUuSWvZxl/nrXAiD/ozNI3VlGMz6SWlIteEOiUxDDy/3s1NN9wffyfHnScNtlnX6exY8+N9HnV0if0kksDTnRVtyRAYnwhDjx1ZKDWqMDVHjR2IuHLvRzBAntaEIPLUFC+ohVGtJXRxSfocMhV5T1THB7pRqJO3KOEfkPZ+6pW1PVUlgzbevHRd+7Qq0iYJDN3bAw8FArB2wI7XWh6AZuoUcvN9koBAPNn2YkgfkJ3I8d7Y2LH5lwZXvznOJ6bjQgGqYs/3mTefvmzveBzirFNbhqdjJiFtndO8OvF3zBPOPqU2dUtBtcWJUneBkYWouFAhtijWRS5OIk3QHKKsO2dAy3hhS8mcnAZfxoF14KzhIxgDkH1SqGBf7q8Z2Rk/7jC9mFsQtynbAZtlXe/XHeuRp96A4Y=',


              }
            }

          )
            .then((res) => {
              var result = res.data.data.filter(item => item.id === response.data.data.id);
              setCurrentUser(result[0]);
              console.log("result[0]", result[0])
              dispatch(setBalanceAction(result[0].Wallet.balance));
              dispatch(setUserAction(result[0]));
              LocalStorage.set('user', result[0]);
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
  // const getUserInfo = async () => {
  //   const userId = await LocalStorage.get('userId');
  //   console.log('userIdfffff', userId);
  //   dispatch(setUserIdAction(userId));
  // };

  useEffect(() => {
    getToken();
    getUser()
    // setUserBaalance()
  }, []);

  const Stack = createStackNavigator();
  console.log('rrrrrr', useToken === null);

  return (



    <Stack.Navigator headerMode="none">
      {useToken !== null ? (
        <Stack.Screen name="NonUser" component={NonUserNavigator} />
      ) : (
        <Stack.Screen name="User" component={UsersNavigator} />
      )}
    </Stack.Navigator>

  );
};

export default AppNavigator;

