import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';
import Home from '../Home/Home';
import DrawerContent from './DrawerContent';
import {Text} from 'react-native';
import Theme from '../../Common/Theme';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => DrawerContent(props)}
      screenOptions={{
        sceneContainerStyle: {
          backgroundColor: 'transparent', // Đảm bảo nền trong suốt để tạo hiệu ứng mượt mà
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: () => <Text style={Theme.fontTitle}>HOME</Text>,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
