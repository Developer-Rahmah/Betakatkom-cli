import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from './Colors';

const General = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  fullHeight: {
    height: '100%',
  },
  lightGrayBackground: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  veryLightGrayBackground: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  smallEndMargin: {
    marginEnd: 10,
  },

  greenBackground: {
    backgroundColor: Colors.PURPLE,
  },

  transparentBackground: {
    backgroundColor: 'transparent',
  },
  whiteBackgroundColor: {
    backgroundColor: Colors.WHITE,
  },
  darkBlueBackgroundColor: {
    backgroundColor: Colors.BLUE,
  },

  horizontalPadding: {
    paddingHorizontal: 10,
  },
  color: {
    color: Colors.PURPLE,
  },
  underline: {
    textDecorationLine: 'underline',
  },

  verticalPadding: {
    paddingVertical: Dimensions.get('window').height / 17,
  },
  smallTopPadding: {
    paddingTop: Dimensions.get('window').height / 50,
  },
  mediumTopPadding: {
    paddingTop: Dimensions.get('window').height / 35,
  },
  mediumVerticalPadding: {
    paddingVertical: Dimensions.get('window').height / 35,
  },
  mediumPadding: {
    padding: Dimensions.get('window').height / 35,
  },
  largeTopPadding: {
    paddingTop: Dimensions.get('window').height / 5,
  },

  smallVerticalPadding: {
    paddingVertical: Dimensions.get('window').height / 200,
  },

  paddingBottom: {
    paddingBottom: Dimensions.get('window').height / 7.5,
  },
  smallPaddingBottom: {
    paddingBottom: Dimensions.get('window').height / 200,
  },
  mediumPaddingBottom: {
    paddingBottom: Dimensions.get('window').height / 30,
  },
  paddingTop: {
    paddingTop: Dimensions.get('window').height / 15,
  },

  smallTopMargin: {
    marginTop: Dimensions.get('window').height / 75,
  },
  border: {
    borderWidth: 1,
  },
  whiteBorder: {
    borderColor: Colors.WHITE,
  },
  grayBottomBorder: {
    borderBottomColor: Colors.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  shadow: {
    elevation: 1.5,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  seventyWidthPercentage: {
    width: '70%',
  },

  smallPadding: {
    paddingVertical: Dimensions.get('window').width / 27,
    paddingHorizontal: Dimensions.get('window').width / 37,
  },
  smallWidth: {
    width: '17%',
  },
  largeMarginVertical: {
    marginVertical: 30,
  },
});
export default General;
