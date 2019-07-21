import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Confirm from '../containers/Confirm/index'

class ConfirmScreen extends Component {
  static navigationOptions = {
      header: null
    };
  render() {
    return (
      <Confirm {...this.props}/>
    );
  }
}

export default ConfirmScreen;
