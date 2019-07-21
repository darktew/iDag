import React, { Component } from "react";
import { View, Text } from "react-native";
import { LayoutContainer } from "../../components/Layout";
import * as firebase from "firebase";
import { ListItem } from "react-native-elements";
import moment from "moment";
import { TabNoti, NoNoti, TextNoNoti } from "./style";
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNoti: []
    };
  }

  async componentDidMount() {
    const data = await this.getNotification();
    !this.unset && this.setState({ dataNoti: data ? data : [] });
  }
  getNotification = () => {
    const dataNoti = firebase.database().ref("notification");
    return new Promise((resolve, reject) => {
      dataNoti.on("value", snapshot => {
        if (snapshot !== null) {
          const keys = snapshot ? snapshot.val() && Object.keys(snapshot.val()) : [];
          const dataArr = snapshot ? snapshot.val() : {};
          const dataResolve = keys ? keys.map(key => ({ _id: key, ...dataArr[key] })) : [];
          resolve(dataResolve);
        } 
      });
    });
  };
  componentWillUnmount() {
    this.unset = true;
  }
  renderItem = () => {
    const { dataNoti } = this.state;
    const todyNoti = [];
    const yesterNoti = [];
    dataNoti && dataNoti
      .sort(
        (a, b) =>
          moment(new Date(b.dateNotification)) -
          moment(new Date(a.dateNotification))
      )
      .map((e, i) => {
        if (
          moment().get("day") ===
          moment(new Date(e.dateNotification)).get("day")
        ) {
          todyNoti.push(
            <View key={"ViewKey Today" + i}>
              <ListItem
                key={"itemKey" + i}
                title={e.title}
                subtitle={
                  <View>
                    <Text>{e.body}</Text>
                    <Text>
                      {moment(new Date(e.dateNotification), "ll").fromNow()}
                    </Text>
                  </View>
                }
                leftAvatar={{
                  source: require("../../assets/web_hi_res_512.png")
                }}
                titleStyle={{ fontFamily: "rsuRegular", fontSize: 20 }}
                subtitleStyle={{ fontFamily: "rsuRegular", fontSize: 16 }}
                rightTitleStyle={{ fontFamily: "rsuRegular", fontSize: 20 }}
                bottomDivider
                topDivider
              />
            </View>
          );
        } else {
          yesterNoti.push(
            <View key={"ViewKey YesterDay" + i}>
              <ListItem
                key={"itemKey" + i}
                title={e.title}
                subtitle={
                  <View>
                    <Text>{e.body}</Text>
                    <Text>
                      {moment(new Date(e.dateNotification), "ll").fromNow()}
                    </Text>
                  </View>
                }
                leftAvatar={{
                  source: require("../../assets/web_hi_res_512.png")
                }}
                titleStyle={{ fontFamily: "rsuRegular", fontSize: 20 }}
                subtitleStyle={{ fontFamily: "rsuRegular", fontSize: 16 }}
                rightTitleStyle={{ fontFamily: "rsuRegular", fontSize: 20 }}
                bottomDivider
                topDivider
              />
            </View>
          );
        }
      });
    if(dataNoti && dataNoti.length !== 0) {
      return (
      <View> 
        <View>
          <TabNoti>
            <Text>ใหม่</Text>
          </TabNoti>
          {todyNoti}
        </View>
        <View>
          <TabNoti>
            <Text>เมื่อวาน</Text>
          </TabNoti>
          {yesterNoti}
        </View>
      </View>
      )
    } else {
      return (
        <NoNoti>
          <TextNoNoti>ไม่พบข้อมูลการแจ้งเตือน</TextNoNoti>
        </NoNoti>
      )
    }
    
    // dataNoti && dataNoti !== []
    // ?

    //   :
    //   <View>
    //       <Text>ไม่พบการแจ้งเตือน</Text>
    //   </View>
  };

  render() {
    return (
      <LayoutContainer
        title="แจ้งเตือน"
        buttonLeft={true}
        buttonRight={true}
        button={true}
        navigation={this.props.navigation}
      >
        {this.renderItem()}
      </LayoutContainer>
    );
  }
}

export default Notification;
