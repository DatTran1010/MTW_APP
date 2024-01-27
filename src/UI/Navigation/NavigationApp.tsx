import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from '../Authent/Login';
import DrawerNavigator from './DrawerNavigator';
import Home from '../Home/Home';
import Monitor from '../Home/DetailsScreen/Monitor';
import {Text} from 'react-native';
import Theme from '../../Common/Theme';
import Colors from '../../Common/Colors';
import DetailsContainer from '../Container/DetailsContainer';
import LoginContainer from '../Authent/LoginContainer';

const NavigationApp = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 500}}, // Cấu hình animation
            close: {animation: 'timing', config: {duration: 500}}, // Cấu hình animation
          },
        }}>
        <Stack.Screen
          name="LoginContainer"
          component={LoginContainer}
          options={{
            headerShown: false,
            title: 'LoginContainer',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: 'Login',
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="DetailsContainer"
          component={DetailsContainer}
          options={{
            headerShown: true,
            headerTintColor: Colors.black,
            headerTitle: () => <Text style={Theme.fontTitle}></Text>,
          }}
        />
        {/* <Stack.Screen
          name="Monitor"
          component={Monitor}
          options={{
            headerShown: true,
            headerTintColor: Colors.black,
            headerTitle: () => (
              <Text style={Theme.fontTitle}>GIÁM SÁT TÌNH TRẠNG ĐỘNG CƠ</Text>
            ),
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;
