import {Colors} from 'Cards/assets/styles/Colors';
import {SCREEN_HEIGHT} from 'Cards/src/services/helper/Constant';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    marginVertical: '10%',
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    padding: 40,
    paddingTop: 0,
  },
  imageBackground: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  paddingBottom: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  firstTxt: {
    marginBottom: 5,
    fontSize: SCREEN_HEIGHT / 40,
  },
  switchLangContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  switch: {
    marginHorizontal: 10,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  loginBtnContainer: {
    justifyContent: 'center',
    paddingVertical: 15,
  },
  loginBtn: {
    width: '100%',
    marginTop: 15,
    borderRadius: 23,
    paddingVertical: 16,
  },
  contactUs: {
    marginBottom: 5,
    color: Colors.WHITE,
  },
  phoneContainer: {
    paddingBottom: 30,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 40, height: 40, marginEnd: 20},
  whatsappIcon: {
    width: 40,
    height: 40,
    marginStart: 20,
  },
  copyrightContainer: {
    width: 40,
    height: 40,
    marginStart: 20,
  },
});

export default styles;
