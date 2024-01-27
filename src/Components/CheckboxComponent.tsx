import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Theme from '../Common/Theme';
import Colors from '../Common/Colors';

interface CheckboxComponentProps extends TouchableOpacityProps {
  value?: boolean;
  size?: number;
  label?: string;
  isBackgroundColor?: boolean;
}
const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  value = false,
  size = 20,
  label = 'name checkbox',
  isBackgroundColor = true,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkContent}
        activeOpacity={0.7}
        {...props}>
        <View
          style={[
            styles.checkboxStyle,
            {
              width: size,
              height: size,
            },
          ]}>
          <Ionicons
            name="checkmark-outline"
            size={size - 5}
            color={value ? Colors.primarySecond : Colors.white}
          />
        </View>
        <View style={styles.textView}>
          <Text style={Theme.font}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckboxComponent;
const styles = StyleSheet.create({
  container: {},
  checkboxStyle: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    marginLeft: 10,
    flexShrink: 1,
  },
});
