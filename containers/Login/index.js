import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import styles from './style';
import * as firebase from 'firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValidate: false,
        };
    }

    _signInAsync = async () => {
     if (this.state.isValidate) {
            await firebase
            .auth()
            .signInWithEmailAndPassword(this.state.username, this.state.password)
            this.props.navigation.navigate('App');
        } else {
            alert("Form is Validate");
        }
    };

    handleValidate = (value, type) => {
        if (type === 'username') {
            this.setState({ username: value })
        } else if (type === 'password') {
            this.setState({ password: value })
        }
        if (this.state.username && this.state.password) {
            this.setState({ isValidate: true })
        }
    }

    renderLogin = () => {
            return (
                    <ScrollView>
                        <View style={styles.layerUser}>
                            <Text style={styles.label}>รหัสผู้ใช้</Text>
                                <TextInput
                                    label='Username'
                                    onChangeText={(username) => this.handleValidate(username, 'username')}
                                    placeholder='กรุณากรอกรหัสผู้ใช้'
                                    value={this.state.username}
                                    style={styles.input}
                                    autoFocus={true}
                                />
                        </View>
                        <View style={styles.layerPassword}>
                            <Text style={styles.label}>รหัสผ่าน</Text>
                            <TextInput
                                label='Username'
                                onChangeText={(password) => this.handleValidate(password, 'password')}
                                placeholder='กรุณากรอกรหัสผู้ใช้'
                                value={this.state.password}
                                style={styles.input}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.layerButton}>
                            <TouchableOpacity
                                onPress={() => this._signInAsync()}
                                style={styles.button}
                            >
                                <Text style={styles.labelButton}>ลงชื่อเข้าใช้</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
            )
    }

    renderLogo = () => {
        return (
            <Image
                source={require('../../assets/images/iDAG_logo_E.png')}
                style={styles.logo}
            />
        )
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <View style={styles.layerLogo}>
                    {this.renderLogo()}
                </View>
                {this.renderLogin()}
            </View>
        );
    }
}

export default Login;
