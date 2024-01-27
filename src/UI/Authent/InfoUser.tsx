import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Common/Colors';
import Theme from '../../Common/Theme';
import LanguesComponent from '../../Components/LanguesComponent';
import {setShowModalUser} from '../../Redux/AppSlice';
import OptionComponent from '../../Components/OptionComponent';
import LogOutComponent from '../../ComponentsCustom/LogOutComponent';

interface InfoUserProps {
  navigation: any;
}
const InfoUser: React.FC<InfoUserProps> = ({navigation}) => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const isShow = useSelector(state => state.app.isShowModalUser);
  const infoUser = useSelector(state => state.app.userInfo);

  const handleCloseModal = () => {
    dispatch(setShowModalUser(false));
  };
  const handleBlur = (event: {target: any; currentTarget: any}) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  const handleLogout = () => {
    handleCloseModal();
    navigation.goBack();
  };
  return (
    <Modal visible={isShow} transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleBlur}>
        <View style={[styles.modalContent]}>
          <View style={styles.modalHeader}>
            <View style={styles.headerContent}>
              <View style={styles.iconProfile}>
                <FontAwesome size={25} name="user" />
                <Text style={styles.textProfile}>{t('profile')}</Text>
              </View>
              <View>
                <AntDesign size={25} name="close" onPress={handleCloseModal} />
              </View>
            </View>
          </View>
          <View style={styles.modalBody}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.avatar}>
                <FontAwesome size={25} name="user" />
              </View>
              <View style={{marginLeft: 10}}>
                <Text>Hi, {infoUser.USER_NAME}</Text>
                <Text>{t('logged')}</Text>
                <Text>{infoUser.EMAIL}</Text>
              </View>
            </View>
            <View style={[styles.controlItem, {marginTop: 10}]}>
              <Text>{t('edit-profile')}</Text>
            </View>
            <View style={[styles.controlItem]}>
              <LanguesComponent />
            </View>
            <View style={[styles.controlItem]}>
              <OptionComponent
                children={<LogOutComponent onLogout={handleLogout} />}
                heightPercent={25}
                label={t('logout')}
                styleLabel={styles.textLogout}
              />
            </View>
          </View>
          <View style={styles.modalFooter}>
            <View style={styles.divider} />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default InfoUser;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  modalContent: {
    backgroundColor: Colors.backgroundColor,
    width: '90%',
    borderRadius: 4,
  },
  modalHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    color: '#000',
    fontFamily: Theme.fontFamily,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
  },
  modalBody: {
    backgroundColor: Colors.backgroundColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalFooter: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: Colors.white,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  textLogout: {
    color: 'red',
    fontSize: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textProfile: {marginLeft: 10, fontWeight: 'bold', fontSize: 16},
});
