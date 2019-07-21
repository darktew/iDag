import styled from 'styled-components/native';

export const BudgetTab = styled.View`
    width: 100%;
    background-color: rgb(237,237,237);
    height: 65;
    align-items: center;
    flex-direction: row;
`
export const TextTitle = styled.Text`
    flex: 1;
    padding-left: 20;
    font-size: 18;
    font-family: 'rsuRegular'
`
export const TextTime = styled.Text`
    font-size: 18;
    font-family: 'rsuRegular';
    flex: 1;
    text-align: right;
    padding-right: 15
`

export const ImageCheck = styled.Image`
    width: 15; 
    height: 15;
    margin-left: 10;
    display: ${props => props.display || 'flex'};
`

export const ContentPopup = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 30;
`
export const TextPopup = styled.Text`
    font-size: 22;
    font-family: 'rsuRegular';
    padding-top: 15;
    padding-bottom: 5;
`

