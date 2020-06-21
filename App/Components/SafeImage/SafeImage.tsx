import React from 'react';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class Images extends React.Component {
  static defaultProps = {
    source: [],
    onError: () => {},
  };

  state = {current: 0};

  onError = (error: any) => {
    this.props.onError(error);
    const next = this.state.current + 1;
    if (next < this.props.source.length) {
      this.setState({current: next});
    }
  };

  render() {
    const {onError, source, ...rest} = this.props;
    return (
      <FastImage
        source={source[this.state.current]}
        resizeMode={FastImage.resizeMode.contain}
        onError={this.onError}
        {...rest}
      />
    );
  }
}
