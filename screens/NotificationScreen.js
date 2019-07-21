import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Notification from '../containers/Notification/index';
class NotificationScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Notification {...this.props} />
    );
  }
}

export default NotificationScreen;
