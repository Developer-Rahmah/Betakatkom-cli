import React from "react";
import styled from "styled-components/native";
import { Colors } from "Cards/assets/styles/Colors";

export const MainContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${Colors.WHITE};
`;

export const MainView: React.FC = (props) => {
  return <MainContainer>{props.children}</MainContainer>;
};
