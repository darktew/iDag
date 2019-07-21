import styled from "styled-components/native";

export const BudgetTab = styled.View`
  width: 100%;
  background-color: rgb(237, 237, 237);
  height: 65;
  align-items: center;
  flex-direction: row;
`;
export const TextTitle = styled.Text`
  flex: 1;
  padding-left: 20;
  font-size: 18;
  font-family: "rsuRegular";
`;
export const TextBudget = styled.Text`
  font-size: 18;
  font-family: "rsuRegular";
  flex: 1;
  text-align: right;
  padding-right: 15;
`;
export const ViewFooter = styled.View`
  display: ${props => props.display};
  flex: 1;
  margin-top: 70;
  border-width: 1;
`;
export const ButtonConfirm = styled.TouchableOpacity`
  color: #fff;
  height: 45;
  align-items: center;
  justify-content: center;
  background-color: #eb0000;
  margin-top: 50;
  width: 75%;
  marginleft: 56;
  marginright: 55;
  borderradius: 5;
  position: absolute;
  bottom: 0;
`;
export const LabelButton = styled.Text`
  font-family: "rsuBold";
  font-size: 22;
  color: #fff;
`;
export const ContentPopup = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const CustomInput = styled.TextInput`
  font-family: "rsuRegular";
  font-size: 18;
  color: black;
  border-color: lightgrey;
  border-width: 1;
  margin-top: 20;
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
  padding-bottom:10;
  width: 95%;
  border-radius: 5;
`;

export const TextShowMenuName = styled.Text`
  font-family: "rsuRegular";
  font-size: 24;
  font-weight: bold;
  color: black;
  padding-top: 25;
  text-align: left;
  padding-left: 10;
`

export const ViewNumberic = styled.View`
  justify-content: center;
  align-items: center;
`