import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
          width: 155,
          height: 160
      },
      keyboard: {
        bottom: 20
      },
      layerLogo: {
          marginTop: 120,
          alignItems: 'center',
          justifyContent: 'center'
      },
      layerUser: {
          marginTop: 70,
          marginLeft: 56,
          marginRight: 55,        
      },
      layerPassword: {
        marginLeft: 56,
        marginRight: 55, 
        marginTop: 30
      },
      label: {
        fontFamily: 'rsuBold',
        fontSize: 27,
        marginBottom: 15
      },
      button: {
          color: '#fff',
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EB0000',
          marginTop: 45, 
          width: '75%',
          marginLeft: 56,
          marginRight: 55,
          borderRadius: 5,
      },
      labelButton: {
        fontFamily: 'rsuBold',
        fontSize: 22,
        color: '#fff'          
      },
      input: {
          fontSize: 20,
          fontFamily: 'rsuRegular'
      }
      
})

export default styles;
