import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EditProfile from '../containers/EditProfile/index'

class EditProfileScreen extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
           <EditProfile {...this.props} />
        );
    }
}

export default EditProfileScreen;
