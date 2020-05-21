import React, {useContext, Suspense, useState, useEffect} from 'react';
import Axios from 'axios';
import {
  Dimensions,
  ScrollView,
  BackHandler,
  View,
  FlatList,
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

  useEffect(() => {
    setShowLoader(true);
    (async function () {
      let shopId = await AsyncStorage.getItem('ShopId');
      console.log('getShopName', shopId);
      await Axios({
        method: 'GET',
        url: `${serverIP}/api/ShopProducts/namelist?_id=${shopId}`,
      })
        .then((prod: any) => {
          if (prod.data.products.length === 0) {
            navigation.navigate('LocationModal');
          } else {
            setShowLoader(false);
            setProduct(prod.data.products);
          }
        })
        .catch((e: any) => {
          console.log(e);
          setShowLoader(false);
          navigation.navigate('LocationModal');
        });
    })();
  }, [getData.storeId, navigation]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });
  const navigate = () => {
    console.log('Cat data', getData.category);
    navigation.navigate('Products', {title: 'Categories'});
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
