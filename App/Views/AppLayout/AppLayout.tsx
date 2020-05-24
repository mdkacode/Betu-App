import 'react-native-gesture-handler';
import React, {Suspense, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import UserProfile from '../UserProfile/UserProfile';
import PaymentSuccess from '../Payments/PaymentSuccess';
import GateKeeper from '../Gatekeeper/Gatekeeper';
import Products from '../Products/Products';
import SearchStoreLoader from '../../Loaders/SearchStoreLoader';
import AsyncStorage from '@react-native-community/async-storage';
const LocationModal = React.lazy(() => import('../../Loaders/LocationModal'));
const AppHeader = React.lazy(() => import('../AppHeader/AppHeader'));
const AppContent = React.lazy(() => import('../AppContent/AppContent'));
const AppCart = React.lazy(() => import('../AppCart/AppCart'));
const ProductDetails = React.lazy(() =>
  import('../ProductDetail/ProductDetail'),
);

const Stack = createStackNavigator();

const AppLayout = () => {
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        let loginS = await AsyncStorage.getItem('@LoginStatus');
        if (loginS === 'true') {
          console.log('hello');
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (e) {
        setLogin(false);
      }
    });
  }, []);
  return (
    <Suspense fallback={<SearchStoreLoader />}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#eeeeee',
            },
          }}>
          <Stack.Screen
            name={isLogin ? 'Home' : 'Login'}
            component={isLogin ? AppContent : GateKeeper}
            // component={Products}
            options={{
              headerShown: isLogin ? true : false,
              headerTitle: () => <AppHeader titleName={'Home'} />,
            }}
          />
          <Stack.Screen
            name="Home"
            component={AppContent}
            options={{
              headerShown: true,
              headerLeft: null,
              headerTitle: () => <AppHeader titleName={'Home'} />,
            }}
          />
          <Stack.Screen
            name="LocationModal"
            component={LocationModal}
            options={{
              headerShown: true,
              headerTitle: () => <AppHeader titleName={'Get In'} />,
            }}
          />

          <Stack.Screen
            name="GateKeeper"
            component={GateKeeper}
            options={{
              headerShown: false,
              headerTitle: () => <AppHeader titleName={'Get In'} />,
            }}
          />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{
              headerShown: true,
              headerTitle: () => <AppHeader titleName={'Products'} />,
            }}
          />

          <Stack.Screen
            name="Cart"
            component={AppCart}
            options={() => ({
              headerTitle: <RowText fontColor={'black'}>Cart</RowText>,
            })}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetails}
            options={() => ({
              headerTitle: <RowText fontColor={'black'}>Product</RowText>,
            })}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={() => ({
              headerTitle: <RowText fontColor={'black'}>Profile</RowText>,
            })}
          />
          <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccess}
            options={() => ({
              headerShown: false,
              headerTitle: <RowText fontColor={'black'}>Profile</RowText>,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
};

export default AppLayout;
