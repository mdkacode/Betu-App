import React, { Suspense, useState, useEffect, useContext } from 'react';
import { Image, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { RowText } from '../../Modules/GlobalStyles/GlobalStyle';
import AddRemoveBtn from '../AddRemoveBtn/AddRemoveBtn';
import { Darkest, RupeeSymbol } from '../../Modules/GlobalStyles/GlobalColors';
import { ApplicationContext, ApplicationConumer } from '../../Modules/context';
import FastImage from 'react-native-fast-image';
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
}

const ListProduct = (props: IremoteProps) => {
  const getData = useContext(ApplicationContext);
  useEffect(() => {
    return () => {
      //   console.log('ISLEAVING', getData.productList);
    };
  }, [getData.productList]);
  let { productList } = getData; // getting data from the store

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
    //console.log('propduct count is ', orderCount);
    let tempVar = props.elements;
    tempVar.quantity = orderCount;
    tempVar.storeId = getData.shopId.shopId;
    tempVar.userId = getData.userid;
    //console.log(tempVar);
    let isItemExists = productList.findIndex((e) => e._id == tempVar._id);
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
      //console.log(e);
    }

    // console.log(productList, 'qwertyu');
  };
  // Get Active product Object End Here
  return (
    <ApplicationConumer>
      {() => (
        <Suspense fallback={<RowText fontize={20}>Loading</RowText>}>
          <ListItem
            containerStyle={[{ backgroundColor: '#eeeeee' }]}
            leftElement={
              <FastImage
                source={{
                  uri: imageList[0],
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{ width: 40, height: 40 }}
              />
            }
            key={'product'}
            subtitle={
              <View style={{ flexDirection: 'row' }}>
                <RowText
                  fontColor={'red'}
                  fontize={12}
                  cut={true}
                  fontFormat="Italic">
                  {`${RupeeSymbol} ${price ? price.mrp : 'No Price Found'}`}
                </RowText>
                <RowText
                  style={{ paddingLeft: 5 }}
                  fontColor={'green'}
                  fontize={14}>
                  {`${RupeeSymbol} ${price ? price.sp : 'No Price Found'}`}
                </RowText>
              </View>
            }
            title={
              <RowText fontColor={'black'} fontize={14}>
                {name}
              </RowText>
            }
            rightTitle={
              <AddRemoveBtn
                remoteValues={actionObject}
                defaultValue={iniValue}
                toggleAction={incDec}
              />
            }
          />
          <Divider style={{ backgroundColor: Darkest }} />
        </Suspense>
      )}
    </ApplicationConumer>
  );
};

export default ListProduct;
