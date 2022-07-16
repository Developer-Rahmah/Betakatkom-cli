import Background from 'Cards/assets/images/background.jpeg';
import { Colors } from 'Cards/assets/styles/Colors';
import Elements from 'Cards/assets/styles/Elements';
import General from 'Cards/assets/styles/General';
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import Header from 'Cards/src/components/Header';
import IconImage from 'Cards/src/components/IconImage';
import Title from 'Cards/src/components/Title';
import React from 'react';
import AppIcon from 'Cards/assets/images/full-size-logo.png'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { ContainerView, ImageAndTextContainer } from '../settings/SettingsScreenStyled';
import Exit from "Cards/assets/icons/exit.png";



const AboutUsScreen = () => {

  return (
    <>
      <Header />
      <ImageBackground resizeMode='repeat' style={General.flex} source={Background}>

        <ScrollView>
          <ContainerView>
            <ImageAndTextContainer>
              <IconImage
                source={AppIcon}
                style={[ImageStyles.lTeaserImage, { marginBottom: 30 }]}
              />
            </ImageAndTextContainer>
            <View style={{width:'100%'}}>
            <Title
              color={Colors.SAMI_BLACK}
              style={{
                textAlign: 'left',
                fontSize: 13,
                lineHeight: 20,
                marginStart:3,
              }}
              numberOfLines={0}
              title="About us: "
            />

            <Title
              color={Colors.SAMI_BLACK}
              style={{
                textAlign: 'left',
                fontSize: 13,
                lineHeight: 20,
              }}
              numberOfLines={0}
              title="BETAKATKOM Is A application for selling communication cards, and games Card Get your card easily in one place (Zain - Orange - Ummah - Google Play, iTunes, PlayStation Store for all accounts) BETAKATKOM Is application in the field of selling cards and electronic payment of all kinds at wholesale prices Fast service at the click of a button"
            />

            </View>
            <View style={Elements.loginFieldsContainer} />
          </ContainerView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AboutUsScreen;

const styles= StyleSheet.create({

})

