import React, {useContext, useState} from 'react';
import {RowText, Container} from '../../Modules/GlobalStyles/GlobalStyle';
import {View, Alert, YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import Modal from 'react-native-modal';
import {ApplicationContext, ApplicationConumer} from '../../Modules/context';
// import RazorpayCheckout from 'react-native-razorpay';
import RNUpiPayment from 'react-native-upi-payment';

import {
  RupeeSymbol,
  ThemeYellow,
  Darkest,
} from '../../Modules/GlobalStyles/GlobalColors';
import AppButton from '../Button/Button';
import utils from '../../utils';
import {DeviceWidth} from '../DeviceDeminsions/DeviceDeminsions';
import AnimationComponent from '../../Modules/AnimationComponent';
import cartServices from '../../services/cart.api';

interface ActionProps {
  navigation: any;
  action?: any;
  values?: any;
}

// activate if started using payment gateway START
// var options = {
//   description: 'Payment Towords Products',
//   image: 'https://i.imgur.com/3g7nmJC.png',
//   currency: 'INR',
//   key: 'rzp_test_sfcN0wDTOHTBZD',
//   amount: '1000',
//   name: 'Mayank Dwivedi',
//   prefill: {
//     email: 'void@razorpay.com',
//     contact: '919936142128',
//     name: 'Test',
//   },
//   theme: {color: '#fff'},
// };

const FooterActionContent = (props: ActionProps) => {
  let [isPayment, setPayment] = useState(false);
  let propsData = useContext(ApplicationContext);
  let [cartTotal, setCartTotal] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  let [cartSaving, setCartSaving] = useState(0);

  let {navigation, action} = props;
  const payment = async (mode: string) => {
    if (mode === 'cod') {
      propsData.paymentStatus = true; // for maiking success Screen
     
      let productInfo = utils.transformArray(propsData.productList);
      let getuserId = await AsyncStorage.getItem('@userPhone');
      productInfo.map((ele: object) => {
        if (ele.storeId) {
          ele.tranasctionNumber = '';
          ele.method = 'cod';
          ele.orderDate = new Date();
        }
      });
      let masterProd = productInfo;
      let responseData = await cartServices.addOrder(getuserId, ...masterProd);
      propsData.productList = [];
      setPayment(false);
      navigation.navigate('PaymentSuccess');
    } else {
      RNUpiPayment.initializePayment(
        {
          vpa: '8871963339@ybl', // or can be john@ybl or mobileNo@upi
          payeeName: 'Khusboo Sharma',
          amount: cartTotal > 500 ? cartTotal : cartTotal + 10,
          transactionRef: 'qwere23qwea23',
          transactionNote: 'Khusboo Store',
        },
        successCallback,
        failureCallback,
      );
    }
  };
  function successCallback() {}
  const failureCallback = async (data: any) => {
    if (data.Status == 'SUCCESS') {
      setPayment(false);

      propsData.paymentStatus = true; // for maiking success Screen
      let productInfo = utils.transformArray(propsData.productList);
      let getuserId = await AsyncStorage.getItem('@userPhone');

      productInfo.map((ele: object) => {
        if (ele.storeId) {
          ele.tranasctionNumber = data.txnId;
          ele.method = 'UPI';
          ele.orderDate = new Date();
        }
      });
      let masterProd = productInfo;
      masterProd.shift();
      let responseData = await cartServices.addOrder(getuserId, ...masterProd);

      propsData.productList = [];

      navigation.navigate('PaymentSuccess');
    } else {
      //setting database THing Here Start
      //setting database THing Here END
      propsData.paymentStatus = false; // for maiking Failure Screen
      let productInfo = utils.transformArray(propsData.productList);
      let getuserId = await AsyncStorage.getItem('@userPhone');

      productInfo.map((ele: object) => {
        if (ele.storeId) {
          ele.tranasctionNumber = '';
          ele.method = '';
          ele.orderDate = new Date();
        }
      });
      let masterElements = productInfo;
      masterElements.shift();
      let responseData = await cartServices.addOrder(
        getuserId,
        ...masterElements,
      );

      // setPayment(false);
      // navigation.navigate('PaymentSuccess');  // avoid navigation to main screen
    }
  };

  const orderCheck = () => {
    setIsLoading(true);

    setCartTotal(0);
    let total = 0;
    let totalSaving = 0;

    propsData.productList.map((element: object, index: number) => {
      if (element.price && element.quantity > 0) {
        total += parseInt(element.price.sp) * parseInt(element.quantity);
        totalSaving += parseInt(element.price.mrp) * parseInt(element.quantity);
      }
      if (index === propsData.productList.length - 1) {
        setCartTotal(total);
        setCartSaving(totalSaving);
      }
    });

    if (total > 1) {
      setPayment(true);
      setIsLoading(false);
    } else {
      Alert.alert('No product Added');
      setIsLoading(false);
    }

    // navigation.navigate('PaymentLayout');
    //
    // RazorpayCheckout.open(options)
    //   .then((data) => {
    //     // handle success
    //     //
    //     propsData.paymentStatus = true;
    //     navigation.navigate('PaymentSuccess');
    //   })
    //   .catch((error: any) => {
    //     // handle failure
    //     propsData.paymentStatus = false;
    //     //
    //     navigation.navigate('PaymentSuccess');
    //   });
  };

  const loading = (
    <AnimationComponent
      isLoop={true}
      isAutoPlay={true}
      animationPath={'loading'}
    />
  );
  const paymentModal = () => (
    <React.Suspense fallback={loading}>
      <Modal
        isVisible={isPayment}
        // animationInTiming={200}
        // animationOutTiming={200}
        // backdropTransitionInTiming={200}
        // backdropTransitionOutTiming={200}
      >
        {cartSaving - cartTotal > 0 && (
          <>
            <RowText
              fontize={20}
              fontFormat="Italic"
              style={{
                alignSelf: 'center',
                top: -100,
              }}>{`Saving ${RupeeSymbol} ${cartSaving - cartTotal}`}</RowText>
            <RowText
              fontize={20}
              fontFormat="Italic"
              style={{alignSelf: 'center', color: ThemeYellow, top: -100}}>
              -----------
            </RowText>
          </>
        )}
        {cartTotal < 500 && (
          <RowText
            fontize={20}
            fontFormat="Italic"
            style={{
              alignSelf: 'center',
              top: -100,
            }}>{`Delivery  ${RupeeSymbol} 10`}</RowText>
        )}
        <RowText
          fontize={20}
          fontFormat="Italic"
          style={{
            alignSelf: 'center',
            top: -100,
          }}>{`+ Total  ${RupeeSymbol} ${cartTotal}`}</RowText>
        <RowText
          fontize={54}
          style={{alignSelf: 'center', top: -100}}>{` ${RupeeSymbol} ${
          cartTotal > 500 ? cartTotal : cartTotal + 10
        }`}</RowText>
        <View style={{paddingBottom: 10}}>
          <Button
            onPress={() => payment('upi')}
            titleStyle={{color: Darkest}}
            buttonStyle={{backgroundColor: ThemeYellow}}
            title="Pay Through UPI"
          />
        </View>
        <View style={{paddingBottom: 10}}>
          <Button
            onPress={() => payment('cod')}
            type="outline"
            titleStyle={{color: ThemeYellow}}
            buttonStyle={{borderColor: ThemeYellow}}
            title="Cash On delivery"
          />
        </View>
        <View style={{paddingBottom: 10, bottom: 0}}>
          <Button
            type="outline"
            titleStyle={{color: '#fff'}}
            buttonStyle={{borderColor: '#fff', elevation: 20}}
            onPress={() => setPayment(false)}
            title="Close"
          />
        </View>
      </Modal>
    </React.Suspense>
  );

  return (
    <React.Suspense fallback={loading}>
      <ApplicationConumer>
        {(productList) =>
          isPayment ? (
            paymentModal()
          ) : (
            <Container>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 2,
                  minWidth: DeviceWidth,
                }}>
                <View style={{flexDirection: 'column'}} />

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
          )
        }
      </ApplicationConumer>
    </React.Suspense>
  );
};

export default FooterActionContent;
