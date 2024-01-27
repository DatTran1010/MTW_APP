import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  TouchableOpacityProps,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Common/Colors';
import Theme from '../Common/Theme';

interface IconIconComponentProps extends TouchableOpacityProps {
  label?: string;
  nameicon: string;
  size?: number;
  colorIcon?: string;
}
const IconComponent: React.FC<IconIconComponentProps> = ({
  label,
  nameicon,
  size = 20,
  colorIcon = Colors.primarySecond,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLongPressIcon = () => {
    setShowTooltip(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handlePressOut = () => {
    setShowTooltip(false);
  };
  return (
    <View>
      <TouchableOpacity
        onPressOut={handlePressOut}
        onLongPress={handleLongPressIcon}
        style={[styles.iconStyle]}
        {...props}>
        <Ionicons name={nameicon} size={size} color={colorIcon} />
      </TouchableOpacity>
      {showTooltip && (
        <Animated.View style={styles.toltipContainer}>
          <Text style={Theme.font}>{label}</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default IconComponent;

const styles = StyleSheet.create({
  toltipContainer: {
    position: 'absolute',
    backgroundColor: Colors.primarySecond,
    padding: 8,
    borderRadius: 4,
    top: -50, // Change this value based on your design
    right: -20,
  },
  iconStyle: {
    borderRadius: 5,
    borderColor: Colors.primary,
    marginHorizontal: 5,
  },
});
