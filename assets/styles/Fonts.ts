import * as Font from 'expo-font';

export const fetchFonts = () => {
  return Font.loadAsync({
    'MuseoModerno-SemiBold': require('../fonts/MuseoModerno-SemiBold.ttf'),
    'Cairo-Regular': require('../fonts/Cairo-Regular.ttf'),
    'Cairo-Bold': require('../fonts/Cairo-Bold.ttf'),


    
  });
};
