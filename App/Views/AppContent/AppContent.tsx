import React, {useContext, Suspense, useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';
import _uniqBy from 'lodash/uniqBy';
import {
  Dimensions,
  ScrollView,
  BackHandler,
  View,
  FlatList,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import services from '../../services/products.api';
// import Geolocation from '@react-native-community/geolocation';
const Categories = React.lazy(() =>
    import('../../Components/Categories/Categories'),
  ),
  MyCorsoal = React.lazy(() => import('../../Components/Corusal/corusoal')),
  SingleProduct = React.lazy(() =>
    import('../../Components/SingleProduct/SingleProduct'),
  ),
  MainAppFooter = React.lazy(() => import('../AppFooter/AppFooter'));
const {width} = Dimensions.get('window');
import {
  LayoutContainer,
  RowText,
  AppView,
} from '../../Modules/GlobalStyles/GlobalStyle';
import {ApplicationContext} from '../../Modules/context';
import CategoryLoader from '../../Loaders/CategoryLoader';
import ProductLoader from '../../Loaders/ProductLoader';
import AsyncStorage from '@react-native-community/async-storage';
import FilterProducts from '../FilterProducts/FilterProducts';

const productDescription = [
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2016/03/05/19/02/vegetables-1238252_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2016/06/29/19/54/healthy-food-1487647_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2017/06/06/22/37/italian-cuisine-2378729_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_1280.jpg',
  },
];

// const file = require("../../assets/Actions/Payments/Success.json")
const AppContent = ({navigation}) => {
  // Geolocation.getCurrentPosition((info) => console.log(info));
  const [showLoader, setShowLoader] = useState(false);

  const [rerender, setRerender] = useState(true);
  const [product, setProduct] = useState([]);
  const getData = useContext(ApplicationContext);
  useEffect(() => {
    if (rerender) {
      setShowLoader(true);
      (async function () {
        let shopId = await AsyncStorage.getItem('ShopId');
        let lat, long, products;
        let locationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        try {
          lat = await AsyncStorage.getItem('@lat');
          long = await AsyncStorage.getItem('@long');
          let localProductData = await AsyncStorage.getItem('@allProducts');
          products = JSON.parse(localProductData);
          if (products) {
            setProduct(products.data.products);
            setShowLoader(false);
          }
        } catch (error) {
          setShowLoader(false);
        }
        if (product.length === 0 || !lat || !long) {
          locationPermission === 'granted' &&
            Geolocation.getCurrentPosition(
              //Will give you the current location
              async (position) => {
                //   console.log('PERMISIION ACCESS');
                const currentLongitude = JSON.stringify(
                  position.coords.longitude,
                );
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(
                  position.coords.latitude,
                );
                //getting the Latitude from the location json
                try {
                  AsyncStorage.setItem('@lat', currentLatitude.toString());
                  AsyncStorage.setItem('@long', currentLongitude.toString());
                } catch (e) {}
                lat = parseFloat(currentLatitude);
                long = parseFloat(currentLongitude);

                try {
                  let localProductData = await AsyncStorage.getItem(
                    '@allProducts',
                  );
                  products = JSON.parse(localProductData);
                  setProduct(products.data.products);
                  setShowLoader(false);
                } catch (e) {
                  products = await services.productsList(lat, long); // fetching API
                  if (products) {
                    setProduct(products.data.products);
                    setShowLoader(false);
                    setRerender(false);
                  } else {
                    setProduct([]);
                    setShowLoader(false);
                    setRerender(false);
                  }

                  setRerender(false);
                }
              },
              (error) => {
                setShowLoader(false);
                setRerender(false);
                console.log('Unable to fetch Location');
              },
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 1000,
              },
            );
        }

        console.log('getShopName', shopId);
        // if (product.length === 0) {
        //   await Axios({
        //     method: 'GET',
        //     url: `${serverIP}/api/ShopProducts/namelist?_id=${shopId}`,
        //   })
        //     .then((prod: any) => {
        //       if (prod.data.products.length === 0) {
        //         // navigation.navigate('LocationModal');
        //       } else {
        //         setShowLoader(false);
        //         setProduct(prod.data.products);
        //       }
        //     })
        //     .catch((e: any) => {
        //       console.log(e);
        //       setShowLoader(false);
        //       // navigation.navigate('LocationModal');
        //     });
        // }
      })();
    }
  }, [getData.storeId, navigation, product.length, rerender]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    // BackHandler.exitApp()
  });
  const navigate = () => {
    console.log('Cat data', getData.category);

    navigation.navigate('Products', {title: 'Categories'});
  };

  const productDetails = (details: any) => {
    let filteredProd = product.find((item) => details._id === item._id);
    let imageFinalArray = [];
    filteredProd &&
      filteredProd.imageList.map((e) => {
        imageFinalArray.push({
          title: 'none',
          subtitle: 'none',
          illustration: e,
        });
      });
    details.imageList = imageFinalArray;
    getData.productDescInfo = details; // setting data to store !!
    navigation.navigate('ProductDetail', {title: 'Categories'});
  };

  return (
    <>
      {
        <LayoutContainer
          style={{marginBottom: 0}}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          marginTop={1}>
          <Suspense fallback={<CategoryLoader />}>
            <AppView width={width} height={200} marginHeight={10}>
              <MyCorsoal content={productDescription} height={2} />
            </AppView>
          </Suspense>

          <Suspense fallback={<CategoryLoader />}>
            <Categories action={() => navigate()} />
          </Suspense>

          {showLoader ? (
            <ProductLoader />
          ) : (
            !showLoader &&
            product.length > 0 && (
              <LayoutContainer marginTop={0}>
                <RowText paddingLeft={10} fontize={18} fontColor="black">
                  Popular Products
                </RowText>
                <ScrollView
                  horizontal={true}
                  style={{flex: 1, height: 'auto', marginTop: 5}}
                  showsHorizontalScrollIndicator={false}>
                  <Suspense fallback={<ProductLoader />}>
                    {product.length > 0 ? (
                      <FlatList
                        style={{height: 170}}
                        data={_uniqBy(
                          product.splice(0, product.length / 3),
                          'pId',
                        )} // only Showing 6 Products
                        horizontal
                        renderItem={({item}) => (
                          <SingleProduct
                            elements={item}
                            refresh={() => console.log('hello')}
                            productDetail={productDetails}
                          />
                        )}
                        keyExtractor={(item) => item._id}
                      />
                    ) : (
                      // eslint-disable-next-line react-native/no-inline-styles
                      <View
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          alignItems: 'center',
                          width: 400,
                          paddingBottom: 30,
                        }}>
                        {!showLoader && (
                          <RowText
                            fontColor="black"
                            fontFormat="Italic"
                            fontize={14}>
                            No Product Found ..
                          </RowText>
                        )}
                      </View>
                    )}
                  </Suspense>
                </ScrollView>
              </LayoutContainer>
            )
          )}

          {/* {showLoader ? (
            <ProductLoader />
          ) : (
              !showLoader &&
              product.length > 1 && (
                <>
                  <RowText paddingLeft={10} fontize={18} fontColor="black">
                    New Products
                </RowText>
                  <ScrollView
                    horizontal={true}
                    style={{ flex: 1, height: 'auto', marginTop: 0, marginBottom: 15 }}
                    showsHorizontalScrollIndicator={false}>
                    <Suspense fallback={<ProductLoader />}>
                      {product.length > 0 ? (
                        <FlatList
                          style={{ height: 160 }}
                          data={_uniqBy(product, "pId")}
                          horizontal
                          renderItem={({ item }) => (
                            <SingleProduct
                              elements={item}
                              refresh={() => console.log('hello')}
                              productDetail={productDetails}
                            />
                          )}
                          keyExtractor={(item) => item._id}
                        />
                      ) : (
                          // eslint-disable-next-line react-native/no-inline-styles
                          <View style={{ alignItems: 'center', width: 400 }}>
                            {!showLoader && (
                              <RowText
                                fontColor="black"
                                fontFormat="Italic"
                                fontize={14}>
                                No Product Found ..
                              </RowText>
                            )}
                          </View>
                        )}
                    </Suspense>
                  </ScrollView>
                </>
              )
            )} */}
          <FilterProducts
            isForeginData={false}
            navigation={navigation}
            isFooter={'show'}
          />
        </LayoutContainer>
      }
      <MainAppFooter isMain={{isMain: true, navigation: navigation}} />
    </>
  );
};

export default React.memo(AppContent);
