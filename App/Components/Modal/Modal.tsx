import React from 'react';
import styled from 'styled-components/native';

export const Modal = () => {
  return <Container animated={false} transparent={true} />;
};

const Container = styled.Modal`
  width: 100%;
  height: 20px;
  align-items: flex-end;
`;
