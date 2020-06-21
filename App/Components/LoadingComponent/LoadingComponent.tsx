import React from 'react';
import {View} from 'react-native';
import {RowText} from '../../Modules/GlobalStyles/GlobalStyle';
const LoadingComponent = () => {
  return (
    <View style={{jusifyContent: 'center', alignItems: 'center'}}>
      <RowText fontColor={'grey'} fontize={12}>
        {taugth}
      </RowText>
    </View>
  );
};

const taugth = `Love only grows by sharing. You can only have more for yourself by giving it away to others`;

export default LoadingComponent;
