import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightIcon: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    titleStyle: {
      paddingLeft: 5,
      fontSize: 23,
      fontFamily: 'rsuRegular'
    },
    rightContent: {
      paddingRight: 5
    },
    userOrder: {
      width: '100%',
      backgroundColor: 'rgb(237, 237, 237)',
      height: 45,
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 10,
    },
    textOrder : {
      fontSize: 14,
      fontFamily: 'rsuRegular'
    }
  });