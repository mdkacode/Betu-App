import React from 'react';
import AppLayout from './AppLayout/AppLayout';
import {StatusBar} from 'react-native';
const EntryComponent = () => {
  console.disableYellowBox = true;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#eeee"
        //Background color of statusBar only works for Android
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      />
      <AppLayout />
    </>
  );
};

export default EntryComponent;
