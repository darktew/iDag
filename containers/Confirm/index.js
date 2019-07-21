import React, { Component } from 'react';
import { View, Text, Dimensions, AsyncStorage } from 'react-native';
import { LayoutContainer } from '../../components/Layout';
import {
    TextTitle,
    TitleBar,
    SubTitleBar,
    TextSubTitle,
    ListItemView,
    ItemTitle,
    ItemPrice,
    ItemAmount,
    ViewConClude,
    TextConClude,
    TextTotal,
    ViewTotal,
    ViewFooter,
    ButtonFooter,
    TextFooter
} from './style';
import { ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import Toast from 'react-native-root-toast';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            budget: 0,
            idChannel: '',
            balance: 0,
            outStanding: 0,
            textBalance: '',
            sum: 0
        };
    }

    async componentDidMount() {
        let { navigation } = this.props;
        const dataList = await this.getList();
        const budget = await this.getBudget();
        await !this.unset && this.setState({ dataList: dataList, budget: budget.budget, idChannel: navigation.getParam('_idChannel') });
        this.showItem();
    }

    getBudget = () => {
        let uid = firebase.auth().currentUser;
        let userData = firebase.database().ref('user').child(uid.uid);
        return new Promise((resolve, reject) => {
            userData.on('value', (snapshot) => {
                resolve(snapshot.val());
            })
        })
    }

    getList = () => {
        let { navigation } = this.props;
        let dataList = navigation.getParam('data');
        return dataList;
    }

    calBudget = async(balance,outStanding) => {
        let { navigation } = this.props;
        await firebase.database().ref(`user/${firebase.auth().currentUser.uid}`).update({
            budget: balance,
            outstanding: outStanding
        });
        await AsyncStorage.removeItem('keys');
        Toast.show('สั่งซื้ออาหารเสร็จสิ้น', {
            duration: Toast.durations.SHORT,
            animation: true,
            position: Toast.positions.BOTTOM,
            delay: 0
        })
        navigation.navigate('Home');
    }

    showItem = () => {
        let { dataList, budget } = this.state;
        let sum = 0;
        let textBalance = '';
        dataList.map((e, i) => {
           sum += e.sumPrice;
        });
        let balance = budget - sum;
        let outStanding = balance;
        if(balance > 0) {
            textBalance = 'คงเหลือ';
            outStanding = 0;
        } else {
            textBalance = 'จ่ายเพิ่ม';
            outStanding = Math.abs(balance);
            balance = 0;
        }
        this.setState({  balance , outStanding, textBalance, sum})
    }
    componentWillUnmount() {
        this.unset = true;
    }
    renderItem = () => {
        let { budget, dataList ,textBalance, outStanding, balance, sum } = this.state;
        let listItem = [];
        dataList.map((e,i) => {
            listItem.push(
                <ListItem
                    key={"item" + i}
                    title={
                        <ListItemView>
                            <ItemTitle>{e.nameMenu}</ItemTitle>
                            <ItemAmount>{e.total}</ItemAmount>
                        </ListItemView>
                    }
                    rightTitle={
                        <ListItemView>
                            <ItemPrice>{`${e.sumPrice}  บาท`}</ItemPrice>
                        </ListItemView>
                    }
                />
            )
        })
        return (
            <View>
                <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: 1, borderStyle: 'solid',marginLeft: 30, marginRight: 30 }}>
                {listItem}
                </View>
                <ViewTotal>
                    <ViewConClude>
                        <TextConClude>รวม</TextConClude>
                        <TextTotal>{`${sum}  บาท`}</TextTotal>
                    </ViewConClude>
                    <ViewConClude>
                        <TextConClude>งบอาหารของคุณในวันนี้</TextConClude>
                        <TextTotal>{`${budget}  บาท`}</TextTotal>
                    </ViewConClude>
                    <ViewConClude>
                        <TextConClude>{textBalance}</TextConClude>
                        <TextTotal>{`${balance > 0 ? balance : outStanding}  บาท`}</TextTotal>
                    </ViewConClude>
                </ViewTotal>
                <ViewFooter>
                    <ButtonFooter onPress={() => this.calBudget(balance,outStanding)}>
                        <TextFooter>ยืนยัน</TextFooter>
                    </ButtonFooter>
                </ViewFooter>
            </View>
        )
    }
    render() {
        return (
            <LayoutContainer title="ยืนยันการสั่งซื้อ" buttonLeft={false} button={true} navigation={this.props.navigation}>
                <TitleBar>
                    <TextTitle>ยืนยันการสั่งซื้อ</TextTitle>
                </TitleBar>
                <SubTitleBar>
                    <TextSubTitle>คุณได้ทำการสั่งซื้ออาหารเรียบร้อย</TextSubTitle>
                </SubTitleBar>
                {this.renderItem()}
            </LayoutContainer>
        );
    }
}

export default Confirm;
