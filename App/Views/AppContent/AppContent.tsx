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
  // MyCorsoal = React.lazy(() => import('../../Components/Corusal/corusoal')),
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
                timeout: 1000,
                maximumAge: 1000,
              },
            );
        }
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
            <Categories action={() => navigate()} />
          </Suspense>

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
