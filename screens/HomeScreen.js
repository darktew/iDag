import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import Home from '../containers/Home/index';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    
    return (
      <Home {...this.props} />
    );
  }

}


export default HomeScreen;
