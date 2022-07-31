import React, { } from 'react';
import Header from 'Cards/src/components/Header';
import { ContainerView } from 'Cards/src/screens/mandoub/MandoubScreenStyled';
import { ScrollView } from 'react-native';
import Exit from 'Cards/assets/icons/exit.png';


export default function MandoubScreen() {

  return (
    <>
      <Header exit leftIcon={Exit} />

      <ScrollView style={{ backgroundColor: 'white' }}>

        <ContainerView >


        </ContainerView>
      </ScrollView>
    </>
  );
}
