import {StyleSheet, Text, View, NativeModules, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import * as asyncStorageItem from '../../Common/AsyncStorageItem';
import {setDataSaveUser, setLanguaApp, setOverlay} from '../../Redux/AppSlice';
import Login from './Login';
import i18next from 'i18next';

const LoginContainer = ({navigation}) => {
  const dispatch = useDispatch();

  const [showLogin, setShowLowin] = useState(false);
  useEffect(() => {
    dispatch(setOverlay(true));
    const getDataRememberMe = async () => {
      const dataSaveUser = await asyncStorageItem.getItem('SAVE_USER');
      let LANGUAGE = await asyncStorageItem.getItem('LANGUAGE');
      if (LANGUAGE === '') {
        // Lấy ngôn ngữ hiện tại của thiết bị
        let deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale
            : NativeModules.I18nManager.localeIdentifier;

        LANGUAGE = deviceLanguage === 'en_VN' ? 'vn' : 'en';
      }
      i18next.changeLanguage(LANGUAGE);
      dispatch(setLanguaApp(LANGUAGE === 'vn' ? 0 : 1));

      if (dataSaveUser != '') {
        const arrayData = JSON.parse(dataSaveUser);
        dispatch(setDataSaveUser(arrayData));
      }

      setTimeout(() => {
        setShowLowin(true);
      }, 500);
    };
    getDataRememberMe();
  }, []);

  return <>{showLogin ? <Login navigation={navigation} /> : <View />}</>;
};

export default LoginContainer;
