import React from 'react';
import { View } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { RowView, IconImage } from '../../Modules/GlobalStyles/GlobalStyle';
import { ScrollView } from 'react-native-gesture-handler';

const UserProfile = () => {
  return (
    <View style={{ flexDirection: 'column', padding: 15 }}>
      <View style={{ flexDirection: 'row', marginBottom: 9 }}>
        <Avatar
          rounded
          containerStyle={{ width: 80, height: 80 }}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          showAccessory
        />
        <View
          style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
          <RowView fontColor={'black'} fontize={22}>
            Anrag Kush
          </RowView>
          <RowView fontColor={'grey'} fontFormat={'Italic'} fontize={12}>
            A4 519 Palm grooves Apartment
          </RowView>
        </View>
      </View>
      <Divider style={{ margin: 10 }} />
      <RowView fontColor={'black'} style={{ marginBottom: 5 }} fontize={18}>
        Saved Address
      </RowView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: 220,
            height: 130,
            borderWidth: 0,
            // alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#1D65A6',
            backgroundColor: '#ffff',
            borderRadius: 14,
            marginLeft: 10,
          }}>
          <RowView fontColor={'black'} paddingLeft={10} fontize={12}>
            Mayank Dwivedi (Self)
          </RowView>
          <RowView
            paddingLeft={15}
            fontFormat="Italic"
            fontColor={'black'}
            fontize={14}>
            +91 9936142128
          </RowView>
          <Divider style={{ margin: 10 }} />
          <RowView
            paddingLeft={10}
            fontColor={'black'}
            fontFormat="Normal"
            fontize={12}>
            A4 519 Palm Grooves Apartment Chandapura, Banglore,560100
          </RowView>
          <IconImage
            source={require('../../assets/images/icons/delete.png')}
            width={30}
            height={30}
            margin={1}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </ScrollView>
      <Divider style={{ margin: 10 }} />
    </View>
  );
};

export default UserProfile;
