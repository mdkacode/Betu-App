import React from 'react';
import { RowView, Container } from '../../Modules/GlobalStyles/GlobalStyle';
import { View } from 'react-native';
import {
  RupeeSymbol,
  ThemeYellow,
  Darkest,
} from '../../Modules/GlobalStyles/GlobalColors';
import AppButton from '../Button/Button';
import { DeviceWidth } from '../DeviceDeminsions/DeviceDeminsions';

interface ActionProps {
  navigation: any;
}

const FooterActionContent = (props: ActionProps) => {
  let { navigation } = props;
  const orderCheck = () => {
    console.log(JSON.stringify(navigation), 'GET');
    navigation.navigate('PaymentSuccess');
  };
  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          margin: 2,
          minWidth: DeviceWidth,
        }}>
        <View style={{ flexDirection: 'column' }}>
          <>
            <RowView fontFormat={'Normal'}>
              TOTAL: {` ${RupeeSymbol} 569`}
            </RowView>
            <RowView fontFormat={'Italic'} fontize={15} fontColor={ThemeYellow}>
              Saving: {` ${RupeeSymbol} 59`}
            </RowView>
          </>
        </View>

        <AppButton
          key="WishlistButton"
          borderd={true}
          backgroundColor={ThemeYellow}
          fontColor={Darkest}
          content="Proceed to Pay"
          action={() => orderCheck()}
        />
      </View>
    </Container>
  );
};

export default FooterActionContent;
