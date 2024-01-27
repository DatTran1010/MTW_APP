import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HEIGHT_TEXT_INPUT} from '../Common/Dimentions';
import LineComponent from '../Components/LineComponent';
import Colors from '../Common/Colors';
import i18next from 'i18next';
import Theme from '../Common/Theme';
interface LogOutComponentProps {
  handleSheetChanges?: (index: number) => void;
  onLogout?: () => void;
}
const LogOutComponent: React.FC<LogOutComponentProps> = ({
  handleSheetChanges,
  onLogout,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          marginVertical: 10,
          marginHorizontal: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: HEIGHT_TEXT_INPUT,
          }}>
          <Text>{i18next.t('question-logout')}</Text>
        </View>
        <LineComponent />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: HEIGHT_TEXT_INPUT,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (onLogout) {
                onLogout();
              }
            }}>
            <Text style={[Theme.font, {color: Colors.black}]}>
              {i18next.t('logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          borderRadius: 10,
          height: HEIGHT_TEXT_INPUT,
          marginHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (handleSheetChanges) {
              handleSheetChanges(-1);
            }
          }}>
          <Text style={[Theme.font, {color: 'red'}]}>
            {i18next.t('cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogOutComponent;

const styles = StyleSheet.create({});
