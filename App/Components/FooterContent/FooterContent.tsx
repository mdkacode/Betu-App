import React, { useContext, useEffect } from 'react';
import { ApplicationContext, ApplicationConumer } from '../../Modules/context';
import {
  Container,
  AppView,
  IconImage,
} from '../../Modules/GlobalStyles/GlobalStyle';
import { TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';

interface FooterContent {
  action?: any;
  isRefresh: boolean;
}
const FooterContent = (props: FooterContent) => {
  useEffect(() => {
    console.log('Hello');
    console.log(props.isRefresh);
  }, [props.isRefresh]);
  let storeData = useContext(ApplicationContext);
  console.log(storeData.productList.length);
  console.log('qwertyuytrewessrty');
  return (
    <Container>
      <TouchableOpacity onPress={(e) => props.action('Home')}>
        <AppView marginLeft={10} items={5}>
          <IconImage
            source={require('../../assets/images/icons/home.png')}
            width={30}
            height={30}
          />
        </AppView>
      </TouchableOpacity>
      <AppView items={5}>
        <IconImage
          source={require('../../assets/images/icons/heart.png')}
          width={30}
          height={30}
        />
      </AppView>
      <TouchableOpacity onPress={() => props.action('Cart')}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/cart.png')}
            width={30}
            height={30}
          />

          {storeData.productList.length != (0 || 1) && (
            <Badge
              status="error"
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              value={storeData.productList.length - 1}
            />
          )}
        </AppView>
      </TouchableOpacity>
      <TouchableOpacity onPress={(e) => props.action('LocationModal')}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/list.png')}
            width={30}
            height={30}
          />
        </AppView>
      </TouchableOpacity>
      <TouchableOpacity onPress={(e) => props.action('UserProfile')}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/user.png')}
            width={30}
            height={30}
          />
        </AppView>
      </TouchableOpacity>
    </Container>
  );
};

export default FooterContent;
