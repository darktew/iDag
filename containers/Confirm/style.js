import styled from 'styled-components/native';

export const TitleBar = styled.View`
    width: 100%;
    height: 70;
    justify-content: center;
    align-items: center;
`
export const TextTitle = styled.Text`
    font-size: 38;
    font-family: 'rsuBold';
    padding-top: 20;
`
export const SubTitleBar = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`

export const TextSubTitle = styled.Text`
    font-size: 20;
    font-family: 'rsuRegular'
`
export const ListItemView = styled.View`
    flex-direction: row;
    padding-top: 25;
`
export const ItemTitle = styled.Text`
    font-size: 20;
    flex: 1;
    font-family: 'rsuRegular';
`
export const ItemAmount = styled.Text`
    font-size: 20;
    font-family: 'rsuRegular';
`
export const ItemPrice = styled.Text`
    font-size: 20;
    font-family: 'rsuRegular';
    align-items: flex-end;
`

export const ViewConClude = styled.View`
    margin-top: 40;
    margin-left: 40;
    margin-right: 40;
    flex-direction: row;
`

export const TextConClude = styled.Text`
    font-size: 20;
    font-family: 'rsuRegular';
    flex: 1;
`
export const TextTotal = styled.Text`
    font-size: 20;
    font-family: 'rsuRegular';
    align-items: flex-end;
`
export const ViewTotal = styled.View`
    margin-left: 5;
    margin-right: 5;
    flex: 1;
`

export const ViewFooter = styled.View`
    margin-left: 40;
    margin-right: 40;
    margin-top: 20;
    flex: 1;
    height: 100%;
    justify-content: flex-end;
`
export const ButtonFooter = styled.TouchableOpacity`
    background-color: #EB0000;
    align-items:center;
    justify-content: center;
    height: 50;
    border-radius: 5;
    margin-left: 10;
    margin-right: 10;
`
export const TextFooter = styled.Text`
    font-size: 20;
    font-family: 'rsuRegular';
    color: #FFFAFA;
`