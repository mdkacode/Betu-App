import React from 'react';
import {AppState, Alert, AsyncStorage} from 'react-native';
import EntryComponent from './App/Views/Entry';
import OfflineNotice from './App/misc/internetCheck';
// import './App/wdyr';

class App extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState: any) => {
    await removeItemValue('@allProducts');
    if (nextAppState === 'inactive') {
      console.log('the app is closed');
    }
  };
  render() {
    return (
      <>
        <OfflineNotice />
        <EntryComponent />
      </>
    );
  }
}

export default App;

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}