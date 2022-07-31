import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import HomeScreen from "Cards/src/screens/home/HomeScreen";
import CardListingScreen from "../screens/cardListing/CardListingScreen";
import CardDetailsScreen from "../screens/cardDetails/CardDetailsScreen";
import DetailsScreen from "../screens/detailsScreen/DetailsScreen";
import ComingSoonScreen from "../screens/comingSoon/ComingSoonScreen";
import FirstScreen from "../screens/firstScreeen/FirstScreen";
import EducationalPlatformsScreen from "../screens/educationalPlatforms/EducationalPlatformsScreen";
import ElectronicWalletsScreen from "../screens/electronicWallets/ElectronicWalletsScreen";
import PaymentOfBillsScreen from "../screens/paymentOfBills/PaymentOfBillsScreen";
import PaymentOfBillsDetailsScreen from "../screens/paymentOfBillsDetailsScreen/PaymentOfBillsDetailsScreen";

const Stack = createStackNavigator();
export default class HomeStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="c"
      >

        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CardListingScreen" component={CardListingScreen} />
        <Stack.Screen name="CardDetailsScreen" component={CardDetailsScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="ComingSoonScreen" component={ComingSoonScreen} />
        <Stack.Screen name="EducationalPlatformsScreen" component={EducationalPlatformsScreen} />
        <Stack.Screen name="ElectronicWalletsScreen" component={ElectronicWalletsScreen} />
        <Stack.Screen name="PaymentOfBillsScreen" component={PaymentOfBillsScreen} />
        <Stack.Screen name="PaymentOfBillsDetailsScreen" component={PaymentOfBillsDetailsScreen} />
      </Stack.Navigator>
    );
  }
}
