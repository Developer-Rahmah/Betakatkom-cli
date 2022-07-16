import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import AboutUsScreen from "../screens/aboutUs/AboutUsScreen";
import MandoubScreen from "../screens/mandoub/MandoubScreen";

const Stack = createStackNavigator();
export default class AboutUsStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="AboutUsScreen"

      >
        <Stack.Screen name="MandoubScreen" component={MandoubScreen} />
      </Stack.Navigator>
    );
  }
}
