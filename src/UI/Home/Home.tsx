import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {useTranslation} from 'react-i18next';

import {HEIGHT_SCREEN} from '../../Common/Dimentions';
import Colors from '../../Common/Colors';
import CheckboxComponent from '../../Components/CheckboxComponent';
import IconComponent from '../../Components/IconComponent';
import CalendarComponent from '../../Components/CalendarComponent';
import moment from 'moment';
import ContainerApp from '../Container/ContainerApp';
import MachineList from './MachineList';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const {t} = useTranslation();

  const isVisible = useSharedValue(false);
  const [dateToFrom, setDateToFrom] = useState({
    startDate: moment(new Date()).add(-6, 'days').format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
  });

  const [checked, setChecked] = useState(false);

  const handleSelectedDate = (date: {startDate: string; endDate: string}) => {
    setDateToFrom({
      startDate: date.startDate,
      endDate: date.endDate,
    });
  };

  const handleCheckedFillter = () => {
    setChecked(!checked);
  };

  const handleShowFillControl = () => {
    isVisible.value = !isVisible.value;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: withTiming(isVisible.value ? 1 : 0, {duration: 500}),
      opacity: withTiming(isVisible.value ? 1 : 0, {duration: 300}),
    };
  });

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        withSpring(
          {
            rotate: isVisible.value ? '180deg' : '0deg',
          },
          {duration: 2000},
        ),
      ],
    };
  });
  return (
    <ContainerApp title="" navigation={navigation} headerLeftVisible={false}>
      <View style={styles.container}>
        {/* <StatusBar backgroundColor={'red'} /> */}
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.hideIcon, arrowAnimatedStyle]}>
            <IconComponent
              nameicon="chevron-down-outline"
              colorIcon={Colors.black}
              size={30}
              onPress={handleShowFillControl}
              // style={styles.iconDropDown}
            />
          </Animated.View>

          <Animated.View style={[animatedStyle]}>
            <View style={[styles.fillterControl]}>
              <CalendarComponent
                startDate={dateToFrom.startDate}
                endDate={dateToFrom.endDate}
                onClickDone={handleSelectedDate}
                placeholder={t('from-to-date')}
              />
            </View>

            <View style={[styles.fillterControl, {alignItems: 'flex-start'}]}>
              <CheckboxComponent
                size={20}
                label={t('filter-satus')}
                onPress={handleCheckedFillter}
                value={checked}
              />
            </View>
          </Animated.View>
          <View style={styles.bodyContent}>
            <View style={styles.viewContent}>
              <MachineList
                renderItem={undefined}
                navigation={navigation}
                data={undefined}
                dateToFrom={dateToFrom}
                loc={checked}
              />
            </View>
          </View>
        </View>
      </View>
    </ContainerApp>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  contentContainer: {
    flex: 1,
    margin: 10,
  },

  bodyContent: {
    flex: 5,
  },
  fillterControl: {
    flex: 1,
  },

  search: {
    flex: 0.1,
  },
  grid: {
    flex: 0.9,
    marginVertical: 10,
  },
  iconPagination: {
    marginHorizontal: 10,
  },
  hideIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  viewContent: {
    flex: 1,
    marginBottom: HEIGHT_SCREEN / 10,
  },
});
