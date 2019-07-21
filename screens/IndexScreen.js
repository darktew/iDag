import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Index from '../containers/Index/index';

class IndexScreen extends Component {
    static navigationOptions = {
        header: null
      };
  render() {
    return (
        <Index {...this.props} />
    );
  }
}

export default IndexScreen;
