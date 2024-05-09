import React, {useEffect, memo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../Common/Colors';

import LinearGradient from 'react-native-linear-gradient';
import {useSharedValue} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

interface HeaderAppProps {
  navigation: any;
  title: string;
  headerLeftVisible: boolean;
  goBack?: boolean;
  colorHeader?: string[];
}

interface IconButtonProps {
  onPress?: () => void;
}

const BackButton: React.FC<IconButtonProps> = ({onPress}) => {
  return (
    <Ionicons
      name="arrow-back-outline"
      size={30}
      color={Colors.black}
      style={styles.icon}
      onPress={onPress}
    />
  );
};

const MenuButton: React.FC<IconButtonProps> = ({onPress}) => {
  return (
    <Ionicons
      name="reorder-three"
      size={40}
      color={Colors.white}
      style={styles.icon}
      onPress={onPress}
    />
  );
};

const GradientHeader = ({colorHeader}) => {
  const translateX = useSharedValue(-1); // Giá trị ban đầu ngoài vùng nhìn thấy

  // Bắt đầu animation
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     translateX.value = withRepeat(
  //       withSpring(1, {
  //         damping: 1,
  //         stiffness: 90,
  //         duration: 5000,
  //       }),
  //       -1,
  //       false,
  //     );
  //     clearInterval(interval); // Dừng interval sau khi animation thực hiện 1 lần
  //   }, 5000);
  // }, []);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateX: translateX.value * 250 }],
  //   };
  // });

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 2, y: 0}}
      colors={colorHeader}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

const HeaderApp: React.FC<HeaderAppProps> = ({
  navigation,
  title,
  headerLeftVisible = true,
  goBack = false,
  colorHeader = Colors.colorHeader,
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () =>
        headerLeftVisible &&
        (goBack ? (
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
        ) : (
          <MenuButton onPress={() => navigation.openDrawer()} />
        )),

      // headerRight: () => (
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //     }}>
      //     {/* <Ionicons
      //       name="person-circle-outline"
      //       size={30}
      //       color={colors.white}
      //       style={{ marginRight: 15 }}
      //       onPress={handleInfo}
      //     /> */}
      //   </View>
      // ),
      headerStyle: {backgroundColor: Colors.primary},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerBackground: () => <GradientHeader colorHeader={colorHeader} />,
    });
  }, [goBack, headerLeftVisible, navigation]);
  return null;
};

export default memo(HeaderApp);

const styles = StyleSheet.create({
  icon: {
    marginLeft: 15,
  },
});
