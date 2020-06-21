import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { LayoutContainer, RowText } from '../../Modules/GlobalStyles/GlobalStyle';
import { Divider } from 'react-native-elements';
import MyCarousel from '../../Components/Corusal/corusoal';
import AppButton from '../../Components/Button/Button';

import {
  ThemeYellow,
  Darkest,
  LightColor,
  RupeeSymbol,
} from '../../Modules/GlobalStyles/GlobalColors';
import { DeviceWidth } from '../../Components/DeviceDeminsions/DeviceDeminsions';
import DescriptionList from '../../Components/DescriptionList/DescriptionList';
// import {ScrollView} from 'react-native-gesture-handler';
import SingleProduct from '../../Components/SingleProduct/SingleProduct';
import { ApplicationContext } from '../../Modules/context';

const ProductDetail = () => {
  const getData = useContext(ApplicationContext);

  //  "isAvailable": true, "maxOrderCount": 5, "minOrderCount": 1, "name": "Anrag", "pId": "5ecb60d05a03da52950ecb37", "price": {"mrp": 12, "sp": 10}, "priceList": {"mrp": 12, "sp": 10}, "shopId": "5eca1d2e802701c26e84ecec", "shop_id": "5eca1d2e802701c26e84ecec", "sku": 100,
  // "slug": "Anrag", "units": "kilo", "updatedAt": "2020-05-25T06:08:17.387Z", "updatedBy": "Samosa singh"}
  let {
    imageList,
    isAvailable,
    maxOrderCount,
    minOrderCount,
    name,
    pId,
    price,
    shopId,
    units,
  } = getData.productDescInfo;

  console.log(getData.productDescInfo.imageList, "werthjhgfdfsdgfh");
  return (
    <LayoutContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      marginTop={1}>
      {<MyCarousel text={false} width={1} height={1.7} content={imageList} />}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 15,
          paddingTop: 10,
          backgroundColor: '#fff',
          minWidth: DeviceWidth,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            left: 0,
          }}>
          <RowText fontColor={'black'} fontize={22} style={{ marginRight: 20 }}>
            {`${name} / ${units}`}
          </RowText>
          <AppButton
            key="cartButton"
            borderd={true}
            content={`Add @ ${RupeeSymbol} ${price.sp}`}
            btnWidth={100}
            action={() => console.log('rest')}
          />
        </View>

        <DescriptionList
          Name={'Name'}
          Description={`${name}/${units} @ ${RupeeSymbol} ${price.sp}`}
        />
        {/* <DescriptionList Name={'Status'} Description={'Bottle serving Cold'} /> */}
        <DescriptionList
          Name={'Max Quantity'}
          Description={`${maxOrderCount} Units / Person`}
        />
        <DescriptionList
          Name={'Max Retail Price'}
          Description={`${RupeeSymbol} ${price.mrp}`}
        />

        <DescriptionList
          Name={'Selling Price'}
          Description={`${RupeeSymbol} ${price.sp}`}
        />
        <DescriptionList
          Name={'Discount'}
          Description={`You are Saving ${RupeeSymbol} ${price.mrp - price.sp}`}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingTop: 10,
          backgroundColor: '#fff',
          minWidth: DeviceWidth,
        }}>
        <AppButton
          key="cartButton"
          borderd={true}
          content="Add To Cart"
          action={() => console.log('rest')}
        />
        <AppButton
          key="WishlistButton"
          borderd={true}
          backgroundColor={ThemeYellow}
          fontColor={Darkest}
          content="Wishlist"
          action={() => console.log('Wish')}
        />
      </View>
      <LayoutContainer marginTop={1}>
        <RowText paddingLeft={10} fontize={18} fontColor="black">
          You may also Like
        </RowText>
      </LayoutContainer>
    </LayoutContainer>
  );
};

export default ProductDetail;
