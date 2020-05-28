import React, { useState, Suspense } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { RowText } from '../../Modules/GlobalStyles/GlobalStyle';

interface Iprice {
  mrp: number;
  sp: number;
}
interface IremoteProps {
  _id: string;
  maxOrderCount: number;
  price: Iprice;
  isAvailable: boolean;
  minOrderCount: number;
}
interface AddRemoveBtnProps {
  remoteValues: IremoteProps; // getting parent values
  defaultValue: number; // values for Added value
  toggleAction: any;
}

const AddRemoveBtn = (props: AddRemoveBtnProps) => {
  const { defaultValue, remoteValues, toggleAction } = props;

  const addBtn = () => {
    return (
      <TouchableHighlight
        style={style.mainStyle}
        onPress={() => toggleAction('least')}
        underlayColor="#fff">
        <RowText fontize={12}>Add</RowText>
      </TouchableHighlight>
    );
  };
  const sizeBtn = () => {
    return (
      <>
        <Suspense fallback={<RowText fontize={20}>Loading...</RowText>}>
          <TouchableOpacity onPress={() => toggleAction(false)}>
            <Image
              source={require('../../assets/images/icons/minus.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 30,
                height: 30,
                opacity: defaultValue === 0 ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={style.text}
            value={defaultValue.toString()}
            editable={false}
          />
          <TouchableOpacity onPress={() => toggleAction(true)}>
            <Image
              source={require('../../assets/images/icons/plus.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 30,
                height: 30,
                opacity: defaultValue === remoteValues.maxOrderCount ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>
        </Suspense>
      </>
    );
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flexDirection: 'row' }}>
      {defaultValue === 0 ? addBtn() : sizeBtn()}
    </View>
  );
};

export default AddRemoveBtn;

const style = StyleSheet.create({
  text: {
    height: 35,
    color: 'black',
    borderColor: '#eeee',
    borderWidth: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainStyle: {
    backgroundColor: '#192e5b',
    padding: 4,
    borderRadius: 5,
    marginBottom: 5,
    elevation: 15,
    width: 45,
    alignItems: 'center',
  },
});
