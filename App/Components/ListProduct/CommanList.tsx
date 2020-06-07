import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import AddRemoveBtn from '../AddRemoveBtn/AddRemoveBtn';
import {Darkest} from '../../Modules/GlobalStyles/GlobalColors';
import AsyncStorage from '@react-native-community/async-storage';
import utils from '../../utils';
import FilterProducts from '../../Views/FilterProducts/FilterProducts';
import Images from '../SafeImage/SafeImage';

interface CommanListProps {
  title: string;
  image: string;
  address: string;
  loc: any;
  shopId?: string;
  action: (arg0: Object) => void;
}
const CommanList = (props: CommanListProps) => {
  let [lat, setLat] = useState(0); //setting local lat
  let [long, setLong] = useState(0); //setting local lat
  useEffect(() => {
    (async function () {
      try {
        let lat = await AsyncStorage.getItem('@lat');
        let long = await AsyncStorage.getItem('@long');
        setLat(lat);
        setLong(long);
      } catch (error) {}
    })();
  }, []);
  let {title, image, address, action, loc} = props;
  return (
    <TouchableOpacity onPress={() => action(props)}>
      {parseInt(utils.distance(loc[1], loc[0], lat, long).toFixed(1)) < 8 && (
        <ListItem
          containerStyle={[{backgroundColor: '#fff'}]}
          leftElement={
            <Images
              source={[
                {
                  uri:
                    typeof image === 'string'
                      ? image
                      : 'https://via.placeholder.com/250',
                },
                require('../../assets/images/Placeholder/no-camera.png'),
              ]}
              style={{
                width: 40,
                height: 40,
              }}
            />
          }
          key={'product'}
          subtitle={
            <RowText fontColor={'black'} fontize={12} fontFormat="Italic">
              {address}
            </RowText>
          }
          title={
            <RowText fontColor={'black'} fontize={14}>
              {title}
            </RowText>
          }
          rightTitle={
            <RowText fontColor={'black'} fontize={14}>
              {utils.distance(loc[1], loc[0], lat, long).toFixed(1)} KM Away
            </RowText>
          }
        />
      )}
      <Divider style={{backgroundColor: Darkest}} />
    </TouchableOpacity>
  );
};

export default CommanList;
