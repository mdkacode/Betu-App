import React, {useState} from 'react';
import {AppFooter} from './AppFooter.interface';
import {Dimensions} from 'react-native';
import FooterContent from '../../Components/FooterContent/FooterContent';
import FooterActionContent from '../../Components/FooterActionContent/FooterActionContent';
const windowWidth = Dimensions.get('window').width;
interface FooterProps {
  isMain: any;
  action?: any;
}
const MainAppFooter = (props: FooterProps) => {
  let {isMain, action} = props;

  const move = (e) => {
    // console.log('get Value', e);
    isMain.navigation.navigate(e);
  };

  return (
    <AppFooter width={windowWidth} height={50}>
      {isMain.isMain && <FooterContent action={(e) => move(e)} />}
      {!isMain.isMain && (
        <FooterActionContent action={action} navigation={isMain.navigation} />
      )}

      {/* <FooterCircle ><RowText fontColor="black" > <IconImage
      source={require('../../assets/images/icons/shop.png')}
      width={40}
      height={40}
      marginLeft={"1"}
    /></RowText></FooterCircle> */}
    </AppFooter>
  );
};

export default MainAppFooter;
