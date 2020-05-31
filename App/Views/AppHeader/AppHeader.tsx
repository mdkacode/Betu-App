import React, { useContext } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import {
  Container,
  AppView,
  RowText,
  IconImage,
} from '../../Modules/GlobalStyles/GlobalStyle';
import { ApplicationContext } from '../../Modules/context';

interface NavProps {
  titleName?: string;
  locationHandler?: any;
  navigation?: any;
}
const windowWidth = Dimensions.get('window').width;

const AppHeader = (props: NavProps) => {
  const store = useContext(ApplicationContext);
  const locationHandler = () => {
    props.navigation.navigate('FilterProducts');
  };
  return (
    <>
      <Container>
        <AppView
          width={windowWidth - 55}
          marginHeight={1}
          height={25}
          iPosition={'flex-start'}>
          <RowText paddingLeft={0} fontColor="black">
            {props.titleName}
          </RowText>
        </AppView>
        <AppView marginHeight={1} height={5} iPosition={'flex-end'}>
          <TouchableOpacity onPress={locationHandler}>
            <IconImage
              source={require('../../assets/images/icons/search.png')}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </AppView>

        {/* <AppView width={35} marginHeight={1} height={5} iPosition={'flex-end'}>
          <TouchableOpacity onPress={locationHandler}>
            <IconImage
              source={require('../../assets/images/icons/notificationBell.png')}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </AppView> */}
      </Container>
      {/*Header END */}
    </>
  );
};

export default AppHeader;
