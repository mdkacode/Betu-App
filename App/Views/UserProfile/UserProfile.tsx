import React from 'react';
import {View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {RowText, IconImage} from '../../Modules/GlobalStyles/GlobalStyle';
import {ScrollView} from 'react-native-gesture-handler';

const UserProfile = () => {
  return (
    <View style={{flexDirection: 'column', padding: 15}}>
      <View style={{flexDirection: 'row', marginBottom: 9}}>
        <Avatar
          rounded
          containerStyle={{width: 80, height: 80}}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          showAccessory
        />
        <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10}}>
          <RowText fontColor={'black'} fontize={22}>
            Anrag Kush
          </RowText>
          <RowText fontColor={'grey'} fontFormat={'Italic'} fontize={12}>
            A4 519 Palm grooves Apartment
          </RowText>
        </View>
      </View>
      <Divider style={{margin: 10}} />
      <RowText fontColor={'black'} style={{marginBottom: 5}} fontize={18}>
        Saved Address
      </RowText>
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
          <RowText fontColor={'black'} paddingLeft={10} fontize={12}>
            Mayank Dwivedi (Self)
          </RowText>
          <RowText
            paddingLeft={15}
            fontFormat="Italic"
            fontColor={'black'}
            fontize={14}>
            +91 9936142128
          </RowText>
          <Divider style={{margin: 10}} />
          <RowText
            paddingLeft={10}
            fontColor={'black'}
            fontFormat="Normal"
            fontize={12}>
            A4 519 Palm Grooves Apartment Chandapura, Banglore,560100
          </RowText>
          <IconImage
            source={require('../../assets/images/icons/delete.png')}
            width={30}
            height={30}
            margin={1}
            style={{alignSelf: 'center'}}
          />
        </View>
      </ScrollView>
      <Divider style={{margin: 10}} />
    </View>
  );
};

export default UserProfile;
