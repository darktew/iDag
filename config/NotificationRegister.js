import { Permissions, Notifications } from "expo";
import { AsyncStorage, Platform } from "react-native";
import * as firebase from "firebase";

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("notice", {
      name: "Notice",
      priority: "max",
      vibrate: [0, 250, 250, 250],
      sound: true
    });
  }
  let token = await Notifications.getExpoPushTokenAsync();
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      firebase
      .database()
      .ref(`user/${user.uid}`)
      .update({
        tokenUser: token
      });
    }
  })
  // await AsyncStorage.setItem('token', token);
}
