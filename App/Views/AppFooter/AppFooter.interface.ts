import styled from 'styled-components/native';
import { Dimensions,ScrollView,Text,View } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const AppFooter = styled.View`
  width: ${(p: viewProps) => (p.width ? p.width : 0)}px;
  height: ${(p: viewProps) => (p.height ? p.height : 0)}px;
  position: absolute;
  background-color: #192E5B;
  color:white;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  bottom: 0;
`;

export const FooterCircle = styled.View`
/* border-radius: 6px; */
/* border-width:1px; */
margin-right:${windowWidth/10}px;
height:${(p:circleImages) => (p.height || 0)}px;
margin-left:${(p:circleImages) => (p.marginLeft || 0)}px;
/* border-color:#1D65a6; */
`

interface circleImages {
    marginLeft?: number;
    height?: number;
    width?: number;
  }

interface viewProps {
    width?: number;
    height?: number;
    marginLeft?:number;
    top?: number;
    items?: number;
    iPosition?: string;
  }