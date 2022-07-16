import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";

const Stack = createStackNavigator();
export default class NotificationStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      </Stack.Navigator>
    );
  }
}
