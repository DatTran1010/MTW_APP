import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import {
  getToken,
  notificationListenr,
  onDisplayNotification,
  requestUserPermission,
} from '../../../services/notification';

import {HEIGHT_SCREEN, WIDTH_SCREEN} from '../../Common/Dimentions';
import Colors from '../../Common/Colors';
import TextInputComponent from '../../Components/TextInputComponent';
import CheckboxComponent from '../../Components/CheckboxComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import * as loginService from '../../apiServices/loginService';
import useApiQuery from '../../../services/useApiQuery';
import {
  setOverlay,
  setShowCamera,
  setShowToast,
  setUserInfo,
} from '../../Redux/AppSlice';
import * as asyncStorageItem from '../../Common/AsyncStorageItem';
import Theme from '../../Common/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface LoginProps {
  navigation: any;
}
const Login: React.FC<LoginProps> = ({navigation}) => {
  const {t} = useTranslation();

  const dataSaveUser = useSelector(state => state.app.dataSaveUser);

  const dispatch = useDispatch();
  const [tokenDevice, setTokenDevie] = useState<string>('');
  const [checkedSavePass, setCheckSavePass] = useState(dataSaveUser[0].check);

  // const loginQery = useQuery({
  //   queryKey: ['login'],
  //   queryFn: async () =>
  //     await loginService.login('admin', 'anthuan', tokenDevice),
  //   enabled: false,
  // });

  const [userName, setUserName] = useState(dataSaveUser[0].username);
  const [password, setPassword] = useState(dataSaveUser[0].password);

  const timeoutRef = useRef(null);

  const loginQuery = useApiQuery(
    ['login'],
    () => loginService.login(userName, password, tokenDevice),
    false,
  );

  useEffect(() => {
    if (userName !== '' && password !== '') {
      handleLogin();
    } else {
      dispatch(setOverlay(false));
    }
  }, []);

  // notification
  const getTokenDevices = async () => {
    const newTokenDevies = await getToken();
    setTokenDevie(newTokenDevies);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        onDisplayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
        });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListenr();
    getTokenDevices();
  }, []);

  //#region  handle
  const handleShowCamera = () => {
    dispatch(setShowCamera(true));
  };

  const handleLogin = async () => {
    console.log('Tài khoản login', userName, password);

    const baseURL = await asyncStorageItem.baseURL();
    if (baseURL === '') {
      dispatch(setOverlay(false));
      dispatch(
        setShowToast({
          showToast: true,
          title: 'Chưa có URL',
          body: 'Chưa có mã URL. Vui lòng nhập mã URL để đăng nhập',
          type: 'warning',
        }),
      );
    } else {
      if (checkedSavePass) {
        const dataSavePassword = [
          {check: true, username: userName, password: password},
        ];
        const JData = JSON.stringify(dataSavePassword);
        await asyncStorageItem.setItem('SAVE_USER', JData);
      }

      const result = await loginQuery.refetch();

      if (result.data.statusCode === 200) {
        // save user info
        const userInfo = {
          EMAIL: result.data.responseData.email,
          HO_TEN: result.data.responseData.hO_TEN,
          MS_CN: result.data.responseData.mS_CONG_NHAN,
          MS_TO: result.data.responseData.mS_TO,
          NHOM_USER: result.data.responseData.nhoM_USER,
          SO_DTDD: result.data.responseData.sO_DTDD,
          TEN_DV: result.data.responseData.teN_DON_VI,
          TEN_TO: result.data.responseData.teN_TO,
          USER_NAME: result.data.responseData.userName,
          TOKEN: result.data.responseData.token,
          MS_DV: result.data.responseData.mS_DON_VI,
        };
        dispatch(setUserInfo(userInfo));

        dispatch(setOverlay(false));
        navigation.navigate('Home');
      } else {
        dispatch(
          setShowToast({
            showToast: true,
            title: 'Thông báo',
            body: 'Tên đăng nhập hoặc mật khẩu không chính xác',
            type: 'error',
          }),
        );
      }
    }
  };

  const handleUserNameChange = (value: string) => {
    setUserName(value); // Lấy chữ cuối cùng của chuỗi
  };

  const handlePasswordChange = (value: string) => {
    // // Clear previous timeout (if any)
    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    // }
    // // Set a new timeout to update the state after 1 second
    // timeoutRef.current = setTimeout(() => {
    //   setPassword(value); // Lấy chữ cuối cùng của chuỗi
    // }, 1000);

    setPassword(value); // Lấy chữ cuối cùng của chuỗi
  };
  //#endregion

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        extraScrollHeight={35}>
        <SafeAreaView style={styles.container}>
          <View style={styles.scanIcon}>
            <MaterialCommunityIcons
              onPress={handleShowCamera}
              name="qrcode-scan"
              size={35}
              color={Colors.primary}
            />
          </View>
          <View style={styles.headerScreen}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../assets/LogoMotorWatch1.jpg')}
                style={[styles.imageLogo]}
              />
            </View>
          </View>
          <View style={styles.bodyScreen}>
            <View>
              <View style={styles.username}>
                <TextInputComponent
                  placeholder={t('user-name')}
                  onChangeText={handleUserNameChange}
                  value={userName}
                />
              </View>
              <View style={styles.password}>
                <TextInputComponent
                  placeholder={t('password')}
                  secureTextEntry
                  onChangeText={handlePasswordChange}
                  value={password}
                />
              </View>
            </View>
            <View style={styles.rememberUSer}>
              <CheckboxComponent
                label={t('luu-mat-khau')}
                value={checkedSavePass}
                onPress={() => {
                  setCheckSavePass(!checkedSavePass);
                }}
              />
              <TouchableOpacity>
                <Text style={Theme.font}>{t('quen-mat-khau')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginView}>
              <View style={styles.button}>
                <ButtonComponent
                  disabled={userName !== '' || password !== '' ? false : true}
                  onPress={() => handleLogin()}
                  buttonTitle={t('login')}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      {/* <View style={styles.containerOverlay}>
        <ScrollView style={styles.scrollOverlay}>
          <ActivityIndicator size="large" />
        </ScrollView>
      </View> */}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerScreen: {
    flex: 1,
  },
  bodyScreen: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
  },
  viewImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageLogo: {
    width: WIDTH_SCREEN / 1.3,
    height: HEIGHT_SCREEN / 5,
  },
  username: {
    marginVertical: 10,
  },
  password: {
    marginBottom: 10,
  },
  rememberUSer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginVertical: 50,
    width: '80%',
  },
  containerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
  },
  scanIcon: {
    alignItems: 'flex-end',
    margin: 10,
  },
  loginView: {alignItems: 'center'},
});
