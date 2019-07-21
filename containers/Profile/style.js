import styled from 'styled-components/native';

export const ViewImage = styled.View`
    justify-content: center;
    align-items:center;
    flex: 1;
`
export const ImageProfile = styled.Image`
    width: 155; 
    height: 155; 
    borderRadius: 80; 
    margin-top: 15;
    margin-bottom: 15;
`
export const ViewProfile = styled.View`
    justify-content: center;
    align-items:center;
    flex: 1;
    flex-direction: column;
`
export const TextContent = styled.Text`
    font-size: 20;
    font-family: 'rsuRegular';
    margin-top: 5;

`
export const ButtonEdit = styled.TouchableOpacity`
    font-size: 18;
    font-family: 'rsuRegular';
    display:flex;
    align-items:center;
    background: rgb(217,14,14);
    width: 100;
    height: 40;
    justify-content: center;
    margin-top: 10;
    border-radius: 10;
`
export const ViewContent = styled.View`
    width: 100%;
    height: 100;
    margin-top: 15;
    flex-direction: row;
`
export const Budget = styled.View`
    
    justify-content: center;
    align-items:center;
    flex:1;
    background: rgb(154,151,151)
`
export const OutStanding = styled.View`
    justify-content: center;
    align-items:center;
    flex:1;
    background: rgb(98,98,98);
`
export const TextMoney = styled.Text`
    color: rgb(255,255,255);
    font-size: 28;
    font-family: 'rsuRegular';
`