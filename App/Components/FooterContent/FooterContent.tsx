import React from 'react';
import {
  Container,
  AppView,
  IconImage,
} from '../../Modules/GlobalStyles/GlobalStyle';
import { TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';

interface FooterContent {
  action: any;
}
const FooterContent = (props: FooterContent) => {
  return (
    <Container>
      <AppView marginLeft={10} items={5}>
        <IconImage
          source={require('../../assets/images/icons/home.png')}
          width={30}
          height={30}
        />
      </AppView>
      <AppView items={5}>
        <IconImage
          source={require('../../assets/images/icons/heart.png')}
          width={30}
          height={30}
        />
      </AppView>
      <TouchableOpacity onPress={() => props.action('Cart')}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/cart.png')}
            width={30}
            height={30}
          />

          <Badge
            status="error"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
            value={4}
          />
        </AppView>
      </TouchableOpacity>
      <AppView items={5}>
        <IconImage
          source={require('../../assets/images/icons/list.png')}
          width={30}
          height={30}
        />
      </AppView>
      <TouchableOpacity onPress={(e) => props.action('UserProfile')}>
        <AppView items={5}>
          <IconImage
            source={require('../../assets/images/icons/user.png')}
            width={30}
            height={30}
          />
        </AppView>
      </TouchableOpacity>
    </Container>
  );
};

export default FooterContent;
