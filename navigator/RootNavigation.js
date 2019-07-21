import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginLoaddingScreen from '../screens/LoginLoaddingScreen';
import IndexScreen from '../screens/IndexScreen';
import MenuScreen from '../screens/MenuScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const AppStack = createStackNavigator({
    Home: HomeScreen,
    Index: IndexScreen,
    Menu: MenuScreen,
    Confirm: ConfirmScreen
},{
    initialRouteName: 'Home'
})
const ProfileStack = createStackNavigator({
    Profile: ProfileScreen,
}, {
    initialRouteName: 'Profile'
})
const EditProfileStack = createStackNavigator({
    EditProfile: EditProfileScreen
})
const AuthStack = createStackNavigator({
    Login: LoginScreen
})
const NotificationStack = createStackNavigator({
    Notification: NotificationScreen
})
const AppContainer = createAppContainer(createSwitchNavigator({
    LoginLoaddingScreen: LoginLoaddingScreen,
    App: AppStack,
    Auth: AuthStack,
    Profile: ProfileStack,
    EditProfile: EditProfileStack,
    Notification: NotificationStack
}, {
        initialRouteName: 'LoginLoaddingScreen'
    }))

export default AppContainer