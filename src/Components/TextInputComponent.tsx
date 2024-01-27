import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
  Image,
} from 'react-native';

import Colors from '../Common/Colors';
import {HEIGHT_TEXT_INPUT} from '../Common/Dimentions';
import Theme from '../Common/Theme';

interface TextInputComponentProps extends TextInputProps {
  placeholder: string;
  height?: number;
  value?: string;
  isBarCode?: boolean;

  onChangeText?: (text: string) => void;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  placeholder = '',
  height = HEIGHT_TEXT_INPUT,
  value = '',
  isBarCode = false,
  onChangeText,
  ...props
}) => {
  const [focus, setFocus] = useState(0);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: focus ? Colors.primary : Colors.border,
          height: height,
        },
      ]}>
      {value !== '' ? (
        <Text
          style={[
            styles.label,
            {color: focus ? Colors.primary : Colors.black},
          ]}>
          {placeholder}
        </Text>
      ) : (
        <></>
      )}

      <TextInput
        placeholder={placeholder}
        style={styles.text}
        placeholderTextColor="gray"
        autoCapitalize="none"
        onFocus={() => {
          setFocus(1);
        }}
        onBlur={() => {
          setFocus(0);
        }}
        onChangeText={value => onChangeText && onChangeText(value)}
        value={value}
        {...props}
      />
      {isBarCode && (
        <TouchableOpacity style={styles.barCodeView}>
          <Image
            source={require('..//../assets/barcode.png')}
            style={styles.barCodeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(TextInputComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
  },

  text: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    padding: 5,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.fontSize,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.backgroundColor,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSize,
    fontFamily: Theme.fontFamily,
  },
  barCodeView: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  barCodeIcon: {
    width: 40,
    height: 40,
  },
});
