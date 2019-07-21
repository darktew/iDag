import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Menu from '../containers/Menu/index'
class MenuScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
     <Menu {...this.props} />
    );
  }
}

export default MenuScreen;
