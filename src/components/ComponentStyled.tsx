import { Colors } from 'Cards/assets/styles/Colors';
import styled from 'styled-components/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../services/helper/Constant';

export interface IGridCard {
  imgSource: string;
}
export const GridCardContainer = styled.ImageBackground`
  background-color: ${Colors.WHITE};
  margin: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
    width: ${SCREEN_WIDTH / 2.2};

`;
export const CardtypeContainer = styled.TouchableOpacity`
  margin: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: ${SCREEN_WIDTH};

`;
export const CardContainer = styled.ImageBackground`
  margin: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: ${SCREEN_WIDTH};

`;
export const GamingCardContainer = styled.View`
  padding: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: ${SCREEN_WIDTH / 2};

`;
export const ColumnCardContainer = styled.View`
  background-color: ${Colors.WHITE};
  margin: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: row;
  border_color: ${Colors.LIGHT_GRAY};
  border-width: 1px;
`;
export const GridCardImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 15px;
  
`;
export const GridView = styled.ImageBackground`
  width: 100%;
  height:${SCREEN_WIDTH / 3.7};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  
`;
export const Card = styled.ImageBackground`
  width: 90%;
  height:${SCREEN_HEIGHT / 6};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color:${Colors.secondaryColor}
  
`;
export const TouchableCard = styled.TouchableOpacity`
  width: 90%;
  height:${SCREEN_HEIGHT / 6};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color:${Colors.secondaryColor}
  
`;
export const SmallCard = styled.View`
  width: 100%;
  height:${80};
  border-radius: 0px;
  justify-content: flex-start;
  align-items: center;
  background-color:${Colors.secondaryColor};
  margin_top:-15;
  border-bottom-width: 2px;
  border-color: ${Colors.mainColor}
  

  
`;
export const ColumnCardImage = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 10px;
  flex: 0.8;
`;
export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-vertical: 5px;
  background-color: ${Colors.mainColor};
  border-radius: 5px;
`;
