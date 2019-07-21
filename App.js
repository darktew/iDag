import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage } from 'react-native';
import './database';
import AppContainer from './navigator/RootNavigation';


export default class App extends React.Component {

  render() { 
    return (
      <AppContainer />
    );
  }
}
