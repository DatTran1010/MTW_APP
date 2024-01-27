import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {setItem} from '../Common/AsyncStorageItem';

import Theme from '../Common/Theme';
import Colors from '../Common/Colors';
import {setLanguaApp} from '../Redux/AppSlice';
const LanguesComponent = () => {
  const {t} = useTranslation();

  const languege = useSelector(state => state.app.language);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  console.log('languege', languege);
  //sk handle

  const handleSelectionLanguage = () => {
    setIsVisible(!isVisible);
  };

  const saveLanguageStorage = async (value: string) => {
    await setItem('LANGUAGE', value);
  };

  const handleSelectedLanguage = (value: string) => {
    i18next.changeLanguage(value);
    saveLanguageStorage(value);
    dispatch(setLanguaApp(value === 'vn' ? 0 : 1));
    setIsVisible(false);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.placeholder}>
          <MaterialIcons name="language" size={30} />
          <Text style={[Theme.font, {marginLeft: 10}]}>{t('language')}</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleSelectionLanguage}>
          <Text style={[Theme.font, {marginRight: 5}]}>
            {languege === 0 ? t('vietnamese') : t('english')}
          </Text>
          <MaterialIcons name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>
      {isVisible && (
        <View
          style={{
            marginTop: 6,
          }}>
          <TouchableOpacity
            style={[
              styles.viewLanguage,
              {
                backgroundColor:
                  languege === 'vn' ? Colors.border : Colors.white,
              },
            ]}
            onPress={() => {
              handleSelectedLanguage('vn');
            }}>
            <Text>{t('vietnamese')}</Text>
            <Image source={require('../../assets/logoTV.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewLanguage,
              {
                backgroundColor:
                  languege === 'en' ? Colors.border : Colors.white,
              },
            ]}
            onPress={() => {
              handleSelectedLanguage('en');
            }}>
            <Text>{t('english')}</Text>
            <Image source={require('../../assets/logoTA.jpg')} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LanguesComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLanguage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
  },
});
