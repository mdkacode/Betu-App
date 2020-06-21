import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const ImageOverlay = (props: ImageProps) => {
  return (
    <Imageackground
      imageStyle={{borderRadius: 2}}
      source={{
        uri: props.cardImage,
      }}>
      <ViewArea>
        <TextField>{props.cardText}</TextField>
      </ViewArea>
    </Imageackground>
  );
};
export default ImageOverlay;

const Imageackground = styled.ImageBackground`
  flex: 1;
  height: ${width * 0.25 + 10}px;
  width: ${width * 0.25}px;
  justify-content: flex-end;
  align-items: center;
`;
const TextField = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 12px;
  align-items: center;
`;
const ViewArea = styled.View`
  opacity: 0.7;
  color: #000000;
  align-items: center;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;

  width: 100%;
  background-color: #000000;
`;

interface ImageProps {
  cardImage: string;
  cardText: string;
  cardsubText?: string;
}
