import React, {useEffect, useState, useContext, Suspense} from 'react';
import {View} from 'react-native';
import {LayoutContainer} from '../../Modules/GlobalStyles/GlobalStyle';
import ListProduct from '../../Components/ListProduct/ListProduct';
import MainAppFooter from '../AppFooter/AppFooter';
import Axios from 'axios';
import {ApplicationContext} from '../../Modules/context';
import {serverIP} from '../../constant';
import SearchStoreLoader from '../../Loaders/SearchStoreLoader';
import Nodata from '../../Loaders/noData';
import AsyncStorage from '@react-native-community/async-storage';

interface totalValue {
  discount: number;
  totalPrice: number;
}
const Products = ({navigation}) => {
  const getData = useContext(ApplicationContext);
  const [isLoader, Loader] = useState(false);
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState({
    discount: 0,
    totalPrice: 0,
  } as totalValue);
  const [refresh] = useState(false);

  useEffect(() => {
    (async function () {
      let storeId = await AsyncStorage.getItem('ShopId');
      productList.length === 0 && Loader(true);
      console.log('fsf', getData.shopId);
      Axios({
        method: 'GET',
        url: `${serverIP}/api/ShopProducts/namelist?_id=${storeId}&products.cIds=${getData.category._id}`,
      })
        .then((prod: any) => {
          console.log('GET STORE DATA HERE !!', getData.productList);
          console.log('GET FORIEGN VALUE !!', prod.data.products);
          setProductList(prod.data.products);
          Loader(false);
        })
        .catch((e: any) => {
          console.log(e);
          Loader(false);
        });
    })();
  }, [
    getData.category._id,
    getData.productList,
    getData.shopId,
    getData.storeId,
    productList.length,
  ]);
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
    <Suspense fallback={<SearchStoreLoader />}>
      {isLoader && <SearchStoreLoader />}
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{paddingBottom: 100}}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flexDirection: 'column', paddingBottom: 50}}>
          {productList.length > 0
            ? productList.map((e) => (
                <ListProduct elements={e} refresh={() => getValueHere()} />
              ))
            : !isLoader && <Nodata navigation={navigation} topic="Product" />}
        </View>
      </LayoutContainer>
      <MainAppFooter
        action={total}
        isMain={{
          isMain: total.totalPrice == 0 ? true : false,
          navigation: navigation,
        }}
      />
    </Suspense>
  );
};

export default Products;
