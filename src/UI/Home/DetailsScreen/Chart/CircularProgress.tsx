import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {WIDTH_SCREEN} from '../../../../Common/Dimentions';
import Animated, {
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Colors from '../../../../Common/Colors';
import Theme from '../../../../Common/Theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = WIDTH_SCREEN / 2.5;
const radius = SIZE / 2; // bán kính
const circumference = radius * Math.PI * 2; // tính chu vi
const dashArray = circumference; // đăc tả của đường tròn
const DURATION = 800;

interface CircularProgressProps {
  percent: number;
  text?: string;
  color: string;
  color_opacity: string;
}
const CircularProgress: React.FC<CircularProgressProps> = ({
  percent,
  text,
  color,
  color_opacity,
}) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSpring(100, {duration: DURATION});
  }, [animatedValue]);

  const dashOffset = useDerivedValue(() => {
    return interpolate(
      animatedValue.value,
      [0, 100],
      [dashArray, circumference * (1 - percent / 100)],
    );
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(dashOffset.value, {duration: DURATION}),
    };
  });
  return (
    <View style={styles.container}>
      <Text style={styles.textView}>{text}</Text>

      <Svg
        height={SIZE}
        width={SIZE}
        viewBox="-100 -100 200 200"
        style={styles.shadowCircle}>
        <Circle
          cx="0"
          cy="0"
          r={radius}
          stroke={color_opacity}
          strokeWidth="20"
          fill="transparent"
        />
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="0"
          cy="0"
          r={radius}
          strokeDasharray={`${dashArray}`}
          strokeDashoffset={`${dashOffset}`}
          strokeWidth="20"
          fill="transparent"
          stroke={color}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textView: {
    color: '#37306B',
    fontSize: Theme.fontSize,
    fontWeight: 'bold',
    position: 'absolute',
  },
  shadowCircle: {
    shadowColor: Colors.black,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 3.85,
    elevation: 5,
  },
});

export default CircularProgress;
