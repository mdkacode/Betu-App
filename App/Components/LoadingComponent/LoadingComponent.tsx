import React from 'react';
import {View} from 'react-native';
import {RowView} from '../../Modules/GlobalStyles/GlobalStyle';
const LoadingComponent = () => {
  return (
    <View style={{jusifyContent: 'center', alignItems: 'center'}}>
      <RowView fontColor={'grey'} fontize={12}>
        {taugth}
      </RowView>
    </View>
  );
};

const taugth = `Love only grows by sharing. You can only have more for yourself by giving it away to others`;

export default LoadingComponent;
