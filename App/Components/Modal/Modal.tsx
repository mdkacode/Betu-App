import React from 'react';
import styled from 'styled-components/native';
import {Alert} from 'react-native';

export const Modal = () => {
  return (
    <Container
      animated={true}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <TextField>Hello</TextField>
    </Container>
  );
};

const Container = styled.Modal`
  width: 100%;
  height: 20px;
  align-items: flex-end;
`;

const Header = styled.View`
  background: #333;
  opacity: 0.5;
  height: 150px;
`;

const Body = styled.View`
  background: #eaeaea;
  height: 900px;
`;
const TextField = styled.Text`
  font-size: 12px;
`;
