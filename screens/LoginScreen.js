import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import Login from '../containers/Login';
import { Font } from 'expo'
class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <Login {...this.props}/>
        );
    }
}
export default LoginScreen;
