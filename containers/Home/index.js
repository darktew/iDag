import React, { Component } from "react";
import {
  View,
  ScrollView,
  AsyncStorage,
  Text,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import { SearchBar, ListItem } from "react-native-elements";
import { styles } from "./style";
import { LayoutContainer } from "../../components/Layout";
import { registerForPushNotificationsAsync } from '../../config/NotificationRegister';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      userData: {},
      dataNoti: [],
      showAlert: false,
      textAlert: '',
      dataWinner: null,
    };
  }

  async componentDidMount() {
    await registerForPushNotificationsAsync();
    await this.getChannel();
    const userData = await this.getDataUser();
    await AsyncStorage.setItem(
      "keys",
      userData.winnerId ? userData.winnerId : ""
    );
    const dataWinner = await this.getWinner(userData.winnerId)
    !this.unMount && this.setState({ userData, dataWinner});
  }

  getChannel = (term = "") => {
    let list;
    if (term) {
      list = firebase
        .database()
        .ref("/channel")
        .orderByChild("name")
        .equalTo(term);
    } else {
      list = firebase.database().ref("/channel");
    }

    list.on("value", snapshot => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      const channelList = keys.map(key => ({ ...data[key], _id: key }));
      
      !this.unMount &&  this.setState({ data: channelList })
    });
  };

  getDataDetail = (id, winnerName) => {
    let date = '';
    if(moment().day() === 5) {
      date = 'friDayDetail';
    } else {
      date = 'detail';
    }
    return new Promise((resolve, reject) => {
      firebase.database().ref(`channel/${id}/${date}`).orderByChild('nameTitle').equalTo(winnerName).once('value', snapshot => {
        resolve(snapshot.val())
      })
    })
  }
  getWinner = (name) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`winner/${name}`).once('value', snapshot => {
        resolve({_id: snapshot.key , ...snapshot.val()})
      })
    })
  }
  getDataUser = () => {
    const uid = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`user/${uid}`)
        .on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  };
  handleSearch = search => {
    this.setState({
      search: search
    });

    clearTimeout(interval);
    const interval = setTimeout(() => {
      this.getChannel(search);
    }, 1000);
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  nextPage = async (e, i) => {
    const keys = await AsyncStorage.getItem("keys");
    const user = firebase.auth().currentUser;
    
    const beforeTime = moment('10:00:00', 'hh:mm:ss');
    const afterTime = moment('11:30:00', 'hh:mm:ss');
    let textAlert= '', showAlert = null;
    // if(moment().isBetween(beforeTime,afterTime)) {

    // } else {
    //   textAlert = 'ยังไม่ได้เปิดโหวต'
    // }

      if(e.isVote) {
        this.props.navigation.navigate("Index", {
          _id: e._id,
          name: e.name,
          uid: user.uid,
          timeCount: e.timeCount,
          detailContent: moment().day() === 5 ? Object.values(e.friDayDetail) : Object.values(e.detail)
        });
      } else if(!e.isVote && keys) {
        const dataWinner = await this.getWinner(keys);        
        const dataDetail = await this.getDataDetail(e._id,dataWinner.winnerName);
        const checkDetail = dataDetail && dataDetail[0] ? dataDetail[0] : Object.values(dataDetail)[0];
        if(moment().day() !== 5 && dataDetail && checkDetail.menuRes) {
          this.props.navigation.navigate("Menu", {
            winnerName: dataWinner.winnerName ,
            data: {_id: e._id, ...checkDetail},
            timeCount: e.timeCount
          })
          showAlert = false;
        } else if(moment().day() !== 5 && dataDetail && !checkDetail) {
          textAlert = `รอสั่ง ${dataWinner.winnerName}`;
          showAlert = true;
        } else if(moment().day() === 5) {
          textAlert = `รอไปกินข้าวที่ฟิวเจอร์`
          showAlert = true;
        }
      } else {
        textAlert = 'คุณทำการสั่งซื้อแล้ว';
        showAlert = true;
      }

    this.setState({
      showAlert,
      textAlert
    })
  };

  editOrder = async(dataWinner, channelId) => {
    const winner = dataWinner;
    const dataDetail = await this.getDataDetail(channelId,dataWinner.winnerName);
    const checkDetail = dataDetail && dataDetail[0] ? dataDetail[0] : Object.values(dataDetail)[0];
    this.props.navigation.navigate("Menu", {
      winnerName: winner.winnerName,
      data: {_id: channelId, ...checkDetail},
      timeCount: moment(winner.date)
    })
  }

  componentWillUnmount() {
    this.unMount = true;
  }


  renderOrderUser = () => {
    const {userData, dataWinner} = this.state;
    if(dataWinner && userData && userData.order && userData.order[dataWinner.date]) {
      return (
        <TouchableOpacity style={styles.userOrder} onPress={() => this.editOrder(dataWinner, dataWinner.channelId)}>
          <Text style={styles.textOrder}>รายการสั่งซื้อของคุณ</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
    
  }
  
  renderItems = () => {
    const { data } = this.state;
    return data.map((e, i) => {
      return (
        <ListItem
          key={"item" + i}
          title={e.name}
          chevron
          chevronColor="black"
          titleStyle={styles.titleStyle}
          bottomDivider
          onPress={() => this.nextPage(e, i)}
        />
      );
    });
  };

  render() {
    const { showAlert, textAlert } = this.state;
    return (
      <View style={styles.container}>
        <LayoutContainer
          title="หน้าหลัก"
          buttonLeft={true}
          buttonRight={true}
          navigation={this.props.navigation}
        >
          <SearchBar
            placeholder="ค้นหา"
            platform="ios"
            onChangeText={this.handleSearch}
            style={{ backgroundColor: 'rgb(237, 237, 237)'  }}
            value={this.state.search}
          />
          {this.renderOrderUser()}
          <ScrollView>{this.renderItems()}</ScrollView>
        </LayoutContainer>
        <AwesomeAlert 
            show={showAlert}
            showProgress={false}
            title={textAlert}
            titleStyle={{ fontFamily: 'rsuBold', fontSize: 22 }}
            closeOnTouchOutside={true}
            onCancelPressed={() => {
              this.hideAlert();
            }}
        />
      </View>
    );
  }
}

export default Home;
