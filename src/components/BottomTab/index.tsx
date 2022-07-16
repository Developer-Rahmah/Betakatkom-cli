import { Colors } from "Cards/assets/styles/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import BottomTabButton from "./BottomTabButton";

const BottomTab = ({
  state,
  descriptors,
  navigation
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const tabs = state.routes;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={[styles.container]}>
      {tabs.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const icon = options.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <BottomTabButton
            onPress={onPress}
            label={label}
            icon={icon}
            focused={isFocused}
            key={route.key}
          />
        );
      })}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    // paddingVertical: 5,
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: Colors.BLACK
  }
});
