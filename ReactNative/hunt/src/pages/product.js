import React, {Component} from 'react';

import {WebView} from 'react-native-webview';

export default class Product extends Component {
  componentDidMount() {
    const {navigation} = this.props;
    const {product} = this.props.route.params;

    navigation.setOptions({
      title: product.title,
    });
  }

  render() {
    const {product} = this.props.route.params;

    return <WebView source={{uri: product.url}} />;
  }
}
