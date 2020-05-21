import React from 'react';
import {Dimensions} from 'react-native';
import {
  Container,
  AppView,
  RowText,
  IconImage,
} from '../../Modules/GlobalStyles/GlobalStyle';

interface NavProps {
  titleName: string;
}
const windowWidth = Dimensions.get('window').width;
const AppHeader = (props: NavProps) => (
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
        <IconImage
          source={require('../../assets/images/icons/search.png')}
          width={24}
          height={24}
        />
      </AppView>
      <AppView width={35} marginHeight={1} height={5} iPosition={'flex-end'}>
        <IconImage
          source={require('../../assets/images/icons/notificationBell.png')}
          width={24}
          height={24}
        />
      </AppView>
    </Container>
    {/*Header END */}
  </>
);

export default AppHeader;
