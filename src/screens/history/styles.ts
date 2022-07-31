import {Colors} from 'Cards/assets/styles/Colors';
import {SCREEN_HEIGHT} from 'Cards/src/services/helper/Constant';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginVertical: 20,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    // marginHorizontal:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  counterContainer: {
    backgroundColor: Colors.RED,
    width: 70,
    height: 50,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  button: {
    width: 50,
    height: 50,
    marginStart: 10,
  },
  txt: {
    fontSize: 14,
  },
});

export default styles;
