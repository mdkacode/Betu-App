import styled from 'styled-components/native';
import { Dimensions, ViewProps } from 'react-native';
import { LightColor } from '../../Modules/GlobalStyles/GlobalColors';
// Global App Width and Height
const windowWidth = Dimensions.get('window').width;
//  const windowHeight = Dimensions.get('window').height;
export const LayoutContainer = styled.ScrollView`
  flex: 1;
  background-color: #eeeeee;
  flex-direction: column;
  margin-top: 15px;
`;

export const TextBox = styled.TextInput`
  width: ${windowWidth - 15}px;
  padding-left: 12px;
  font-size: 19px;
  font-weight: 900;
  font-family: 'OpenSans-Bold';
  /* border-radius: 15px;
  border: 2px solid #eee;
  box-shadow: 0 0 80px #d5d5d5; */
`;

export const PrimaryButton = styled.Button`
  color: palevioletred;
  font-size: 1px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Container = styled.View`
  flex-direction: row;
`;

// Define Props here

interface circleImages {
  marginLeft?: number;
  height?: number;
  width?: number;
}
