import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  AsyncStorage
} from 'react-native';
import * as firebase from 'firebase';
import Login from './LoginScreen';
import Home from './HomeScreen';
import { Font } from 'expo';

class LoginLoaddingScreen extends Component {
  state = {
    loading: false,
    authenticated: false
  }

  async componentDidMount() {
     await this.onLoadFont();
    this.authListining = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.timeout = setTimeout(() => 
        this.props.navigation.navigate("App")
        ,1000)
        // firebase.database().ref(`user/${user.uid}`).update({
        //   tokenUser: token
        // })
      } else {
        this.timeout = setTimeout(() => {
          this.props.navigation.navigate("Auth")
        }, 1000) 
      }
    });
  }
onLoadFont = () => {
    return new Promise((resolve, reject) => {
        resolve(Font.loadAsync({
            'rsuLight': require('../assets/fonts/RSU_light.ttf'),
            'rsuRegular': require('../assets/fonts/RSU_Regular.ttf'),
            'rsuBold': require('../assets/fonts/RSU_BOLD.ttf'),
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
        }))
    })
}
  componentWillUnmount() {
    this.authListining()
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginLoaddingScreen;
