import React, {useContext, useEffect} from 'react';
import {ApplicationContext} from '../../Modules/context';
import {
  Container,
  AppView,
  IconImage,
} from '../../Modules/GlobalStyles/GlobalStyle';
import {TouchableOpacity, Alert} from 'react-native';

interface FooterContent {
  action?: any;
  isRefresh?: boolean;
}
const FooterContent = (props: FooterContent) => {
  useEffect(() => {
    console.log('Hello');
    console.log(props.isRefresh);
  }, [props.isRefresh]);
  let storeData = useContext(ApplicationContext);

  console.log('qwertyuytrewessrty');
  const cartAction = () => {
    console.log(
      storeData.productList,
      'UPDATE PRODUCT LIST',
      storeData.productList.length,
    );
    storeData.productList.length > 0
      ? props.action('Cart')
      : Alert.alert('Please Add Product');
    console.log('GET VALUE', storeData.productList.length);
  };
  return (
    <Container>
      <TouchableOpacity onPress={() => props.action('Home')}>
        <AppView marginLeft={10} items={5}>
          <IconImage
            source={require('../../assets/images/icons/home.png')}
            width={30}
            height={30}
          />
        </AppView>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.action('FilterProducts')}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/search-white.png')}
            width={30}
            height={30}
          />
        </AppView>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cartAction()}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/cart.png')}
            width={30}
            height={30}
          />

          {/* {storeData.productList.length != (0 || 1) && (
            <Badge
              status="error"
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              value={storeData.productList.length - 1}
            />
          )} */}
        </AppView>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.action('LocationModal')}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/list.png')}
            width={30}
            height={30}
          />
        </AppView>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.action('UserProfile')}>
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
