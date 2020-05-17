import styled from 'styled-components/native';
import { DeviceWidth } from './../../Components/DeviceDeminsions/DeviceDeminsions';

export const Textinput = styled.TextInput`
  height: ${(p: InputProps) => p.itemHeight || 0}px;
  width: ${(p: InputProps) => p.itemWitdh || DeviceWidth}px;
  color: black;
  font-size: 22;
  margin-bottom: 10;
  letter-spacing: ${(p: InputProps) => p.letterSpace || 0};
  border-radius: 4;
  font-family: 'OpenSans-Bold';
  background-color: white;
  border-width: 0;
`;

interface InputProps {
    itemWitdh?: number;
    itemHeight?: number;
    letterSpace?: number;
}
