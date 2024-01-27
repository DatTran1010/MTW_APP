import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer, Title, Caption} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import Colors from '../../Common/Colors';
import Theme from '../../Common/Theme';
import LanguesComponent from '../../Components/LanguesComponent';

const DrawerContent = ({...props}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Image
          source={require('../../../assets/LogoMotorWatch.jpg')}
          style={{width: '100%', height: 100}}
        />
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSelection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
              }}>
              {/* <Avatar.Image
                source={{
                  uri: "https://farm5.static.flickr.com/4029/35667852906_6ffb006961.jpg",
                }}
                size={50}
              /> */}
              <View style={{marginLeft: 5}}>
                <Title style={styles.title}>admin</Title>
                <Caption style={styles.caption}>Trần Tấn Đạt</Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSelection}>
          <DrawerItem
            icon={() => (
              <Ionicons
                name="home-outline"
                size={25}
                color={Colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label={t('home')}
            labelStyle={Theme.font}
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={() => (
              <Ionicons
                name="receipt-outline"
                size={25}
                color={Colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Chế độ làm việc"
            labelStyle={Theme.font}
          />
          <DrawerItem
            icon={() => (
              <Ionicons
                name="timer-outline"
                size={25}
                color={Colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Kế hoạch làm việc"
            labelStyle={Theme.font}
            // onPress={() => {
            //   props.navigation.navigate('WorkPlan');
            // }}
          />
          <DrawerItem
            icon={() => (
              <Ionicons
                name="git-pull-request-outline"
                size={25}
                color={Colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Dữ liệu thời gian thực"
            labelStyle={Theme.font}
            // onPress={() => {
            //   props.navigation.navigate('WorkRealtime');
            // }}
          />
          <DrawerItem
            icon={() => (
              <Ionicons
                name="mail-outline"
                size={25}
                color={Colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Yêu cầu gửi báo cáo"
            labelStyle={Theme.font}
            onPress={() => {
              props.navigation.navigate('RequestReport');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <View
        style={{
          flex: 0.6,
        }}>
        <LanguesComponent />
      </View>
      <Drawer.Section style={styles.bottomDrawerSelection}>
        <DrawerItem
          icon={() => (
            <Ionicons
              name="exit-outline"
              size={25}
              color={Colors.primary}
              style={{marginRight: 15}}
            />
          )}
          label={t('logout')}
          labelStyle={Theme.font}
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {flex: 1},
  drawerContent: {
    flex: 1,
    marginVertical: 5,
  },
  userInfoSelection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSelection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  bottomDrawerSelection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
