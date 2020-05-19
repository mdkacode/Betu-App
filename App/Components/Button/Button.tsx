import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import {Button} from 'react-native-elements';
import {RowView} from '../../Modules/GlobalStyles/GlobalStyle';
import {Darkest, ThemeYellow} from '../../Modules/GlobalStyles/GlobalColors';
import {DeviceWidth} from '../DeviceDeminsions/DeviceDeminsions';

interface ButtonProps {
  content?: string;
  key: string;
  backgroundColor?: string;
  fontColor?: string;
  borderd?: boolean;
  marginleft?: number;
  btnWidth?: number;
  isDisable?: boolean;
  marginRight?: number;
  action?: (any) => any;
}
/**
 *
 * @param props Define All
 */
const AppButton = (props: ButtonProps) => {
  let {
    btnWidth,
    borderd,
    action,
    fontColor,
    backgroundColor,
    content,
    marginRight,
    isDisable,
    marginleft,
  } = props;
  switch (borderd) {
    case true:
      return (
        <Button
          onPress={action}
          disabled={isDisable}
          containerStyle={{marginLeft: marginleft || 'auto'}}
          type="outline"
          title={
            <RowView fontize={14} fontColor={fontColor || ThemeYellow}>
              {content}
            </RowView>
          }
          // eslint-disable-next-line react-native/no-inline-styles
          buttonStyle={{
            width: btnWidth ? btnWidth : DeviceWidth / 2,
            padding: 7,
            margin: 2,
            marginRight: marginRight || 0,
            backgroundColor: backgroundColor || Darkest,
          }}
        />
      );

    default:
      return '';
  }
};

export default AppButton;
