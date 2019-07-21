import {
  Container,
  Header,
  Content,
  Button,
  Footer,
  FooterTab,
  Badge,
  Icon,
  Text,
  Item,
  Input,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';

export const LayoutContainer = (props) => {
  return (
    <Container style={{ width: '100%' }}>
      <Header
        iosBarStyle={'light-content'}
        androidStatusBarColor={'#B10000'}
        style={{ alignItems: 'center', backgroundColor: '#B10000', height: 80 }}
      >
        <Left style={{ display: `${props.buttonLeft === true ? 'none' : 'flex'}` }} >
          <Button
            transparent
            onPress={() => props.navigation.goBack()}
          >
            <Icon name='arrow-back' style={{ color: 'white', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }} />
            <Text style={{ color: 'white', fontSize: 17, display: Platform.OS === "android" ? 'none' : 'flex' }}>Back</Text>
          </Button>
        </Left>
        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
          {
            props.username ?
            <Title style={{ fontFamily: 'rsuBold', fontSize: props.textSize || 28, color: '#fff',paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
              {props.username}
            </Title>
            :
            <Title style={{ fontFamily: 'rsuBold', fontSize: props.textSize || 25, color: '#fff',paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
              {props.title}
            </Title>
          }
        </Body>
        <Right style={{ display: `${props.buttonRight === true ? 'none' : 'flex'}` }} >
          <Button
            transparent
            onPress={() => props.funcSubmit()}
            style={{ display: `${props.button === true ? 'none' : 'flex'}` }} 
          >
            <Text style={{ color: 'white', fontSize: 17, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>ถัดไป</Text>
          </Button>
        </Right>
      </Header>
      <Content style={{ width: '100%' }} scrollEnabled={true}>
        {props.children}
      </Content>
      <Footer >
        <FooterTab style={{ backgroundColor: Platform.OS === "android" ? 'lightgray' : '' }}>
          <Button
            active={props.title === "หน้าหลัก" ? true : false}
            vertical
            onPress={() => props.navigation.navigate('Home')}
            style={{ backgroundColor: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "หน้าหลัก" ? 'rgb(211,225,245)' : '' }} >
            <Icon name="home" style={{ color: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "หน้าหลัก" ? 'rgb(41,124,246)' : 'rgb(107,107,107)'  }} />
            <Text style={{ fontFamily: 'rsuRegular', fontSize: 12, color: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "หน้าหลัก" ? 'rgb(41,124,246)' : 'rgb(107,107,107)'  }}>หน้าหลัก</Text>
          </Button>
          <Button active={props.title === "โปรไฟล์" ? true : false}
            vertical
            onPress={() => props.navigation.navigate("Profile")}
            style={{ backgroundColor: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "โปรไฟล์" ? 'rgb(211,225,245)' : '' }} >
            <Icon name="person" style={{ color: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "โปรไฟล์" ? 'rgb(41,124,246)' : 'rgb(107,107,107)' }} />
            <Text style={{ color: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "โปรไฟล์" ? 'rgb(41,124,246)' : 'rgb(107,107,107)' }}>Profile</Text>
          </Button>
          <Button active={props.title === "แจ้งเตือน" ? true : false}
            vertical
            onPress={() => props.navigation.navigate("Notification")}
            style={{ backgroundColor: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "แจ้งเตือน" ? 'rgb(211,225,245)' : ''  }}>
            <Icon name="notifications" style={{ color: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "แจ้งเตือน" ? 'rgb(41,124,246)' : 'rgb(107,107,107)'  }} />
            <Text style={{ fontFamily: 'rsuRegular', fontSize: 12, color: (Platform.OS === "android" || Platform.OS === "ios") && props.title === "แจ้งเตือน" ? 'rgb(41,124,246)' : 'rgb(107,107,107)'}}>แจ้งเตือน</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

