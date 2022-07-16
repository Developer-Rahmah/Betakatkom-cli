import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'Cards/assets/styles/Colors';
import Title from 'Cards/src/components/Title';
import IconImage from 'Cards/src/components/IconImage';
import { GridCardContainer, GridCardImage, Button, Card, CardContainer } from './ComponentStyled';
import { useNavigation } from '@react-navigation/native';
import General from 'Cards/assets/styles/General';
import Zain from "Cards/assets/images/zain.png";
import Orange from "Cards/assets/images/orange.png";
import Umniah from "Cards/assets/images/u.png";
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import { fontSize } from 'styled-system';
import StepIndicator from 'react-native-step-indicator';
import { SCREEN_WIDTH } from '../services/helper/Constant';


const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: Colors.PURPLE,
  separatorUnFinishedColor: Colors.LIGHT_PURPLE,
  stepIndicatorFinishedColor: Colors.PURPLE,
  stepIndicatorUnFinishedColor: Colors.LIGHT_PURPLE,
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  stepStrokeCurrentColor: Colors.PURPLE,
  currentStepLabelColor: Colors.PURPLE,
};
const Step = ({
  currentPage,
  labels
}: {
    currentPage:number;
    labels:string[]
}) => {
  const navigation = useNavigation();
  
  const renderLabel = ({
    position,
    label,
    currentPosition,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    );
  };
  return (
    <StepIndicator
      customStyles={firstIndicatorStyles}
      currentPosition={currentPage}
      labels={labels}
      renderLabel={renderLabel}
      stepCount={4}

    />
  );
};

export default Step;


const styles = StyleSheet.create({
 
  stepIndicator: {
    paddingTop: 45,
    width: SCREEN_WIDTH
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.BLACK,
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.PURPLE,
  },
  padding: { padding: 10 },
  marginVertical: {
    marginVertical: 10,
  }



});