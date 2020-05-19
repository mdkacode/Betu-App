import React, {useState} from 'react';
import {AppFooter} from './AppFooter.interface';
import {Dimensions} from 'react-native';
import {Badge} from 'react-native-elements';
import {
  Container,
  AppView,
  IconImage,
} from '../../Modules/GlobalStyles/GlobalStyle';
import {TouchableOpacity} from 'react-native';
import FooterContent from '../../Components/FooterContent/FooterContent';
import FooterActionContent from '../../Components/FooterActionContent/FooterActionContent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface FooterProps {
  isMain: any;
  action?: any;
}
const MainAppFooter = (props: FooterProps) => {
  let {isMain, action} = props;

  const move = (e) => {
    console.log('get Value', e);
    isMain.navigation.navigate(e);
  };

  return (
    <AppFooter width={windowWidth} height={50}>
      {isMain.isMain && <FooterContent action={(e) => move(e)} />}
      {!isMain.isMain && (
        <FooterActionContent action={action} navigation={isMain.navigation} />
      )}

      {/* <FooterCircle ><RowView fontColor="black" > <IconImage
      source={require('../../assets/images/icons/shop.png')}
      width={40}
      height={40}
      marginLeft={"1"}
    /></RowView></FooterCircle> */}
    </AppFooter>
  );
};

export default MainAppFooter;
