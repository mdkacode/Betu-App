import React, {useRef} from 'react';
import {LayoutContainer, RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import {View, Animated, Keyboard} from 'react-native';
import AnimationComponent from '../../Modules/AnimationComponent';
import {ToastAndroid} from 'react-native';
import {DeviceWidth} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import AppButton from '../../Components/Button/Button';
import {ThemeYellow, Darkest} from '../../Modules/GlobalStyles/GlobalColors';
import {Textinput} from './Gatekeeper.style';

const GateKeeper = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const SubmitOTP = () => {
    navigation.navigate('Home', {
      name: `Welcome Mayank`,
    });
  };
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const dismissKeyboard = (text: string) => {
    if (text.length === 10) {
      Keyboard.dismiss();
      fadeIn();
      ToastAndroid.showWithGravity(
        'OTP Sent.',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else {
      fadeOut();
    }
  };
  return (
    <>
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        style={{backgroundColor: '#eeeee'}}>
        <View style={{alignItems: 'center'}}>
          <AnimationComponent
            height={170}
            isLoop={false}
            fileName={'Login.json'}
            isAutoPlay={true}
          />
          <RowText
            fontColor="black"
            fontize={23}
            fontFormat="Italic"
            style={{marginBottom: 10}}>
            CHIKURU
          </RowText>
          <Textinput
            itemHeight={50}
            onChangeText={(text) => dismissKeyboard(text)}
            maxLength={10}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
          />
          <Animated.View
            style={[
              {
                opacity: fadeAnim, // Bind opacity to animated value
              },
            ]}>
            <Textinput
              itemHeight={50}
              placeholder="Enter OTP"
              onChangeText={(text) => dismissKeyboard(text)}
              maxLength={4}
              keyboardType="phone-pad"
            />
            <AppButton
              key="WishlistButton"
              borderd={true}
              backgroundColor={ThemeYellow}
              fontColor={Darkest}
              content={<RowText fontColor={'black'}>Submit</RowText>}
              btnWidth={DeviceWidth - 12}
              marginRight={10}
              marginleft={1}
              action={() => SubmitOTP()}
            />
          </Animated.View>
        </View>
      </LayoutContainer>
    </>
  );
};

export default GateKeeper;
