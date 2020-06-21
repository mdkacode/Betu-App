import React, {useState, useContext, useEffect} from 'react';
import {AppFooter} from './AppFooter.interface';
import {Dimensions} from 'react-native';
import FooterContent from '../../Components/FooterContent/FooterContent';
import FooterActionContent from '../../Components/FooterActionContent/FooterActionContent';
import {ApplicationContext, ApplicationConumer} from '../../Modules/context';
const windowWidth = Dimensions.get('window').width;
interface FooterProps {
  isMain: any;
  action?: any;
  count?: number;
}
const MainAppFooter = (props: FooterProps) => {
  const context = useContext(ApplicationContext);
  let {isMain, action} = props;
  useEffect(() => {});
  const move = (e) => {
    isMain.navigation.navigate(e);
  };

  return (
    <AppFooter width={windowWidth} height={50}>
      {isMain.isMain && (
        <FooterContent isRefresh={true} action={(e) => move(e)} />
      )}
      {!isMain.isMain && (
        <FooterActionContent
          action={action}
          values={0} // need to put check
          navigation={isMain.navigation}
        />
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
