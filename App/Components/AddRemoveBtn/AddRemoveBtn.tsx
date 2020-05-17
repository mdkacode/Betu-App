import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface AddRemoveBtnProps {
  action?: any;
  defaultValue: number;
}

const AddRemoveBtn = (props: AddRemoveBtnProps) => {
  const { defaultValue, action } = props;
  const [iniValue, setIniValue] = useState(defaultValue);
  const incDec = (bool) => {
    if (bool) iniValue < 5 && setIniValue(iniValue + 1);
    else iniValue > 0 && setIniValue(iniValue - 1);
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => incDec(false)}>
        <Image
          source={require('../../assets/images/icons/minus.png')}
          style={{ width: 30, height: 30, opacity: iniValue == 0 ? 0.5 : 1 }}
        />
      </TouchableOpacity>
      <TextInput
        style={{
          height: 35,
          color: 'black',
          borderColor: '#eeee',
          borderWidth: 1,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
        value={iniValue.toString()}
        editable={false}></TextInput>
      <TouchableOpacity onPress={() => incDec(true)}>
        <Image
          source={require('../../assets/images/icons/plus.png')}
          style={{ width: 30, height: 30, opacity: iniValue == 5 ? 0.5 : 1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddRemoveBtn;
