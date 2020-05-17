import React from 'react';
import { LayoutContainer } from '../../Modules/GlobalStyles/GlobalStyle';
import ListProduct from '../../Components/ListProduct/ListProduct';
import MainAppFooter from '../AppFooter/AppFooter';
import { View } from 'react-native';

const AppCart = ({ navigation }) => {
  return (
    <React.Fragment>
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        style={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'column', paddingBottom: 50 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((e) => (
            <ListProduct />
          ))}
        </View>
      </LayoutContainer>
      <MainAppFooter isMain={{ isMain: false, navigation: navigation }} />
    </React.Fragment>
  );
};

export default AppCart;
