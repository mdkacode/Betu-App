import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {RowView} from '../../Modules/GlobalStyles/GlobalStyle';
import AddRemoveBtn from '../AddRemoveBtn/AddRemoveBtn';
import {Darkest} from '../../Modules/GlobalStyles/GlobalColors';

const ListProduct = () => {
  return (
    <TouchableOpacity>
      <ListItem
        containerStyle={[{backgroundColor: '#eeeeee'}]}
        leftElement={
          <Image
            source={{
              uri:
                'https://www.lays.ca/sites/lays.ca/files/30015469_Lay%27s_Roast%20Chicken_235g.png',
            }}
            style={{width: 40, height: 40}}
          />
        }
        key={'product'}
        subtitle={
          <RowView fontColor={'black'} fontize={12} fontFormat="Italic">
            Lays Chips
          </RowView>
        }
        title={
          <RowView fontColor={'black'} fontize={14}>
            Lays Chips
          </RowView>
        }
        rightTitle={<AddRemoveBtn defaultValue={0} />}
      />
      <Divider style={{backgroundColor: Darkest}} />
    </TouchableOpacity>
  );
};

export default ListProduct;
