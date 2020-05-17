import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {RowView} from '../../Modules/GlobalStyles/GlobalStyle';
import AddRemoveBtn from '../AddRemoveBtn/AddRemoveBtn';
import {Darkest} from '../../Modules/GlobalStyles/GlobalColors';

interface CommanListProps {
  title: string;
  image: string;
  address: string;
  action: (arg0: Object) => void;
}
const CommanList = (props: CommanListProps) => {
  let {title, image, address, action} = props;
  return (
    <TouchableOpacity onPress={() => action(props)}>
      <ListItem
        containerStyle={[{backgroundColor: '#eeeeee'}]}
        leftElement={
          <Image
            source={{
              uri: image,
            }}
            style={{width: 40, height: 40}}
          />
        }
        key={'product'}
        subtitle={
          <RowView fontColor={'black'} fontize={12} fontFormat="Italic">
            {address}
          </RowView>
        }
        title={
          <RowView fontColor={'black'} fontize={14}>
            {title}
          </RowView>
        }
        rightTitle={
          <RowView fontColor={'black'} fontize={14}>
            2 KM Away
          </RowView>
        }
      />
      <Divider style={{backgroundColor: Darkest}} />
    </TouchableOpacity>
  );
};

export default CommanList;
