import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`

export const Input = styled.TextInput`
    border-bottom-width: 1;
    padding-top: 10;
    padding-bottom: 10;
    border-bottom-color: lightgrey;
`

export const Label = styled.Text`
    font-size: 22;
    font-family: 'rsuBold';
`

export const ViewImage = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const ViewForm = styled.View`
    margin-left: 40;
    margin-right: 40;
    margin-bottom: 40;
    flex: 1;
`

export const IconImage = styled.Image`
    width: 20;
    height: 20;
`

export const ImageProfile = styled.Image`
    width: 200; 
    height: 200; 
    borderRadius: 100; 
    margin-top: 15;
    margin-bottom: 15;
`

export const ViewContent = styled.View`
    margin-top: 20;
`

export const UploadImage = styled.TouchableOpacity`
    background-color: rgba(3,0,0,0.5);
    z-index: 10;
    width: 200;
    height: 100;
    border-bottom-left-radius: 100;
    border-bottom-right-radius: 100;
    z-index: 9;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 16;
`

export const ViewFooter = styled.View`
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    flex-direction: row;
    margin-left: 40;
    margin-right: 40;
    margin-top: 40;
    margin-bottom: 40;
`

export const ButtonFooter = styled.TouchableOpacity`
    background-color: ${props => props.backgroundColor};
    border-radius: 10;
    height: 35;
    margin-right: 35;
    width: 100;
    align-items: center;
    justify-content: center;
`

export const LabelFooter = styled.Text`
    font-family: 'rsuRegular';
    font-size: 18;
    color: white;
    text-align: center;
    align-items: center;
`