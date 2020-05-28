import React, { Suspense, useState, useContext } from 'react';
import { TouchableOpacity, Image, View, AsyncStorage } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { RowText, IconImage } from '../../Modules/GlobalStyles/GlobalStyle';
import AddRemoveBtn from '../AddRemoveBtn/AddRemoveBtn';
import FooterContent from '../FooterContent/FooterContent';
import ContentLoader, { List } from 'react-content-loader';
import FastImage from 'react-native-fast-image';
import utils from '../../utils';
import { Darkest, RupeeSymbol } from '../../Modules/GlobalStyles/GlobalColors';
import { ApplicationContext, ApplicationConumer } from '../../Modules/context';
import CategoryLoader from '../../Loaders/CategoryLoader';

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
  maxOrderCount: number;
  minOrderCount: number;
  imageList: string[];
  isAvailable: boolean;
}
interface IremoteProps {
  elements?: productDetailsProps;
  refresh?: any;
  productDetail?: ({ }) => void;
}

const SingleProduct = (props: IremoteProps) => {
  const getData = useContext(ApplicationContext);

  let { productList } = getData;
  let {
    name,
    price,
    _id,
    maxOrderCount,
    minOrderCount,
    imageList,
    units,
    isAvailable,
  } = props.elements;

  let actionObject = {
    _id,
    price,
    maxOrderCount,
    isAvailable,
    minOrderCount,
  };
  const [iniValue, setIniValue] = useState(0);

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

    let tempVar = props.elements;
    tempVar.quantity = orderCount;
    let isItemExists = productList.findIndex((e) => e._id == tempVar._id);

    if (isItemExists === -1) {
      productList.push(tempVar);
    } else {
      productList.splice(isItemExists, 1, tempVar);
    }
    props.refresh();
    try {
      await AsyncStorage.removeItem('@localCartItem');
      await AsyncStorage.setItem('@localCartItem', JSON.stringify(productList));

    } catch (error) {

    }

    // console.log(productList, 'qwertyu');
  };
  // Get Active product Object End Here
  return (
    <ApplicationConumer>
      {() => (
        <Suspense fallback={<CategoryLoader />}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 130,
              elevation: 5,
              height: 150,
              borderWidth: 0,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#1D65A6',
              backgroundColor: '#ffff',
              borderRadius: 14,
              marginLeft: 10,
            }}>
            <TouchableOpacity
              onPress={() => props.productDetail(props.elements)}>
              <FastImage
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 70,
                  height: 70,
                  margin: 4,
                }}
                source={{ uri: imageList[0] }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <RowText fontColor="red" fontize={12} cut={true}>
                {`${RupeeSymbol} ${price ? price.mrp : '--'}`}
              </RowText>
              <RowText fontColor="green" fontize={12} cut={false}>
                {`${RupeeSymbol} ${price ? price.sp : '--'}`}
              </RowText>
            </View>
            <RowText fontColor="black" fontize={12}>
              {utils.trimText(name)}
            </RowText>
            <View style={{ flexDirection: 'row', elevation: 5, paddingBottom: 10 }}>
              <AddRemoveBtn
                remoteValues={actionObject}
                defaultValue={iniValue}
                toggleAction={incDec}
              />
            </View>
          </View>

          <Divider style={{ backgroundColor: Darkest, marginBottom: 10 }} />
        </Suspense>
      )}
    </ApplicationConumer>
  );
};

export default SingleProduct;
