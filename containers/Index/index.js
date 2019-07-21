import React, { Component } from "react";
import { View, Text , AsyncStorage } from "react-native";
import { LayoutContainer } from "../../components/Layout";
import { PopupContaineer, PopupContainer } from "../../components/Popup";
import * as firebase from "firebase";
import { BudgetTab, TextTitle, TextTime, ContentPopup, ImageCheck } from "./style";
import { ListItem } from "react-native-elements";
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      data: [],
      countDown: "",
      isVote: false,
      winner: {},
      currentVote: null,
      uid: "",
      showAlert: false,
      typeVote: '',
      textVote: '',
      indexVote: null,
    };
  }
  async componentDidMount() {
    this.getList();
    this.getTimeCount();
    this.getCurrentVote();
  }
  getTimeCount = () => {
    const { navigation } = this.props;
    const timeVote = navigation.getParam("timeCount");
    let countDown = new Date(timeVote).getTime();
    this.interval = setInterval(async () => {
      let now = new Date().getTime();
      let distance = countDown - now;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let show =
        `${minutes < 10 ? "0" + minutes : minutes}:` +
        `${seconds < 10 ? "0" + seconds : seconds}` +
        " น.";
      // navigation.navigate("Menu", {
      //   winner: { _id: result.key, ...dataWinner },
      //   data: winner.data ? winner.data[winner.result.index] : []
      // firebase
      //   .database()
      //   .ref("winner")
      //   .orderByChild('date')
      //   .equalTo(moment(new Date(timeVote)).valueOf())
      //   .on("value", async(snapshot) => {
      //     const snap = snapshot.val();
      //     const keys = Object.keys(snap)
      //     const dataWinner = keys.map(key => ({ _id: key, ...snap[key] }));
      // });
      if (distance < 0) {
        clearInterval(this.interval);
        const winner = await this.setWinner();
        if(moment().get('day') !== 5 && winner.data[winner.result.index].menuRes.length !== 0) {
          navigation.navigate("Menu", {
            winnerName: winner.data[winner.result.index].nameTitle ,
            data: winner.data ? winner.data[winner.result.index] : []
          });
        } else {
          navigation.navigate("Home");
        }
        this.setState({ isVote: false });
      } else {
        this.setState({ countDown: show, isVote: true });
      }
    }, 1000);
    // this.setState({  isVote: true });
  };

  getCurrentVote = () => {
    const dataVote = firebase
      .database()
      .ref(`user/${firebase.auth().currentUser.uid}`);
      dataVote.on("value", snapshot => {
        const vote = snapshot.val();
        !this.isCancelled && this.setState({ currentVote: vote ? vote.currentVote : null });
      });
  };

  getList = () => {
    let { navigation } = this.props;
    let id = navigation.getParam("_id");
    let date = '';
    if(moment().day() !== 5) {
      date = 'detail';
    } else {
      date = 'friDayDetail';
    }
    firebase.database().ref(`channel/${id}/${date}`).on('value', snapshot => {
      const detailList = snapshot.val();
      const data = detailList.map((e,i) => 
      (
        { _id: id, 
          nameTitle: e.nameTitle,
          type: e.type,
          imageRes: e.imageRes,
          vote: e.vote,
          menuRes: e.menuRes ? e.menuRes : []
        }
        )
      );
      this.setState({ data })
    })
      // firebase.database().ref(`channel/${id}/friDayDetail`).on('value', snapshot => {
      //   const detailList = snapshot.val();
      //   const data = detailList.map((e,i) => 
      //     (
      //       { _id: id, 
      //         nameTitle: e.nameTitle,
      //         type: e.type,
      //         imageRes: e.imageRes,
      //         vote: e.vote,
      //         menuRes: e.menuRes ? e.menuRes : []
      //       }
      //       )
      //     );
      //   this.setState({ data })
      // })
  };

  setCurrentVote = (index, type) => {
    let { currentVote } = this.state;
    const { navigation } = this.props;
    const id = navigation.getParam("_id");
    let plus = 0;
    let date = '';
    if(moment().day() === 5) {
      date = 'friDayDetail';
    } else {
      date = 'detail';
    }
    if(type === 'add') {
      plus = 1;
      if(currentVote) {
        const ref = firebase.database().ref(`channel/${id}/${date}/${currentVote - 1}/vote`);
        ref.transaction((vote) => {
          return (vote || 0) - 1;
        });
      }
      firebase.database().ref(`user/${firebase.auth().currentUser.uid}`).update({
        currentVote: index + 1
      });
    } else {
      plus = -1;
      firebase.database().ref(`user/${firebase.auth().currentUser.uid}`).update({
        currentVote: null
      });
    }
    const ref = firebase.database().ref(`channel/${id}/${date}/${index}/vote`);
    ref.transaction((vote) => {
      return (vote || 0) + plus;
    });
    this.setState({
      showAlert: false
    })
  };

  onVote = (name, index) => {
    const { currentVote } = this.state;
    let msg = null, typeVote = null;
    if (!currentVote || (currentVote && currentVote !== index + 1)) {
      msg = `คุณต้องการโหวต ${name} หรือไม่`;
      typeVote = 'add';
    } else {
      msg = `คุณต้องการยกเลิกโหวต ${name} หรือไม่`;
      typeVote = 'cancel'
    }
    this.setState({
      textVote: msg,
      showAlert: true,
      typeVote,
      indexVote: index
    })
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  setWinner = () => {
    const { data } = this.state;
    const result = data.reduce(
      (prev, current, index) => {
        if (prev.max < current.vote) {
          prev.max = current.vote;
          prev.index = index;
        }
        if (prev.min > current.vote) {
          prev.min = current;
        }
        return prev;
      },
      { max: 0, min: 0, index: 0}
    );
    return { result: result, data: data };
  };

  componentWillUnmount() {
    this.isCancelled = true;
    clearInterval(this.interval);
  }

  renderItem = () => {
    let { data, isVote, currentVote } = this.state;
    return data.map((e, i) => {
      return (
          <ListItem
            key={"itemKey" + i}
            title={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: "rsuRegular", fontSize: 20  }}>{e.nameTitle}</Text>
                <ImageCheck source={require('../../assets/images/checklist.png')} display={currentVote - 1 === i ? 'flex' : 'none'} />
              </View>
            }
            subtitle={e.type}
            leftAvatar={{ source: { uri: e.imageRes ? e.imageRes : "" } }}
            subtitleStyle={{ fontFamily: "rsuRegular", fontSize: 16 }}
            rightTitle={e.vote + " vote"}
            rightTitleStyle={{ fontFamily: "rsuRegular", fontSize: 20 }}
            bottomDivider
            onPress={
              isVote
                ? () => this.onVote(e.nameTitle, i)
                : () => console.log("ending Vote")
            }
          />

      );
    });
  };
  render() {
    const { countDown, showAlert, textVote, typeVote, indexVote} = this.state;
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LayoutContainer
        title="เลือกร้านอาหาร"
        buttonLeft={false}
        buttonRight={false}
        button={true}
        navigation={this.props.navigation}
      >
        <BudgetTab>
          <TextTitle>เวลาในการโหวต</TextTitle>
          <TextTime>{countDown}</TextTime>
        </BudgetTab>
        {this.renderItem()}
      </LayoutContainer>
       <AwesomeAlert 
          show={showAlert}
          showProgress={false}
          title={textVote}
          titleStyle={{ fontFamily: 'rsuBold', fontSize: 22, textAlign: 'center', color: 'black' }}
          closeOnTouchOutside={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="ยกเลิก"
          confirmText="ยืนยัน"
          confirmButtonColor={'#EB0000'}
          cancelButtonColor={'#9B9797'}
          cancelButtonTextStyle={{ fontFamily: 'rsuBold', fontSize: 20, color: '#fff' }}
          confirmButtonTextStyle={{ fontFamily: 'rsuBold', fontSize: 20, color: '#fff' }}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.setCurrentVote(indexVote, typeVote);
          }}
        />
      </View>
    );
  }
}

export default Index;
