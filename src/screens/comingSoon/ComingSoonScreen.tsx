import Background from 'Cards/assets/images/background.jpeg';
import ComingSoon from 'Cards/assets/images/comingsoon4.gif';
import General from 'Cards/assets/styles/General';
import Layout from 'Cards/assets/styles/Layout';
import Balance from 'Cards/src/components/Balance';
import Header from 'Cards/src/components/Header';
import React from 'react';
import { ImageBackground, View ,Image} from 'react-native';


const ComingSoonScreen  = () => {
  
  return (
    <>
    <Header/>
    
      <ImageBackground resizeMode='repeat' style={[General.flex,Layout.flexCenter]} source={Background}>
    <Balance/>
        <View style={{  width: '100%',justifyContent:'center',alignItems: 'center'}}>
         
<Image resizeMode='contain' source={ComingSoon}style={{height:'100%',width:'95%'}}/>
        </View>
 
      </ImageBackground>
    </>
  );
};

export default ComingSoonScreen ;

