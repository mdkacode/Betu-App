import React, { useEffect, useState, useContext, Suspense } from 'react';
import { View, Alert } from 'react-native';
import { LayoutContainer } from '../../Modules/GlobalStyles/GlobalStyle';
import ListProduct from '../../Components/ListProduct/ListProduct';
import MainAppFooter from '../AppFooter/AppFooter';
import Axios from 'axios';
import { ApplicationContext } from '../../Modules/context';
import { serverIP } from '../../constant';
import SearchStoreLoader from '../../Loaders/SearchStoreLoader';
import Nodata from '../../Loaders/noData';
import AsyncStorage from '@react-native-community/async-storage';
import FilterProducts from '../FilterProducts/FilterProducts';

interface totalValue {
  discount: number;
  totalPrice: number;
}
const Products = ({ navigation }) => {
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
      // console.log('fsf', getData.shopId);
      try {
        let allProductList = await AsyncStorage.getItem('@allProducts');
        let parseAllProduct = JSON.parse(allProductList);
        // console.log('GET PRODUCTS H');
        // console.log(parseAllProduct.data);

        let filteredProduct = await parseAllProduct.data.products.filter((item) => getData.category._id === item.cIds)
        console.log('GET ALL PRODUCT AND FILTER THEM', filteredProduct);
        setProductList(filteredProduct);
        Loader(false);
      } catch (error) {
        console.log("GETTING EROROROROR", error);
      }
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
      // console.log(getData.productList);
    }
  });
  const getValueHere = () => {
    let totalPrice = 0;
    let discount = 0;
    getData.productList.forEach((e) => {
      e && e.price && (discount += (e.price.mrp - e.price.sp) * e.quantity);
      e && e.price && (totalPrice += e.price.sp * e.quantity);
    });
    setTotal({ discount, totalPrice });
  };

  return (
    <Suspense fallback={<SearchStoreLoader />}>
      {isLoader && <SearchStoreLoader />}
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ paddingBottom: 100 }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flexDirection: 'column', paddingBottom: 50 }}>
          {productList.length > 0 ? < FilterProducts elements={productList} navigation={navigation} isFooter={'show'} />

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
