import React, {useContext, useEffect} from 'react';
import {RowText, Container} from '../../Modules/GlobalStyles/GlobalStyle';
import {View, Alert} from 'react-native';
import _isNil from 'lodash/isNil';
import {ApplicationContext, ApplicationConumer} from '../../Modules/context';
import RazorpayCheckout from 'react-native-razorpay';
import {
  RupeeSymbol,
  ThemeYellow,
  Darkest,
} from '../../Modules/GlobalStyles/GlobalColors';
import AppButton from '../Button/Button';
import {DeviceWidth} from '../DeviceDeminsions/DeviceDeminsions';

interface ActionProps {
  navigation: any;
  action?: any;
}

var options = {
  description: 'Payment Towords Products',
  image: 'https://i.imgur.com/3g7nmJC.png',
  currency: 'INR',
  key: 'rzp_test_sfcN0wDTOHTBZD',
  amount: '1000',
  name: 'Mayank Dwivedi',
  prefill: {
    email: 'void@razorpay.com',
    contact: '919936142128',
    name: 'Test',
  },
  theme: {color: '#EEEEEE'},
};

const FooterActionContent = (props: ActionProps) => {
  let propsData = useContext(ApplicationContext);
  let sp = 0;
  let saving = 0;
  propsData.productList.map((e) => {
    if (e.price) {
      sp += e.price.sp;
      saving += e.price.mrp;
    }
  });
  useEffect(() => {
    //console.log(propsData.productList);
  });
  let {navigation, action} = props;
  const orderCheck = () => {
    //console.log(JSON.stringify(navigation), 'GET');
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        // console.log(`Success: ${data.razorpay_payment_id}`);
        propsData.paymentStatus = true;
        navigation.navigate('PaymentSuccess');
      })
      .catch((error: any) => {
        // handle failure
        propsData.paymentStatus = false;
        // console.log(`Error: ${error.code} | ${error.description}`);
        navigation.navigate('PaymentSuccess');
      });
  };
  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          margin: 2,
          minWidth: DeviceWidth,
        }}>
        <View style={{flexDirection: 'column'}}>
          <>
            <RowText fontFormat={'Normal'}>
              TOTAL: {` ${RupeeSymbol} ${action ? action.totalPrice : sp}`}
            </RowText>
            <RowText fontFormat={'Italic'} fontize={15} fontColor={ThemeYellow}>
              Saving:{' '}
              {` ${RupeeSymbol} ${action ? action.discount : saving - sp}`}
            </RowText>
          </>
        </View>

        <AppButton
          key="WishlistButton"
          borderd={true}
          isDisable={false}
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
