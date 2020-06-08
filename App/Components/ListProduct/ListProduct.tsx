import React, {Suspense, useState, useEffect, useContext} from 'react';
import {Image, View, Alert} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import AddRemoveBtn from '../AddRemoveBtn/AddRemoveBtn';
import {Darkest, RupeeSymbol} from '../../Modules/GlobalStyles/GlobalColors';
import {ApplicationContext, ApplicationConumer} from '../../Modules/context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Images from '../SafeImage/SafeImage';
import AsyncStorage from '@react-native-community/async-storage';
interface Iprice {
  mrp: number;
  sp: number;
}
interface productDetailsProps {
  name: string;
  _id: string;
  units: string;
  price: Iprice;
  quantity: number;
  storeId: string;
  userId: string;

  maxOrderCount: number;
  minOrderCount: number;
  imageList: string[];
  isAvailable: boolean;
}
interface IremoteProps {
  elements?: productDetailsProps;
  refresh?: any;
  navigation?: any;
}

const ListProduct = (props: IremoteProps) => {
  const getData = useContext(ApplicationContext);
  useEffect(() => {
    return () => {
      //
    };
  }, [getData.productList]);
  let {productList} = getData; // getting data from the store

  let {
    name,
    price,
    _id,
    maxOrderCount,
    minOrderCount,
    imageList,
    units,
    isAvailable,
    quantity,
  } = props.elements;
  let actionObject = {
    _id,
    price,
    maxOrderCount,
    isAvailable,
    minOrderCount,
  };
  const [iniValue, setIniValue] = useState(quantity || 0);

  // Get active product Object here

  const incDec = async (bool: any) => {
    // Alert.alert("Hello")
    let orderCount = 0;
    if (bool === 'least') {
      orderCount = 1;
      // for setting up first value on add click
      setIniValue(1);
    } else if (bool) {
      orderCount = iniValue + 1;
      iniValue < maxOrderCount && setIniValue(iniValue + 1);
    } else {
      orderCount = iniValue - 1;
      iniValue > 0 && setIniValue(iniValue - 1);
    }
    //

    let tempVar = props.elements;
    tempVar.quantity = orderCount;
    tempVar.storeId =
      getData.shopId.shopId !== undefined
        ? getData.shopId.shopId
        : getData.storeId;
    if (getData.storeId) {
      tempVar.shop_id = getData.storeId; // temp Fix For data
    }

    let storedUserId = await AsyncStorage.getItem('@userPhone');
    tempVar.userId = storedUserId;
    let isItemExists;
    try {
      isItemExists = productList.findIndex((e) => e._id == tempVar._id);
    } catch (error) {
      isItemExists = -1;
      productList = [];
    }

    if (orderCount === 0) {
      productList.splice(isItemExists, 1);
    } else {
      if (isItemExists === -1) {
        productList.push(tempVar);
      } else {
        productList.splice(isItemExists, 1, tempVar);
      }
    }

    try {
      props.refresh();
    } catch (e) {
    }
  };
  const ProductDetail = (productDetail: any) => {
    let imageFinalArray = [];
    productDetail &&
      productDetail.imageList.map((e: any) => {
        imageFinalArray.push({
          title: 'none',
          subtitle: 'none',
          illustration: e,
        });
      });

    productDetail.imageList = imageFinalArray;
    getData.productDescInfo = productDetail; // setting data to store !!
    props.navigation.navigate('ProductDetail', {title: 'Categories'});
  };
  // Get Active product Object End Here
  return (
    <ApplicationConumer>
      {() => (
        <Suspense fallback={<RowText fontize={20}>Loading</RowText>}>
          {
            <ListItem
              containerStyle={[
                {backgroundColor: '#fff', elevation: 15, marginBottom: 1},
              ]}
              leftElement={
                <Images
                  source={[
                    {
                      uri:
                        typeof imageList[0] === 'string'
                          ? imageList[0]
                          : 'https://via.placeholder.com/250',
                    },
                    require('../../assets/images/Placeholder/no-camera.png'),
                  ]}
                  style={{width: 40, height: 40}}
                />
              }
              key={'product'}
              subtitle={
                <View style={{flexDirection: 'row'}}>
                  {price && price.sp !== price.mrp && (
                    <RowText
                      fontColor={'red'}
                      fontize={12}
                      cut={true}
                      fontFormat="Italic">
                      {`${RupeeSymbol} ${price ? price.mrp : 'No Price Found'}`}
                    </RowText>
                  )}
                  <RowText
                    style={{paddingLeft: 5}}
                    fontColor={'green'}
                    fontize={14}>
                    {`${RupeeSymbol} ${price ? price.sp : 'No Price Found'}`}
                  </RowText>
                </View>
              }
              title={
                <TouchableOpacity onPress={() => ProductDetail(props.elements)}>
                  <RowText fontColor={'black'} fontize={14}>
                    {name}
                  </RowText>
                </TouchableOpacity>
              }
              rightTitle={
                <AddRemoveBtn
                  remoteValues={actionObject}
                  defaultValue={iniValue}
                  toggleAction={incDec}
                />
              }
            />
          }
          <Divider style={{backgroundColor: '#fff', elevation: 15}} />
        </Suspense>
      )}
    </ApplicationConumer>
  );
};

export default ListProduct;
