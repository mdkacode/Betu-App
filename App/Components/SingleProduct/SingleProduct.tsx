import React, { useState } from 'react';
import { IconImage, RowView } from '../../Modules/GlobalStyles/GlobalStyle';
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import AddRemoveBtn from '../AddRemoveBtn/AddRemoveBtn';

interface SingleProduct {
  List: any;
  action: any;
}
const SingleProduct = (singleProduct: SingleProduct) => {
  let item = singleProduct['List'];
  const [addProduct, setAddProduct] = useState(true);
  const [cout, setCount] = useState(0);

  const AddProduct = () => {
    setAddProduct(false);
    setCount(cout + 1);
  };
  return (
    <TouchableOpacity onPress={() => singleProduct.action(item)}>
      <View
        style={{
          width: 120,
          height: 130,
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: '#1D65A6',
          backgroundColor: '#ffff',
          borderRadius: 14,
          marginLeft: 10,
        }}>
        <IconImage
          width={60}
          height={60}
          style={{ resizeMode: 'contain' }}
          margin={4}
          source={{ uri: `${item.image}` }}
        />
        <View style={{ flexDirection: 'row' }}>
          <RowView fontColor="red" fontize={12} cut={true}>
            {' '}
            ₹{item.price}
          </RowView>
          <RowView fontColor="green" fontize={12} cut={false}>
            {' '}
            ₹{item.sellPrice}
          </RowView>
        </View>
        <RowView fontColor="black" fontize={12}>
          {item.name}
        </RowView>
        <View style={{ flexDirection: 'row' }}>
          {!addProduct ? (
            <>
              <AddRemoveBtn defaultValue={0} />
            </>
          ) : (
            <TouchableHighlight
              style={{
                backgroundColor: '#192e5b',
                padding: 4,
                borderRadius: 5,
                marginBottom: 5,
                width: 45,
                alignItems: 'center',
              }}
              onPress={() => AddProduct()}
              underlayColor="#fff">
              <RowView fontize={10}>Add</RowView>
            </TouchableHighlight>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleProduct;
