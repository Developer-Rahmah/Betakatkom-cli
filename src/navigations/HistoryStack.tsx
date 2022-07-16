import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import HistoryScreen from "../screens/history/HistoryScreen";

const Stack = createStackNavigator();
export default class HistoryStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Teams"
      >
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      </Stack.Navigator>
    );
  }
}
