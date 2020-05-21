import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {LayoutContainer, RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import {Divider} from 'react-native-elements';
import MyCarousel from '../../Components/Corusal/corusoal';
import AppButton from '../../Components/Button/Button';
import {
  ThemeYellow,
  Darkest,
  LightColor,
  RupeeSymbol,
} from '../../Modules/GlobalStyles/GlobalColors';
import {DeviceWidth} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import DescriptionList from '../../Components/DescriptionList/DescriptionList';
import {ScrollView} from 'react-native-gesture-handler';
import SingleProduct from '../../Components/SingleProduct/SingleProduct';
import {ApplicationContext} from '../../Modules/context';

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
      'https://i.pinimg.com/474x/75/16/9e/75169e9215deed99697e134a34fd153f.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://i.dlpng.com/static/png/1685393-pepsi-cola-12-oz-aluminum-canpng-pepsi-png-522_800_preview.png',
  },
];
const ProductDetail = () => {
  const getData = useContext(ApplicationContext);
  console.log(getData, 'Context Data Product');
  return (
    <LayoutContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      marginTop={1}>
      <MyCarousel
        text={false}
        width={1}
        height={1.7}
        content={productDescription}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 15,
          paddingTop: 10,
          backgroundColor: '#eeeee',
          minWidth: DeviceWidth,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#eeeee',
            left: 0,
          }}>
          <RowText fontColor={'black'} fontize={22} style={{marginRight: 20}}>
            Pepsi (330 ml)
          </RowText>
          <AppButton
            key="cartButton"
            borderd={true}
            content={`Add @ ${RupeeSymbol} 90`}
            btnWidth={100}
            action={() => console.log('rest')}
          />
        </View>

        <DescriptionList
          Name={'Name'}
          Description={`Pepsi 330ML @ ${RupeeSymbol} 70`}
        />
        <DescriptionList Name={'Status'} Description={'Bottle serving Cold'} />
        <DescriptionList
          Name={'Max Quantity'}
          Description={'5 Bottles / Person'}
        />
        <DescriptionList
          Name={'Max Retail Price'}
          Description={`${RupeeSymbol} 90`}
        />

        <DescriptionList
          Name={'Selling Price'}
          Description={`${RupeeSymbol} 90`}
        />
        <DescriptionList
          Name={'Discount'}
          Description={`You are Saving ${RupeeSymbol} 20`}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingTop: 10,
          backgroundColor: '#eeeee',
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
        <ScrollView
          horizontal={true}
          style={{flex: 1, height: 130, marginTop: 10}}
          showsHorizontalScrollIndicator={false}>
          {product.map((e) => (
            <SingleProduct List={e} />
          ))}
        </ScrollView>
      </LayoutContainer>
    </LayoutContainer>
  );
};

export default ProductDetail;
