import React, { useContext, useState } from 'react';
import { RowText, Container } from '../../Modules/GlobalStyles/GlobalStyle';
import { View, Alert, YellowBox } from 'react-native';
import { Button } from "react-native-elements";
import Modal from 'react-native-modal';
import { ApplicationContext } from '../../Modules/context';
import RazorpayCheckout from 'react-native-razorpay';
import RNUpiPayment from 'react-native-upi-payment';
import {
  RupeeSymbol,
  ThemeYellow,
  Darkest,
} from '../../Modules/GlobalStyles/GlobalColors';
import AppButton from '../Button/Button';
import { DeviceWidth } from '../DeviceDeminsions/DeviceDeminsions';

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
  theme: { color: '#EEEEEE' },
};

const FooterActionContent = (props: ActionProps) => {
  let [isPayment, setPayment] = useState(false);
  let propsData = useContext(ApplicationContext);
  let sp = 0;
  let saving = 0;
  propsData.productList.map((e) => {
    if (e.price) {
      sp += e.price.sp;
      saving += e.price.mrp;
    }
  });

  let { navigation, action } = props;
  const upiPayment = () => {
    RNUpiPayment.initializePayment({
      vpa: '8871963339@ybl', // or can be john@ybl or mobileNo@upi
      payeeName: 'Khusboo Sharma',
      amount: '1',
      transactionRef: 'qwere23qwea23'
    }, successCallback, failureCallback);
  }
  function successCallback() {

  }
  function failureCallback(data: any) {
    console.log('FAILING STATE');
    if (data['Status'] == "SUCCESS") {
      console.log({ Status: "SUCCESS" });
      console.log({ txnId: data['txnId'] });
    }
    else {
      console.log({ Status: "FAILURE" })
      setPayment(false);
      navigation.navigate('PaymentSuccess');
    }

  }

  const orderCheck = () => {
    setPayment(true);
    // navigation.navigate('PaymentLayout');
    //console.log(JSON.stringify(navigation), 'GET');
    // RazorpayCheckout.open(options)
    //   .then((data) => {
    //     // handle success
    //     // console.log(`Success: ${data.razorpay_payment_id}`);
    //     propsData.paymentStatus = true;
    //     navigation.navigate('PaymentSuccess');
    //   })
    //   .catch((error: any) => {
    //     // handle failure
    //     propsData.paymentStatus = false;
    //     // console.log(`Error: ${error.code} | ${error.description}`);
    //     navigation.navigate('PaymentSuccess');
    //   });
  };

  const paymentModal = () => <Modal
    isVisible={isPayment}
    animationInTiming={200}
    animationOutTiming={200}
    backdropTransitionInTiming={200}
    backdropTransitionOutTiming={200}>
    <RowText fontize={54} style={{ alignSelf: "center", top: -100 }}>{` ${RupeeSymbol} 300`}</RowText>
    <RowText fontize={20} fontFormat="Italic" style={{ alignSelf: "center", top: -100 }}>{`Delivery ${RupeeSymbol} 5`}</RowText>
    <RowText fontize={20} fontFormat="Italic" style={{ alignSelf: "center", top: -100 }}>{`+ Total ${RupeeSymbol} 295`}</RowText>
    <View style={{ paddingBottom: 10 }}>
      <Button onPress={() => upiPayment()} titleStyle={{ color: Darkest }} buttonStyle={{ backgroundColor: ThemeYellow }} title="Pay Through UPI" />
    </View>
    <View style={{ paddingBottom: 10 }}>
      <Button onPress={() => upiPayment()} type="outline" titleStyle={{ color: ThemeYellow }} buttonStyle={{ borderColor: ThemeYellow }} title="Cash On delivery" />
    </View>
    <View style={{ paddingBottom: 10, bottom: 0 }}>
      <Button type="outline" titleStyle={{ color: "#fff" }} buttonStyle={{ borderColor: "#fff", elevation: 20 }} onPress={() => setPayment(false)} title="Close" />
    </View>


  </Modal>

  return (
    isPayment ? paymentModal() : <Container>
      <View
        style={{
          flexDirection: 'row',
          margin: 2,
          minWidth: DeviceWidth,
        }}>
        <View style={{ flexDirection: 'column' }}>
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
