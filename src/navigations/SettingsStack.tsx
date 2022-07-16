import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import AboutUsScreen from "../screens/aboutUs/AboutUsScreen";
import ChangePasswordScreen from "../screens/changePassword/ChangePasswordScreen";
import ConditionsAndTermsScreen from "../screens/conditionsAndTerms/ConditionsAndTermsScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

const Stack = createStackNavigator();
export default class SettingsStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ConditionsAndTermsScreen" component={ConditionsAndTermsScreen} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />

        
      </Stack.Navigator>
    );
  }
}
