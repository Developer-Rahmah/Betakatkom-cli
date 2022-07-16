import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import {Colors} from 'Cards/assets/styles/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'Cards/src/services/helper/Constant';

const Elements = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: SCREEN_HEIGHT / 35,
    textAlign: 'center',
    // lineHeight: Dimensions.get('window').width / 20,
  },
  unselectedRadio: {
    borderRadius: SCREEN_HEIGHT / 45,
    width: SCREEN_HEIGHT / 36,
    height: SCREEN_HEIGHT / 36,
    backgroundColor: Colors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  selectedRadio: {
    backgroundColor: Colors.PURPLE,
    borderRadius: 50,
    width: '100%',
    height: '100%',
  },
  borderHorizontalSeparator: {
    height: 1,
    backgroundColor: Colors.WHITE,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  searchInput: {
    height: 50,
  },
  summary: {
    color: Colors.BLACK,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlign: 'left',
  },
  drawer: {
    width: '80%',
    backgroundColor: Colors.BLUE,
  },
  primaryButton: {
    paddingVertical: 13,
    width: SCREEN_WIDTH / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.PURPLE,
  },

  searchInputContainer: {
    height: '10%',
    padding: 30,
    borderBottomColor: Colors.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    margin: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  helpBtn: {
    paddingVertical: Dimensions.get('window').width / 240,
    paddingHorizontal: Dimensions.get('window').width / 50,
  },
  input: {
    color: Colors.BLACK,
    fontFamily: 'Poppins-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  bottomTabContainer: {
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: Colors.LIGHT_BLUE,
    borderTopColor: Colors.LIGHT_GRAY,
    borderTopWidth: 0.9,
  },
  bottomTabButtonContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderTopWidth: 0,
  },

  lightSeparator: {
    width: '100%',
    height: 1,
    opacity: 0.5,
    marginVertical: 3,
    backgroundColor: Colors.BLACK,
  },

  noItemsMessageContainer: {
    height: Dimensions.get('window').height / 1.7,
  },

  playerName: {
    width: '68%',
  },

  headerTopPaddingIphoneXCase: {
    paddingTop: Dimensions.get('window').height / 20,
  },
  headerTopPadding: {
    paddingTop: Dimensions.get('window').height / 47,
  },
  headerTitleContainerInAuthCase: {
    width: '100%',
  },
  headerTitleContainerInShowBackCase: {
    width: '80%',
  },
  dropDownMenuBorder: {
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 20,
  },
  fieldContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  passwordInput: {width: '90%', marginEnd: 10},
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  flagContainer: {
    borderEndColor: '#d9e1ec',
    borderEndWidth: 2,
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    paddingStart: 20,
    alignItems: 'center',
    height: '100%',
  },
  receiptsContainer: {
    height: SCREEN_HEIGHT / 1.167,
    justifyContent: 'space-between',
  },
  searchOnReceiptsContainer: {
    width: '31%',
  },
  EmptyReceiptsContainer: {
    width: '67%',
  },
  loginFieldsContainer: {
    flex: 0.5,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
export default Elements;
