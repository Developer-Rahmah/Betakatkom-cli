import React from 'react';
import HomeStack from './HomeStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from '../components/BottomTab';
import SettingsStack from './SettingsStack';
import AboutUsStack from './AboutUsStack';
import NotificationStack from './NotificationStack';
import HistoryStack from './HistoryStack';


const UsersNavigator = () => {
  const Tab = createBottomTabNavigator()

  return (

    <Tab.Navigator initialRouteName="HomeStack"
      tabBar={(props) => <BottomTab {...props} />}>

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: require("../../assets/icons/settings.png"),
          tabBarLabel: "Settings"
        }}
      />
      <Tab.Screen
        name="About Us"
        component={AboutUsStack}
        options={{
          tabBarIcon: require("../../assets/icons/businessman.png"),
          tabBarLabel: "Mandoub"
        }}
      />
      <Tab.Screen

        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: require("../../assets/icons/home.png"),
          tabBarLabel: ""
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          tabBarIcon: require("../../assets/icons/bell.png"),
          tabBarLabel: "Notifications"
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarIcon: require("../../assets/icons/history.png"),
          tabBarLabel: "History"
        }}
      />
    </Tab.Navigator>
  );
};

export default UsersNavigator;
