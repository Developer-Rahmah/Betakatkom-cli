import {Colors} from 'Cards/assets/styles/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'Cards/src/services/helper/Constant';
import styled from 'styled-components/native';

export interface IOrangeIndicatorProps {
  width: string;
}
export interface IButtonProps {
  onPress: () => void;
  isSelected: boolean;
}

export const ContainerView = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
`;

export const ImageAndTextContainer = styled.View`
  flex: 0.5;
`;

export const CarouselContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const SliderTitleContainer = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 5px;
`;
export const BtnIndicatorAndSkipContainer = styled.View`
  flex: 0.4;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${SCREEN_HEIGHT / 11}px;
`;

export const GrayIndicator = styled.View`
  background-color: ${Colors.LIGHT_GRAY};
  width: ${SCREEN_WIDTH / 3}px;
  margin-vertical: 20px;
  border-radius: 5px;
`;
export const OrangeIndicator = styled.View<IOrangeIndicatorProps>`
  width: ${(props) => props.width};
  background-color: ${Colors.PURPLE};
  height: 7px;
  border-radius: 10px;
`;
export const SkipContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const ImageCarousel = styled.Image`
  width: 100%;
  height: 205px;
  border-radius: 20px;
`;
export const SectionHeader = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding-vertical: 10px;
`;
export const MoreTxtContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
