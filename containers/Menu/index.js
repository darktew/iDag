import React, { Component } from "react";
import { View, Text, Button, AsyncStorage, StyleSheet, KeyboardAvoidingView } from "react-native";
import { ListItem } from "react-native-elements";
import { LayoutContainer } from "../../components/Layout";
import {
  BudgetTab,
  TextTitle,
  TextBudget,
  ButtonConfirm,
  LabelButton,
  ViewFooter,
  CustomInput,
  ContentPopup,
  TextShowMenuName,
  ViewNumberic
} from "./style";
import * as firebase from "firebase";
import { PopupContainer } from "../../components/Popup";
import NumericInput from "react-native-numeric-input";
import moment from 'moment';
import { Platform } from "expo-core";


class Menu extends Component {
  isChoose = false;
  constructor(props) {
    super(props);
    this.state = {
      winnerName: '',
      budget: 0,
      dataList: [],
      // isChoose: false,
      visible: false,
      index: 0,
      customInput: "",
      value: 0,
      type: "",
      idChannel: "",
      menuCustom: "",
      menuName: "",
      timeCount : "",
      order: []
    };
  }

  async componentDidMount() {
    await this.getBudget();
    const timeCount = this.props.navigation.getParam("timeCount");
    await this.getWinner();
    await this.getDataList(timeCount);
  }

  getBudget = () => {
    let uid = firebase.auth().currentUser;
    let userData = firebase
      .database()
      .ref("user")
      .child(uid.uid);
      userData.once("value", snapshot => {
        const data = snapshot.val();
        this.setState({ budget: data.budget })
      });
  };
  getWinner = () => {
    const { navigation } = this.props;
    const winnerName = navigation.getParam("winnerName");
    this.setState({ winnerName })
  };

  getDataList = (timeCount) => {
    let { navigation } = this.props;
    let dataList = navigation.getParam("data");
    let checkOrder = firebase.database().ref(`user/${firebase.auth().currentUser.uid}/order/${moment(new Date(timeCount)).valueOf()}`);
      checkOrder.once("value", snapshot => {
        let order = [];
        const data = snapshot && snapshot.val();
        if(data) {
          this.isChoose = true;
          order = data;
          data.map((e,i) => {
            const result = dataList.menuRes.map(value => (value.menuName)).indexOf(e.nameMenu);
            dataList.menuRes[result].total = e.total;
            dataList.menuRes[result].custom = e.custom;
          })
        }
        this.setState({ dataList: dataList.menuRes ? dataList.menuRes : [], idChannel: dataList._id, timeCount, order });
      });
  };

  selectMenu = async (custom, value, index) => {
    let { dataList, winnerName, order, timeCount } = this.state;
    
    let price = 0;
    dataList[index].total = value;
    price = dataList[index].price * dataList[index].total;
    visible = false;
    let checkNumb = dataList.findIndex(totalCheck => totalCheck.total > 0);
    this.isChoose = checkNumb > - 1 ? true : false;
    if(order && order.length === 0) {
      order.push({
        nameMenu: dataList[index].total !== 0 ? dataList[index].menuName : null,
        total: dataList[index].total !== 0 ? dataList[index].total : null,
        sumPrice: dataList[index].total !== 0 ? price : null,
        custom: dataList[index].total !== 0 ? custom : null,
        restName: dataList[index].total !== 0 ? winnerName : null
      });
    } else {
      let checkOrder = order.findIndex(value => value.nameMenu === dataList[index].menuName);
      console.log("checkOrder : ", checkOrder);
      if(checkOrder === -1) {
        order.push({
          nameMenu: dataList[index].total !== 0 ? dataList[index].menuName : null,
          total: dataList[index].total !== 0 ? dataList[index].total : null,
          sumPrice: dataList[index].total !== 0 ? price : null,
          custom: dataList[index].total !== 0 ? custom : null,
          restName: dataList[index].total !== 0 ? winnerName : null
        });
      } else {
        order[checkOrder] = {
          nameMenu: dataList[index].total !== 0 ? dataList[index].menuName : null,
          total: dataList[index].total !== 0 ? dataList[index].total : null,
          sumPrice: dataList[index].total !== 0 ? price : null,
          custom: dataList[index].total !== 0 ? custom : null,
          restName: dataList[index].total !== 0 ? winnerName : null
        }
      }
      // order[index] = {
      //   nameMenu: dataList[index].total !== 0 ? dataList[index].menuName : null,
      //   total: dataList[index].total !== 0 ? dataList[index].total : null,
      //   sumPrice: dataList[index].total !== 0 ? price : null,
      //   custom: dataList[index].total !== 0 ? custom : null,
      //   restName: dataList[index].total !== 0 ? winnerName : null
      // }
    }
    // console.log("order", order);
    // order.push({
    //   nameMenu: dataList[index].total !== 0 ? dataList[index].menuName : null,
    //   total: dataList[index].total !== 0 ? dataList[index].total : null,
    //   sumPrice: dataList[index].total !== 0 ? price : null,
    //   custom: dataList[index].total !== 0 ? custom : null,
    //   restName: dataList[index].total !== 0 ? winnerName : null
    // });
    firebase.database().ref(`user/${firebase.auth().currentUser.uid}/order/${moment(new Date(timeCount)).valueOf()}`).set(order)
    this.setState({ dataList, visible, customInput: custom});
  };

  handleText = customInput => {
    this.setState({ customInput });
  };
  handleValue = value => {
    this.setState({ value });
  };
  handleMenu = menu => {
    this.setState({ menuCustom: menu, isChoose: menu ? true : false });
  };
  closeDialog = () => {
    this.setState({ visible: false, index: 0 });
  };
  openDialog = (index, value, menuName) => {
    this.setState({ visible: true, index, value, menuName });
  };

  dialogContent = (index,menuName) => {
    let { customInput, value, visible } = this.state;
    return (
      <PopupContainer
        visibleItem={visible}
        funcClose={() => this.closeDialog()}
        funcSubmit={() => this.selectMenu(customInput, value, index)}
        stylePop={{ position: "absolute", bottom: 0, borderRadius: 0 }}
      >
        <ContentPopup>
           <TextShowMenuName>{menuName}</TextShowMenuName>

          <CustomInput
            placeholder="รายละเอียดเพิ่มเติม"
            onChangeText={custom => this.handleText(custom)}
          />
          <ViewNumberic>
              <NumericInput
                value={value}
                onChange={value => this.handleValue(value)}
                iconStyle={{ color: "red" }}
                borderColor="transparent"
                initValue={value}
                minValue={0}
                totalWidth={270}
              />
          </ViewNumberic>
        </ContentPopup>
      </PopupContainer>
    );
  };

  nextPage = () => {
    const { navigation } = this.props;
    const { idChannel, timeCount } = this.state;
    firebase.database().ref(`user/${firebase.auth().currentUser.uid}/order/${moment(new Date(timeCount)).valueOf()}`).once('value', snapshot => {
      const data = snapshot.val();
      navigation.navigate("Confirm", {
        data,
        _idChannel: idChannel
      });
    })   
  };

  componentWillUnmount() {
    this.unset = true;
  }
  renderItem = () => {
    let { dataList, index, menuName,customInput } = this.state;
    let listItem = [];
    if (dataList.length) {
      dataList.map((e, i) => {
        if (!e.total) {
          listItem.push(
            <ListItem
              key={"item " + i}
              title={e.menuName}
              subtitle={
                <View>
                  <Text>{`ราคา ${e.price} บาท`}</Text>
                </View>
              }
              titleStyle={{ fontFamily: "rsuRegular", fontSize: 20 }}
              subtitleStyle={{ fontFamily: "rsuRegular", fontSize: 16 }}
              contentContainerStyle={{ paddingLeft: 10 }}
              bottomDivider
              onPress={() => this.openDialog(i, e.total ? e.total : 1, e.menuName)}
            />
          );
        } else {
          listItem.push(
            <ListItem
              key={"item " + i}
              title={e.menuName}
              subtitle={
                <View>
                  <Text>{`ราคา ${e.price} บาท`}</Text>
                  <Text style={{ display: `${e.custom ? "flex" : "none"}` }}>
                    {e.custom ? e.custom : customInput}
                  </Text>
                </View>
              }
              titleStyle={{ fontFamily: "rsuRegular", fontSize: 20 }}
              subtitleStyle={{ fontFamily: "rsuRegular", fontSize: 16 }}
              contentContainerStyle={{ paddingLeft: 10 }}
              rightTitle={e.total ? "x" + e.total : ""}
              rightTitleStyle={{
                paddingRight: 20,
                fontFamily: "rsuRegular",
                fontSize: 20
              }}
              bottomDivider
              onPress={() => this.openDialog(i, e.total, e.menuName)}
            />
          );
        }
      });
      return (
        <View style={{ display: "flex", flex: 1 }}>
          {listItem}
          {this.dialogContent(index, menuName)}
        </View>
      );
    } 
  };


  render() {
    const {winnerName, budget} = this.state;
    return (
      <LayoutContainer
        title={winnerName}
        funcSubmit={() => this.nextPage()}
        buttonLeft={false}
        button={this.isChoose ? false : true}
        navigation={this.props.navigation}
      >
        <BudgetTab>
          <TextTitle>งบอาหารของคุณวันนี้</TextTitle>
          <TextBudget>{budget} ฿</TextBudget>
        </BudgetTab>
        {this.renderItem()}
      </LayoutContainer>
    );
  }
}

export default Menu;

const styles = StyleSheet.create({
  customView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    padding: 10
  }
});
