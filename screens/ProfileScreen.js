import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Profile from '../containers/Profile/index';

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
     <Profile {...this.props}/>
    );
  }
}

export default ProfileScreen;
