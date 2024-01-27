import {View, StyleSheet, ViewProps} from 'react-native';
import React from 'react';
import Colors from '../Common/Colors';

interface LineComponentProps extends ViewProps {}

const LineComponent: React.FC<LineComponentProps> = () => {
  return <View style={styles.container} />;
};

export default LineComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
});
