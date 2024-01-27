import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';
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
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const SIZE = WIDTH_SCREEN / 2.5;
const radius = SIZE / 2; // bán kính
const DURATION = 700;
const strokeWidth = radius * 0.2;
const innerRadius = radius - strokeWidth / 2;

const circumference = innerRadius * 2 * Math.PI;
const arc = circumference * (270 / 360);
const dashArray = `${arc} ${circumference}`;
const transform = `rotate(135, ${radius}, ${radius})`;

interface CircularProgressProps {
  percent: number;
  text?: string;
  color: string;
  color_opacity: string;
  minValue?: number | string;
  maxValue?: number | string;
}
const SemiCircleProgressBar: React.FC<CircularProgressProps> = ({
  percent,
  text,
  color,
  color_opacity,
  minValue,
  maxValue,
}) => {
  const percentNormalized = Math.min(Math.max(percent, 0), 100);

  //animation

  //#region  animated Text
  const animatedTextValue = useSharedValue(0);

  const animatedValueTEXT = useDerivedValue(() => {
    return withTiming(animatedTextValue.value, {duration: DURATION});
  });

  const animatedTextInputProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(animatedValueTEXT.value * 100) / 100}`,
    };
  });

  useEffect(() => {
    animatedTextValue.value = withSpring(parseFloat(text?.split(' ')[0]), {
      duration: DURATION,
    });
  }, [animatedTextValue, text]);
  //#endregion

  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSpring(100, {duration: DURATION});
  }, [animatedValue]);

  const dashOffset = useDerivedValue(() => {
    return interpolate(
      animatedValue.value,
      [0, 100],
      [arc, arc - (percentNormalized / 100) * arc],
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
      {/* <AnimatedTextInput
        style={styles.textView}
        animatedProps={animatedTextInputProps}
      /> */}

      <Svg height={radius * 2} width={radius * 2} style={styles.shadow}>
        <Circle
          cx={radius}
          cy={radius}
          fill="transparent"
          r={innerRadius}
          stroke={color_opacity}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          transform={transform}
        />
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx={radius}
          cy={radius}
          fill="transparent"
          r={innerRadius}
          strokeDasharray={dashArray}
          // strokeDashoffset={offset}
          strokeWidth={strokeWidth}
          transform={transform}
          stroke={color}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{minValue}</Text>
        <Text style={styles.text}>{maxValue}</Text>
      </View>
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
    fontSize: 24,
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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Adjust the width as needed
    position: 'absolute',
    bottom: 0,
  },
  text: {
    color: Colors.black,
    fontSize: Theme.fontSize,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 3.85,
    elevation: 5,
  },
});

export default SemiCircleProgressBar;
