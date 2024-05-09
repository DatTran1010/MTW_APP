import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import {Platform, PermissionsAndroid} from 'react-native';
export async function requestUserPermission() {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Đã cho phép thông báo:', authStatus);
  }
}

export const notificationListenr = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export const getToken = async () => {
  //   await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('TOKEN ', token);
  return token;
};

export async function onDisplayNotification({title = '', body = ''}) {
  // Request permissions (required for iOS)

  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default 3',
    name: 'Default Channel 3',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      // smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      style: {type: AndroidStyle.BIGTEXT, text: body},
    },
  });
}
