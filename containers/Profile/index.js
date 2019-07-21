import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { LayoutContainer } from '../../components/Layout';
import * as firebase from 'firebase';
import {
  ViewImage,
  ViewProfile,
  TextContent,
  ButtonEdit,
  ImageProfile,
  ViewContent,
  Budget,
  OutStanding,
  TextMoney
}
  from './style';
import moment from 'moment'
import "moment/locale/th";
import { ListItem } from 'react-native-elements';


const defaultImage = "https://firebasestorage.googleapis.com/v0/b/idagdb.appspot.com/o/profile%2F585e4bf3cb11b227491c339a.png?alt=media&token=6cb89544-cc7e-496b-b9c8-12721e0c4177"
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      data: {},
      orderUser: {},
    };
  }

  async componentDidMount() {
      const [data] = await Promise.all([this.getBudget()])
      this.setState({ userData: firebase.auth().currentUser, data });
  }
  getBudget = async () => {
    let userData = firebase.auth().currentUser;
    let list = firebase.database().ref(`user/${userData.uid}`)
    return new Promise((resolve, reject) => {
      list.on('value', (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  _logout = () => {
    firebase.auth().signOut();
  }
  setHistory = () => {
    const { data } = this.state;  
    let listItem = [];
    data && data.order && Object.keys(data.order).map((value,index) => {
        data.order[value].map((e,i) => {
          listItem.push(
            <ListItem 
            key={`list${index}-${i}`}
            title={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontFamily: 'rsuBold', paddingRight: 10 }}>{e.restName}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'rsuBold' }}>{`วันที่ ${moment(parseInt(value)).add(543,'years').format('ll')}`}</Text>
              </View>
            }
            subtitle={
              `${e.nameMenu}`
            }
            rightTitle={`${e.sumPrice} ฿`}
            titleStyle={{ flex: 1 }}
            topDivider
            bottomDivider
            subtitleStyle={{ fontFamily: 'rsuRegular' }}
            rightContentContainerStyle={{ justifyContent: 'center' }}
            rightTitleStyle={{ flex: 1, color: 'black', fontFamily: 'rsuBold', fontSize: 24 }}
          />
          )
        })
    });
    return listItem;
    // let keysArr = [];
    // let dataArr = [];
    // let dataUser = [];
    // let itemList = [];
    // listOrder.map((e, i) => {
    //   keysArr = Object.keys(e);
    //   dataArr = Object.values(e);
    // });

    // keysArr.map((key, i) => {
    //   dataUser.push({ _id: key, ...dataArr[i] })
    // })
    // dataUser.map((e, i) => {
    //   let listData = firebase.database().ref(`winner/${e._id}/userOrder/${firebase.auth().currentUser.uid}`)
    //   listData.once('value', async(snapshot) => {
    //     const snap = snapshot.val();
        
    //     if (snap && snap.order !== null) {
    //       let dataUsing =  Object.values(snap.order).reduce((prev, current, index) => {
    //         prev.nameMenu += current.nameMenu + " ";
    //         prev.sumPrice += current.sumPrice;
    //         return prev;
    //       }, { nameMenu: '', sumPrice: 0 });
    //       let checkOutstanding = data.budget - dataUsing.sumPrice;
    //       itemList.push(
    //         <ListItem
    //           key={"item" + i}
    //           title={
    //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //               <Text style={{ fontSize: 22, fontFamily: 'rsuBold', paddingRight: 10 }}>{e.winnerName}</Text>
    //               <Text style={{ fontSize: 14, fontFamily: 'rsuBold' }}>{`วันที่ ${moment(new Date(e.date)).add(543,'years').format('ll')}`}</Text>
    //             </View>
    //           }
    //           subtitle={
    //             dataUsing.sumPrice && (checkOutstanding >= 0) ?
    //               `${dataUsing.nameMenu} ไม่มียอดค้างชำระ`
    //               :
    //               `${dataUsing.nameMenu} ยอดค้างชำระ ${Math.abs(checkOutstanding)} บาท`
    //           }
    //           topDivider
    //           bottomDivider
    //           leftAvatar={{ source: { uri: e.imageRes ? e.imageRes : '' } }}
    //           rightTitle={`${dataUsing ? dataUsing.sumPrice : 0} ฿`}
    //           containerStyle={{ marginTop: 20, overflow: 'scroll' }}
    //           titleStyle={{ flex: 1 }}
    //           subtitleStyle={{ fontFamily: 'rsuRegular' }}
    //           rightContentContainerStyle={{ justifyContent: 'center' }}
    //           rightTitleStyle={{ flex: 1, color: 'black', fontFamily: 'rsuBold', fontSize: 24 }}
    //         />
    //       )
    //     } else {
    //       return itemList;
    //     }
    //   })
    // })
    // return itemList
  }
  renderImage = () => {
    let { userData } = this.state;

    return (
      <ImageProfile
        source={{ uri: userData.photoURL ? userData.photoURL : defaultImage }}
      />
    )
  }
  renderContentProfile = () => {
    let { userData, data } = this.state;
    return (
      <View style={{ flex:1 }}>
        <ViewProfile>
          <TextContent>{userData.displayName}</TextContent>
          <TextContent>{userData.email}</TextContent>
          {/* onPress={() => this.props.navigation.navigate('EditProfile')} */}
          <ButtonEdit onPress={() => Alert.alert("Coming Soon...")}  >
            <Text style={{ color: 'white', fontFamily: 'rsuRegular', fontSize: 20 }}>แก้ไข</Text>
          </ButtonEdit>
        </ViewProfile>
        <ViewContent>
          <Budget>
            <TextMoney>{data.budget} ฿</TextMoney>
            <Text style={{ color: 'white', fontFamily: 'rsuRegular', fontSize: 18 }}>ยอดคงเหลือ</Text>
          </Budget>
          <OutStanding>
            <TextMoney>{data.outstanding} ฿</TextMoney>
            <Text style={{ color: 'white', fontFamily: 'rsuRegular', fontSize: 18 }}>ยอดเงินค้างชำระ</Text>
          </OutStanding>
        </ViewContent>
      </View>
    )
  }

  renderListItem = () => {
    return (
      <View style={{ flex:1 }}>
        {this.setHistory()}
      </View>
    )
  }

  render() {
    let { userData } = this.state;
    return (
      <LayoutContainer title="โปรไฟล์" username={userData.displayName} buttonLeft={true} buttonRight={true} navigation={this.props.navigation} >
        <ViewImage>
          {this.renderImage()}
        </ViewImage>
        {this.renderContentProfile()}
        {this.renderListItem()}
      </LayoutContainer>
    );
  }
}

export default Profile;
