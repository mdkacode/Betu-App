import React, {useContext, Suspense, useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';
import {
  Dimensions,
  ScrollView,
  BackHandler,
  View,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import {serverIP} from '../../constant';

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
  const [product, setProduct] = useState([]);
  const getData = useContext(ApplicationContext);
  const [latLong, setlatLong] = useState({} as {lat: string; long: string});
  useEffect(() => {
    setShowLoader(false);
    (async function () {
      let shopId = await AsyncStorage.getItem('ShopId');
      let locationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      locationPermission === 'granted' &&
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            console.log('PERMISIION ACCESS');
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            setlatLong({
              lat: parseFloat(currentLatitude),
              long: parseFloat(currentLongitude),
            });
            let lat = parseFloat(currentLatitude);
            let long = parseFloat(currentLongitude);
            Axios({
              method: 'GET',
              url: `${serverIP}/api/shopkeeper/bygeo?lat=${lat}&long=${long}`,
            })
              .then(async (shops: any) => {
                const shopIds = [];
                debugger;
                await shops.data.message.map((shopid: object) => {
                  console.log(shopid);
                  shopIds.push(shopid.productListId);
                });
                console.log('JOINEDARRY', shopIds.join());
                Axios({
                  method: 'GET',
                  url: `${serverIP}/api/ShopProducts/allProducts?shopIds=${shopIds.join()}`,
                })
                  .then((products) => {
                    setShowLoader(false);
                    console.log('productsDATA', products.data.products);
                    setProduct(products.data.products);
                  })
                  .catch((error) => {
                    console.log('PRODUCT_FETCH_ERROR', error);
                  });
              })
              .catch((e: any) => {
                console.log(e);
                setShowLoader(false);
                // navigation.navigate('LocationModal');
              });
          },
          (error) => console.log(error.message),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          },
        );

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
  }, [getData.storeId, navigation, product.length]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });
  const navigate = () => {
    console.log('Cat data', getData.category);
    navigation.navigate('Products', {title: 'Categories'});
  };

  const productDetails = (details: any) => {
    console.log('productDetails', details);
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
            product.length > 1 && (
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
                        style={{height: 140}}
                        data={product}
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

          {showLoader ? (
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
                  style={{flex: 1, height: 'auto', marginTop: 0}}
                  showsHorizontalScrollIndicator={false}>
                  <Suspense fallback={<ProductLoader />}>
                    {product.length > 0 ? (
                      <FlatList
                        style={{height: 140}}
                        data={product}
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
                      <View style={{alignItems: 'center', width: 400}}>
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
          )}
        </LayoutContainer>
      }
      <MainAppFooter isMain={{isMain: true, navigation: navigation}} />
    </>
  );
};

export default AppContent;
