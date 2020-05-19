import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {LayoutContainer} from '../../Modules/GlobalStyles/GlobalStyle';
import ListProduct from '../../Components/ListProduct/ListProduct';
import MainAppFooter from '../AppFooter/AppFooter';
import Axios from 'axios';
import {ApplicationContext} from '../../Modules/context';
import {serverIP} from '../../constant';

interface totalValue {
  discount: number;
  totalPrice: number;
}
const Products = ({navigation}) => {
  const getData = useContext(ApplicationContext);

  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState({
    discount: 0,
    totalPrice: 0,
  } as totalValue);
  const [refresh] = useState(false);
  useEffect(() => {
    console.log('fsf', getData.shopId);
    Axios({
      method: 'GET',
      url: `${serverIP}/api/ShopProducts/namelist?_id=${getData.shopId.shopId}&products.cIds=${getData.category._id}`,
    }).then((prod: any) => {
      console.log('GET STORE DATA HERE !!', getData.productList);
      console.log('GET FORIEGN VALUE !!', prod.data.products);
      setProductList(prod.data.products);
    });
  }, []);
  useEffect(() => {
    if (refresh) {
      console.log(getData.productList);
    }
  });
  const getValueHere = () => {
    let totalPrice = 0;
    let discount = 0;
    getData.productList.forEach((e) => {
      e && e.price && (discount += (e.price.mrp - e.price.sp) * e.quantity);
      e && e.price && (totalPrice += e.price.sp * e.quantity);
    });
    setTotal({discount, totalPrice});
  };

  return (
    <React.Fragment>
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{paddingBottom: 100}}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flexDirection: 'column', paddingBottom: 50}}>
          {productList.map((e) => (
            <ListProduct elements={e} refresh={() => getValueHere()} />
          ))}
        </View>
      </LayoutContainer>
      <MainAppFooter
        action={total}
        isMain={{
          isMain: total.totalPrice == 0 ? true : false,
          navigation: navigation,
        }}
      />
    </React.Fragment>
  );
};

export default Products;
