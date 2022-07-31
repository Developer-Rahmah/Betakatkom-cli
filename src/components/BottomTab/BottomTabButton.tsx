import { Colors } from 'Cards/assets/styles/Colors';
import { SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import React from 'react';
import { ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

import IconImage from '../IconImage';
import Title from '../Title';

const BottomTabButton = ({
  icon,
  focused,
  label,
  ...rest
}: {
  icon: ImageSourcePropType;
  focused: boolean;
  label: string;
  rest: any

}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        { borderTopColor: focused ? Colors.BLUE : Colors.LIGHT_GRAY }
      ]}
      {...rest}>

      {label === '' ?
        <View >
          <View style={label === "" ? [styles.blueCircle, { backgroundColor: focused ? Colors.mainColor : Colors.LIGHT_GRAY }] : null}>
            <IconImage
              small
              source={icon}
              color={
                focused
                  ? Colors.WHITE
                  : label === ""
                    ? Colors.WHITE
                    : Colors.secondaryColor
              }
            />
          </View>
        </View>
        :
        <View style={label === "" ? [styles.blueCircle, {
          top: -30
        }] : null}>
          <IconImage
            small
            source={icon}
            color={
              focused
                ? Colors.mainColor
                : label === "" || label === 'Settings'
                  ? Colors.WHITE
                  : Colors.WHITE

            }
          />
        </View>
      }
      <Title fontFamily='Cairo-Regular' color={
        focused
          ? Colors.mainColor
          : label === "" || label === 'Settings'
            ? Colors.WHITE
            : Colors.WHITE

      } title={label} style={{ width: SCREEN_WIDTH / 5 }} />
    </TouchableOpacity>
  );
};

export default BottomTabButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0,
  },

  blueCircle: {
    // backgroundColor: Colors.LIGHT_GRAY,
    padding: 20,
    borderRadius: 60,
    width: 90,
    height: 90, justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 15,
    marginRight: 0,
    backgroundColor: Colors.mainColor,
    top: -20,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: .25,
    shadowRadius: .84,

    elevation: 5,
  }
});
