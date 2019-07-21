import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { LayoutContainer } from '../../components/Layout'
import {
    Container,
    Label,
    Input,
    ImageProfile,
    ViewImage,
    UploadImage,
    ViewForm,
    IconImage,
    ViewContent,
    UploadView,
    ViewFooter,
    ButtonFooter,
    LabelFooter
} from './style'
import * as firebase from 'firebase'
import { ImagePicker, Permissions } from 'expo';
import Toast from 'react-native-root-toast';

// const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/idagdb.appspot.com/o/profile%2F585e4bf3cb11b227491c339a.png?alt=media&token=6cb89544-cc7e-496b-b9c8-12721e0c4177'

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            displayName: '',
            email: '',
            imagePreview: '',
        };
    }

    async componentDidMount() {
        const userData = await firebase.auth().currentUser;
        this.setState({ userData })
    }
    handleName = value => {
        this.setState({ displayName: value })
    }
    handleEmail = value => {
        this.setState({ email: value })
    }
    onChooseImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(status === 'granted') {
          const result = await ImagePicker.launchImageLibraryAsync();
          if(!result.cancelled) {
            this.setState({ imagePreview: result ? result.uri : '' });
          }
        } 
    }

    submitForm = async() => {
        const { displayName, email, userData, imagePreview } = this.state;
        const { navigation } = this.props;
        const response = await fetch(imagePreview);
        const blob = await response.blob();

        let reference = firebase.storage().ref().child(`profile/${displayName}`);
        await reference.put(blob).then(() => {
            console.log("success upload");
        }).catch((error) => {
            console.log(error);
        });

        // await firebase.auth().currentUser.updateProfile({
        //     displayName: displayName ? displayName : userData.displayName,
        //     photoURL:
        // });

        // await firebase.auth().currentUser.updateEmail(email ? email : userData.email);
        // Toast.show('แก้ไขเสร็จสิ้น', {
        //     duration: Toast.durations.SHORT,
        //     animation: true,
        //     position: Toast.positions.CENTER,
        //     delay: 0
        // })
        // navigation.navigate('Profile');
    }
    renderImage = () => {
        let { userData, imagePreview } = this.state;
        return (
            <ImageProfile
                source={{ uri: imagePreview ? imagePreview : userData.photoURL }}
            />
        )
    }

    renderForm = () => {
        return (
            <ViewForm>
                <ViewContent>
                    <Label>Name</Label>
                    <Input defaultValue={this.state.userData.displayName} onChangeText={(value) => this.handleName(value)}  />
                </ViewContent>
                <ViewContent>
                    <Label>E-mail</Label>
                    <Input defaultValue={this.state.userData.email} onChangeText={(value) => this.handleEmail(value)}  />
                </ViewContent>
            </ViewForm>
        )
    }
    render() {
        return (
            <LayoutContainer title="แก้ไขโปรไฟล์" buttonLeft={true} buttonRight={true} navigation={this.props.navigation} >
                <Container>
                    <ViewImage>
                        {this.renderImage()}
                        <UploadImage onPress={() => this.onChooseImage()}>
                            <IconImage source={require('../../assets/images/photo-camera.png')} ></IconImage>
                            <Text style={{ color: 'white', fontFamily: 'rsuRegular' }}>อัพโหลดรูปภาพ</Text>
                        </UploadImage>
                    </ViewImage>
                    {this.renderForm()}
                    <ViewFooter>
                        <ButtonFooter onPress={() => this.props.navigation.navigate('Profile')} backgroundColor="rgb(154,151,151)" textColor="white" >
                            <LabelFooter>ยกเลิก</LabelFooter>
                        </ButtonFooter>
                        <ButtonFooter onPress={() => this.submitForm()} backgroundColor="rgb(244,12,12)" textColor="white" >
                            <LabelFooter>ยืนยัน</LabelFooter>
                        </ButtonFooter>
                    </ViewFooter>
                </Container>
            </LayoutContainer>
        );
    }
}

export default EditProfile;
