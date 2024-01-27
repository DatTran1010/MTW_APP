import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {HEIGHT_BUTTON, HEIGHT_SCREEN} from '../Common/Dimentions';
import Colors from '../Common/Colors';
import Theme from '../Common/Theme';

interface ButtonComponentProps extends TouchableOpacityProps {
  buttonTitle?: string;
  colorButton?: string;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  buttonTitle,
  colorButton = Colors.colorButton,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[Theme.shadow, {borderRadius: 5}]}
      disabled={disabled}
      {...props}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 2, y: 0}}
        colors={disabled ? Colors.colorDisabled : colorButton}
        style={[styles.buttonContainer, Theme.shadow]}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: HEIGHT_BUTTON,
    backgroundColor: Colors.primary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    fontFamily: Theme.fontFamily,
  },
});
