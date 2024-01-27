import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';

import Monitor from '../Home/DetailsScreen/Monitor';
import Consume from '../Home/DetailsScreen/Consume';
import HeaderApp from '../Navigation/HeaderApp';
import Colors from '../../Common/Colors';
import MonitorRealTime from '../Home/DetailsScreen/MonitorRealTime';
import {WIDTH_SCREEN} from '../../Common/Dimentions';
import ReportMaChine from '../Home/DetailsScreen/ReportMaChine';
import Theme from '../../Common/Theme';

interface DetailsContainerProps {
  navigation: any;
  route: any;
}
const DetailsContainer: React.FC<DetailsContainerProps> = ({
  navigation,
  route,
}) => {
  const Tab = createMaterialTopTabNavigator();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        headerLeftVisible={true}
        goBack={true}
        title=""
        colorHeader={
          route.params.MachineStatus
            ? Colors.colorMachineOn
            : Colors.colorMachineOff
        }
      />
      <Tab.Navigator
        initialRouteName={route.params.initScreen}
        screenOptions={{
          tabBarLabelStyle: {fontSize: Theme.fontSize - 2},
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: WIDTH_SCREEN / 2},
        }}>
        <Tab.Screen
          name="Monitor"
          options={{
            tabBarLabel: t('giam-sat-tinh-trang'),
          }}
          children={() => (
            <Monitor
              navigation={navigation}
              MA_THIET_BI={route.params.MS_MAY}
              ID_TB={route.params.ID_TB}
              dateToFrom={route.params.dateToFrom}
            />
          )}
        />
        <Tab.Screen
          name="Consume"
          options={{
            tabBarLabel: t('tieu-thu-dien-nang'),
          }}
          children={() => (
            <Consume
              navigation={navigation}
              MA_THIET_BI={route.params.MS_MAY}
              ID_TB={route.params.ID_TB}
              dateToFrom={route.params.dateToFrom}
            />
          )}
        />
        <Tab.Screen
          name="MonitorRealTime"
          options={{
            tabBarLabel: t('giam-sat-tinh-trang-realtime'),
          }}
          children={() => (
            <MonitorRealTime
              navigation={navigation}
              MA_THIET_BI={route.params.MS_MAY}
              ID_TB={route.params.ID_TB}
            />
          )}
        />
        <Tab.Screen
          name="ReportMaChine"
          options={{
            tabBarLabel: t('bao-cao-giam-sat-dong-co'),
          }}
          children={() => (
            <ReportMaChine
              navigation={navigation}
              MA_THIET_BI={route.params.MS_MAY}
              ID_TB={route.params.ID_TB}
              endDate={route.params.dateToFrom.endDate}
              startDate={route.params.dateToFrom.startDate}
            />
          )}
        />
      </Tab.Navigator>
    </View>
  );
};

export default DetailsContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
