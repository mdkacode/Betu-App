import 'react-native-gesture-handler';
import React, {Suspense, useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ApplicationContext} from '../../Modules/context';
import {RowView} from '../../Modules/GlobalStyles/GlobalStyle';
import UserProfile from '../UserProfile/UserProfile';
import PaymentSuccess from '../Payments/PaymentSuccess';
import GateKeeper from '../Gatekeeper/Gatekeeper';
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent';
import {AsyncStorage} from 'react-native';
const AppHeader = React.lazy(() => import('../AppHeader/AppHeader'));
const AppContent = React.lazy(() => import('../AppContent/AppContent'));
const AppCart = React.lazy(() => import('../AppCart/AppCart'));
const ProductDetails = React.lazy(() =>
  import('../ProductDetail/ProductDetail'),
);

const Stack = createStackNavigator();

const AppLayout = (props) => {
  let [location, setLocation] = useState(
    {} as {title: string; address: string},
  );
  useEffect(() => {
    AsyncStorage.getItem('shopInfo').then((e: any) => {
      setLocation(JSON.parse(e));
    });
  }, []);
  const getData = useContext(ApplicationContext);
  console.log(props);
  return (
    <Suspense fallback={<LoadingComponent />}>
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
            options={{
              headerLeft: null,
              headerTitle: (props) => (
                <AppHeader
                  titleName={
                    location.title
                      ? location.title + ',' + location.address
                      : 'Home'
                  }
                />
              ),
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
            name="Cart"
            component={AppCart}
            options={({props}) => ({
              headerTitle: <RowView fontColor={'black'}>Cart</RowView>,
            })}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetails}
            options={({route}) => ({
              headerTitle: <RowView fontColor={'black'}>Product</RowView>,
            })}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={({route}) => ({
              headerTitle: <RowView fontColor={'black'}>Profile</RowView>,
            })}
          />
          <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccess}
            options={({route}) => ({
              headerShown: false,
              headerTitle: <RowView fontColor={'black'}>Profile</RowView>,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
};

export default AppLayout;
