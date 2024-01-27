import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  BounceInUp,
  BounceOutUp,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withRepeat,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import IconComponent from './IconComponent';
import Colors from '../Common/Colors';
import {WIDTH_SCREEN} from '../Common/Dimentions';
import Theme from '../Common/Theme';
import {setShowToast} from '../Redux/AppSlice';

const ToastComponent = () => {
  const dispatch = useDispatch();
  const toastContainer = useSelector(state => state.app.toastContainer);
  // useEffect(() => {
  //   if (toastContainer.showToast) {
  //     const timer = setTimeout(() => {
  //       dispatch({
  //         type: "SET_SHOW_TOAST",
  //         payload: {
  //           showToast: false,
  //           title: "Thông báo",
  //           body: "",
  //         },
  //       });
  //     }, 2000);

  //     // Hủy bỏ timer nếu component unmount trước khi 5 giây
  //     return () => clearTimeout(timer);
  //   }
  // }, [toastContainer.showToast]);

  const typeToast = () => {
    try {
      switch (toastContainer.type) {
        case 'info': {
          return {
            iconName: 'information-circle',
            color: Colors.info,
            backgroundColor: Colors.white,
          };
        }
        case 'error': {
          return {
            iconName: 'alert-circle-outline',
            color: Colors.error,
            backgroundColor: '#ffebe6',
          };
        }
        case 'success': {
          return {
            iconName: 'checkmark-circle-sharp',
            color: Colors.success,
            backgroundColor: '#e3fcef',
          };
        }
        case 'warning': {
          return {
            iconName: 'warning',
            color: Colors.warning,
            backgroundColor: '#fffae6',
          };
        }
        default: {
          return {
            iconName: 'warning',
            color: Colors.warning,
          };
        }
      }
    } catch {
      return {
        iconName: 'alert-circle-outline',
        color: Colors.error,
      };
    }
  };
  //handle
  const handleCloseToast = () => {
    dispatch(
      setShowToast({
        showToast: false,
        title: 'Thông báo',
        body: '',
      }),
    );
  };

  //kéo thả toast
  const translateY = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startY = translateY.value;
      // console.log("Kéo bắt đầu");
    },
    onActive: (event, context) => {
      context.startY = event.translationY;
      // console.log(event.translationY);
      translateY.value = event.translationY;
      // console.log("Kéo đang diễn ra");
    },
    onEnd: (event, context) => {
      // console.log(context.startY);
      if (context.startY <= -40) {
        runOnJS(handleCloseToast)();
      } else {
        translateY.value = withSpring(0);
      }

      // console.log("Kéo kết thúc");
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  // processBar toast
  const widthProcess = useSharedValue(0); // Giá trị width ban đầu là 0
  const duration = 2000; // Thời gian chạy tính bằng mili giây (5 giây)

  useEffect(() => {
    widthProcess.value = 0;
    widthProcess.value = withRepeat(
      withTiming(100, {duration: duration, easing: Easing.linear}, finished => {
        if (finished) {
          runOnJS(handleCloseToast)();
        }
      }),
      1, // -1 để lặp vô hạn
      false, // true để chuyển đổi giá trị ngược lại sau mỗi lần lặp
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastContainer.showToast]);

  const animatedProcessStyle = useAnimatedStyle(() => {
    return {
      width: `${widthProcess.value}%`,
    };
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderToast = () => {
    return (
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          entering={BounceInUp.duration(1000)}
          exiting={BounceOutUp.duration(1000)}
          style={[
            rStyle,
            Theme.shadow,
            styles.toastContainer,
            {
              backgroundColor: typeToast().color,
            },
          ]}>
          <View style={styles.toastIcon}>
            <IconComponent
              nameicon={typeToast().iconName}
              size={25}
              colorIcon={Colors.white}
            />
          </View>

          <View
            style={[
              styles.toastView,
              {
                backgroundColor: typeToast().backgroundColor,
              },
            ]}>
            <View style={styles.toastTitleView}>
              <Text
                style={[
                  Theme.font,
                  {
                    color: typeToast().color,
                  },
                  styles.toastTitleText,
                ]}>
                {toastContainer.title}
              </Text>
              <Text
                style={[
                  Theme.font,
                  {color: typeToast().color},
                  styles.toastTextBody,
                ]}>
                {toastContainer.body}
              </Text>
            </View>
            <View style={styles.toastIconClose}>
              <IconComponent
                nameicon={'close-outline'}
                size={25}
                colorIcon={typeToast().color}
                onPress={handleCloseToast}
              />
            </View>
          </View>
          <Animated.View
            style={[
              {
                backgroundColor: typeToast().color,
              },
              styles.toastProgress,
              animatedProcessStyle,
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  };
  return toastContainer.showToast && <RenderToast />;
};

export default ToastComponent;

const styles = StyleSheet.create({
  toastContainer: {
    top: 50,
    width: WIDTH_SCREEN - 40,
    borderRadius: 5,
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 999,
  },
  toastIcon: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  toastView: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  toastTitleView: {
    marginRight: 20,
  },
  toastTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  toastTextBody: {
    fontWeight: '400',
  },
  toastIconClose: {
    right: 0,
    top: 0,
    position: 'absolute',
  },
  toastProgress: {
    height: 8,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 5,
  },
});
