import React, {useContext, Suspense, useState, useEffect} from 'react';
import Axios from 'axios';
import _Debounce from 'lodash/debounce';
import {
  Dimensions,
  ScrollView,
  BackHandler,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {serverIP} from '../../constant';
import CommanList from '../../Components/ListProduct/CommanList';
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
  RowView,
  AppView,
} from '../../Modules/GlobalStyles/GlobalStyle';
import {ApplicationContext} from '../../Modules/context';
import {Textinput} from '../Gatekeeper/Gatekeeper.style';

const product = [
  {
    name: 'Lays Chips',
    image:
      'https://www.lays.ca/sites/lays.ca/files/30015469_Lay%27s_Roast%20Chicken_235g.png',
    price: '20',
    sellPrice: '10',
  },
  {
    name: 'Amala Juice',
    image:
      'https://www.patanjaliayurved.net/assets/product_images/400x500/amlajuice500ml400500.png',
    price: '40',
    sellPrice: '30',
  },
  {
    name: 'Potato',
    image:
      'https://www.ilpomodoropetti.com/wp-content/uploads/2017/01/pomo_petti_100_3.png',
    price: '120',
    sellPrice: '110',
  },
  {
    name: 'Potato',
    image:
      'https://3.imimg.com/data3/HF/NT/MY-11459200/chilled-potatoes-500x500.png',
    price: '80',
    sellPrice: '55',
  },
  {
    name: '5 Start',
    image: 'https://choosefresh.in/image/cache/data/chocolates/3-500x500.png',
    price: '70',
    sellPrice: '60',
  },
];

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
  const [shops, setShops] = useState([]);
  const [product, setProduct] = useState([]);
  const [getCategory, setCategory] = useState('');
  const [perSistData, setperSistData] = useState([]); // for storing copy of the store
  const getData = useContext(ApplicationContext);
  const [locPopUp, setLocPopUp] = useState(false);

  useEffect(() => {
    Axios({
      method: 'get',
      url: `${serverIP}/api/shopkeeper`,
    }).then((data: any) => {
      setShops(data.data.message);
      setperSistData(data.data.message);
    });

    setLocPopUp(true);
  }, []);

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });
  const getProduct = (e: any) => {
    console.log(e);
    navigation.navigate('ProductDetail', {
      name: e.name,
    });
  };
  const productSearch = (text: text) => {
    let searchedShops = shops.filter(function (hero: any) {
      let getName = hero.businessName.toLocaleLowerCase();
      let getAddress = hero.address.areaName.toLocaleLowerCase();

      return (
        getName.includes(text.toLocaleLowerCase()) ||
        getAddress.includes(text.toLocaleLowerCase())
      );
    });
    console.log(perSistData);
    setShops(text.length === 0 ? perSistData : searchedShops);
  };
  const selectedShop = async (e: any) => {
    getData.shopId = e;
    console.log('getdata', getCategory);
    console.log('GETDATA', e.shopId);
    Axios({
      method: 'GET',
      url: `${serverIP}/api/ShopProducts/namelist?_id=${e.shopId}`,
    }).then((prod: any) => {
      console.log(prod.data.products);
      setProduct(prod.data.products);
    });

    setLocPopUp(false);
    navigation.navigate('Home', {title: e.businessName});
  };
  const navigate = (e: any) => {
    console.log('Cat data', getData.category);
    navigation.navigate('Products', {title: 'Categories'});
  };

  const popUp = () => {
    return (
      <LayoutContainer
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        marginTop={1}
        style={{paddingBottom: 10}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={locPopUp}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Textinput
            itemHeight={50}
            itemWitdh={width}
            onChangeText={_Debounce((text) => productSearch(text), 500)}
            placeholder="Search Store ..."
          />
          <LayoutContainer style={{flexDirection: 'column', paddingBottom: 50}}>
            {shops.map((e: any) => (
              <CommanList
                title={e.businessName}
                action={selectedShop}
                address={e.address.areaName}
                shopId={e.productListId}
                image={e.imageList[0]}
              />
            ))}
          </LayoutContainer>
        </Modal>
      </LayoutContainer>
    );
  };

  return (
    <>
      {locPopUp ? (
        popUp()
      ) : (
        <LayoutContainer
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          marginTop={1}>
          <Suspense fallback={<RowView fontize={20}>Loading</RowView>}>
            <AppView width={width} height={200} marginHeight={10}>
              <MyCorsoal content={productDescription} height={2} />
            </AppView>
          </Suspense>

          <Suspense fallback={<RowView fontize={20}>Loading</RowView>}>
            <Categories action={() => navigate(setCategory)} />
          </Suspense>

          <LayoutContainer marginTop={1}>
            <RowView paddingLeft={10} fontize={18} fontColor="black">
              Popular Products
            </RowView>
            <ScrollView
              horizontal={true}
              style={{flex: 1, height: 160, marginTop: 10}}
              showsHorizontalScrollIndicator={false}>
              <Suspense
                fallback={
                  <RowView fontize={20} fontColor="black">
                    Loading Products
                  </RowView>
                }>
                {product.map((e) => (
                  <SingleProduct
                    elements={e}
                    refresh={() => console.log('hello')}
                  />
                ))}
              </Suspense>
            </ScrollView>
          </LayoutContainer>

          <LayoutContainer>
            <RowView paddingLeft={10} fontize={18} fontColor="black">
              New Products
            </RowView>
            <ScrollView
              horizontal={true}
              style={{flex: 1, height: 220, marginTop: 5}}
              showsHorizontalScrollIndicator={false}>
              <Suspense
                fallback={
                  <RowView fontize={20} fontColor="black">
                    Loading Products
                  </RowView>
                }>
                {product.map((e) => (
                  <SingleProduct
                    elements={e}
                    refresh={() => console.log('hello')}
                  />
                ))}
              </Suspense>
            </ScrollView>
          </LayoutContainer>
        </LayoutContainer>
      )}
      <MainAppFooter isMain={{isMain: true, navigation: navigation}} />
    </>
  );
};

export default AppContent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
