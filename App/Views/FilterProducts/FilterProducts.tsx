import React, {Suspense, useEffect, useState} from 'react';
import services from '../../services/products.api';
import _Debounce from 'lodash/debounce';
import {LayoutContainer, RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import ProductLoader from '../../Loaders/ProductLoader';
import {Textinput} from '../Gatekeeper/Gatekeeper.style';
import MainAppFooter from '../AppFooter/AppFooter';
import _uniqBy from 'lodash/uniqBy';
import ListProduct from '../../Components/ListProduct/ListProduct';
import {DeviceWidth} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import AsyncStorage from '@react-native-community/async-storage';
import SearchStoreLoader from '../../Loaders/SearchStoreLoader';
import {View} from 'react-native';

interface IFilterProps {
  isSearchBar?: boolean;
  isFooter?: string;
  productDetail?: ({}) => void;
  navigation?: any;
  elements?: any;
  isForeginData?: boolean;
}

const FilterProducts = (props: IFilterProps) => {
  let {
    isSearchBar,
    isFooter,
    productDetail,
    navigation,
    elements,
    isForeginData,
  } = props;
  let [productLoader, setproductLoader] = useState(false);
  let [masterProductList, setMasterProductList] = useState([]);
  let [constMasterProductList, setconstMasterProductList] = useState([]);
  // for getting the products on Load  START

  if (typeof elements !== 'object' || isForeginData == false) {
    useEffect(() => {
      console.log('WERTYUIOKJBVCDWERTYUIJHVCVGHUIUHGVCVGHIHVCHIHVCV');
      setproductLoader(true);
      const fetchProducts = async () => {
        // if (!isFooter) setlocalIsFooter(true);
        console.log('qwertyuiuytrewerthjhgfe');
        const lat = await AsyncStorage.getItem('@lat');
        const long = await AsyncStorage.getItem('@long');
        try {
          const localProductData = await AsyncStorage.getItem('@allProducts');
          let localProducts = JSON.parse(localProductData);
          if (localProducts.length === 0) {
            localProducts = await services.productsList(lat, long); // fetching API
          }
          console.log('localProductssdsdsddsdsd', localProducts);
          setMasterProductList(localProducts.data.products);
          setconstMasterProductList(localProducts.data.products);
          setproductLoader(false);
        } catch (e) {
          const products = await services.productsList(lat, long); // fetching API
          console.log('GET PRODUCTS');
          console.log(products.data.products);
          setMasterProductList(products.data.products);
          setconstMasterProductList(products.data.products);
          setproductLoader(false);
        }
      };
      fetchProducts();
    }, []);
  }
  // content Refrsh here
  const isResresh = () => {
    console.log('getme somewhere');
    // setAppCart(appCart++) => if wanted to add footer the add state and enable it
  };
  const filterProducts = (search: string) => {
    let searchedProducts = masterProductList.filter(function (hero: any) {
      let getName = hero.name && hero.name.toLowerCase();
      // let getAddress = hero.address.areaName;

      return getName.includes(search && search.toLowerCase());
      // ||getAddress.includes(search)
    });
    // /console.log(perSistData);
    setMasterProductList(
      search.length === 0 ? constMasterProductList : searchedProducts,
    );
  };
  //   content Refrsh here

  let listElements = isForeginData === false ? masterProductList : elements;
  console.log('GET ACTUAL CHECKDATA', isForeginData);
  return (
    <React.Suspense fallback={<RowText fontColor="black">Hello</RowText>}>
      <Textinput
        itemHeight={50}
        itemWitdh={DeviceWidth}
        onChangeText={_Debounce((text) => filterProducts(text), 100)}
        maxLength={13}
        style={{
          elevation: 10,
          marginBottom: -15,
          backgroundColor: '#fff',
          paddingBottom: 0,
          alignSelf: 'center',
        }}
        // defaultValue={userPhone}
        placeholder="Search Products..."
        // keyboardType="phone-pad"
      />
      {productLoader ? (
        <SearchStoreLoader />
      ) : (
        <LayoutContainer
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          marginTop={0}>
          <Suspense fallback={<ProductLoader />}>
            {listElements || masterProductList ? (
              _uniqBy(listElements || masterProductList, 'pId').map((e) => (
                <ListProduct
                  navigation={navigation}
                  refresh={() => isResresh()}
                  elements={e}
                />
              ))
            ) : (
              <RowText fontColor="black" fontFormat="Italic">
                No Product Found
              </RowText>
            )}
          </Suspense>
        </LayoutContainer>
      )}
      <View style={{bottom: 0}}>
        {isFooter !== 'show' && (
          <MainAppFooter isMain={{isMain: true, navigation: navigation}} />
        )}
      </View>
    </React.Suspense>
  );
};

export default FilterProducts;
