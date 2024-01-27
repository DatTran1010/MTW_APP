import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../Common/Colors';
import {HEIGHT_SCREEN} from '../../Common/Dimentions';
import {useDispatch} from 'react-redux';
import {setShowModalUser} from '../../Redux/AppSlice';
import InfoUser from '../Authent/InfoUser';

interface TabBottomProps extends BottomTabBarProps {
  navigation: any;
}
const TabBottom: React.FC<TabBottomProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const Dashboard = () => {
    return <View />;
  };

  const Task = () => {
    return <View />;
  };

  const Expand = () => {
    return <View />;
  };

  const HomeTemp = () => {
    return <View style={{backgroundColor: 'red'}} />;
  };

  const Search = () => {
    return <View />;
  };
  return (
    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: Colors.backgroundColor,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            padding: 8,
            elevation: 5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: HEIGHT_SCREEN / 10,
          },
          headerShown: false,
        })}>
        {/* <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                resizeMode="contain"
                style={[styles.homeBottom]}
                source={require('../../../assets/iconLogo.png')}
              />
            ),
          }}></Tab.Screen> */}
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <View>
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={30}
                  color={Colors.primary}
                  onPress={() => {
                    navigation.navigate('Home');
                  }}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Search}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <View>
                <AntDesign
                  name={'setting'}
                  size={30}
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(setShowModalUser(true));
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <InfoUser navigation={navigation} />
    </View>
  );
};

export default memo(TabBottom);

const styles = StyleSheet.create({
  homeBottom: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: -20,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 35,
  },
});
