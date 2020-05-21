import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

// Global Style

export const AppView = styled.View`
  width: ${(p: viewProps) => (p.width ? p.width : 0)}px;
  height: ${(p: viewProps) => (p.height ? p.height : 0)}px;
  /* margin-top: ${(p: viewProps) => (p.top ? p.top : 0)}px; */
  align-items: ${(p: viewProps) => (p.iPosition ? p.iPosition : 'flex-start')};
  margin-top: ${(p: viewProps) => (p.marginHeight ? p.marginHeight : 15)}px;
  /* position:absolute; */
  margin-right: ${(p: viewProps) => (p.items ? windowWidth / p.items : 0)}px;
  padding-left: ${(p: viewProps) => (p.marginLeft ? p.marginLeft : 0)}px;
`;

export const RowText = styled.Text`
  padding-left: ${(p: textProps) => (p.paddingLeft ? p.paddingLeft : 0)}px;
  padding-right: ${(p: textProps) => (p.paddingRight ? p.paddingRight : 0)}px;
  padding-top: ${(p: textProps) => (p.padding ? p.padding : 0)}px;
  text-decoration: ${(p: textProps) => (p.cut ? 'line-through' : '')};
  padding-bottom: ${(p: textProps) => (p.padding ? p.padding : 0)}px;
  font-size: ${(p: textProps) => (p.fontize ? p.fontize : 20)}px;
  font-weight: 100;
  /* text-align:center; */
  margin-left: ${(p: textProps) => (p.paddingLeft ? p.paddingLeft : 0)}px;
  color: ${(p: textProps) => (p.fontColor ? p.fontColor : 'white')};
  font-family: ${(p: textProps) =>
    p.fontFormat === 'Italic'
      ? 'OpenSans-Italic'
      : p.fontFormat === 'Normal'
      ? 'OpenSans'
      : 'OpenSans-Bold'};
`;

export const HorizontalViewScroll = styled.ScrollView`
  width: ${(p: viewProps) => (p.width ? p.width : 0)}px;
  height: ${(p: viewProps) => (p.height ? p.height : 0)}px;
  margin-top: ${(p: viewProps) => (p.top ? p.top : 0)}px;
  align-items: ${(p: viewProps) => (p.iPosition ? p.iPosition : 'flex-start')};
  margin-top: 15px;
  margin-right: ${(p: viewProps) => (p.items ? windowWidth / p.items : 0)}px;
  padding-left: ${(p: viewProps) => (p.marginLeft ? p.marginLeft : 0)}px;
`;

export const IconImage = styled.Image`
  width: ${(p: IconImage) => p.width}px;
  height: ${(p: IconImage) => p.height}px;
  margin: ${(p: IconImage) => p.margin || 0}px;
`;

export const LayoutContainer = styled.ScrollView`
  flex: 1;
  background-color: #eeeeee;
  flex-direction: column;
  margin-top: ${(p: layoutProps) => p.marginTop || 15}px;
`;

export const CircleArea = styled.View`
  /* border-radius: 6px; */
  /* border-width:1px; */
  margin-right: ${windowWidth / 10}px;
  height: ${(p: circleImages) => p.height || 0}px;
  margin-left: ${(p: circleImages) => p.marginLeft || 0}px;
  /* border-color:#1D65a6; */
`;

export const TextLocalInput = styled.TextInput`
  width: 100;
`;

interface IconImage {
  width?: number;
  height?: number;
  margin?: number;
  marginLeft?: string;
}
interface viewProps {
  width?: number;
  height?: number;
  marginLeft?: number;
  top?: number;
  items?: number;
  iPosition?: string;
}

interface textProps {
  fontColor: string;
  paddingLeft?: number;
  padding?: number;
  cut?: boolean;
  fontFormat?: string;
  fontize?: number;
  paddingRight?: number;
}

interface viewProps {
  width?: number;
  height?: number;
  marginLeft?: number;
  marginHeight?: number;
  top?: number;
  items?: number;
  iPosition?: string;
}

interface circleImages {
  marginLeft?: number;
  height?: number;
  width?: number;
}

interface layoutProps {
  marginTop?: number;
}
