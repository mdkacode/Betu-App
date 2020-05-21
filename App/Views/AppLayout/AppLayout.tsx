import 'react-native-gesture-handler';
import React, {Suspense, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ApplicationContext} from '../../Modules/context';
import {RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import UserProfile from '../UserProfile/UserProfile';
import PaymentSuccess from '../Payments/PaymentSuccess';
import GateKeeper from '../Gatekeeper/Gatekeeper';
import Products from '../Products/Products';
import SearchStoreLoader from '../../Loaders/SearchStoreLoader';
const AppHeader = React.lazy(() => import('../AppHeader/AppHeader'));
const AppContent = React.lazy(() => import('../AppContent/AppContent'));
const AppCart = React.lazy(() => import('../AppCart/AppCart'));
const ProductDetails = React.lazy(() =>
  import('../ProductDetail/ProductDetail'),
);

const Stack = createStackNavigator();

const AppLayout = (props) => {
  console.log(props);
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
            name="Home"
            component={AppContent}
            // component={Products}
            options={{
              headerLeft: null,
              headerTitle: (props) => <AppHeader titleName={'Home'} />,
            }}
          />
          <Stack.Screen
            name="GateKeeper"
            component={GateKeeper}
            options={{
              headerShown: false,
              headerTitle: (props) => <AppHeader titleName={'Get In'} />,
            }}
          />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{
              headerShown: true,
              headerTitle: (props) => <AppHeader titleName={'Products'} />,
            }}
          />

          <Stack.Screen
            name="Cart"
            component={AppCart}
            options={({props}) => ({
              headerTitle: <RowText fontColor={'black'}>Cart</RowText>,
            })}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetails}
            options={({route}) => ({
              headerTitle: <RowText fontColor={'black'}>Product</RowText>,
            })}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={({route}) => ({
              headerTitle: <RowText fontColor={'black'}>Profile</RowText>,
            })}
          />
          <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccess}
            options={({route}) => ({
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
