import {
  FlatList,
  FlatListProps,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {HEIGHT_CHART} from '../../Common/Dimentions';
import Colors from '../../Common/Colors';
import Theme from '../../Common/Theme';
import useApiQuery from '../../../services/useApiQuery';
import * as homeServices from '../../apiServices/homeService';
import {MachineListType} from '../../typeServices/type.app';
import ContentLoaderComponent from '../../Components/ContentLoaderComponent';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

interface DataProps {
  id: number;
  name: string;
}

interface MachineListProps extends FlatListProps<DataProps> {
  navigation: any;
  dateToFrom: {
    startDate: string;
    endDate: string;
  };
  loc: boolean;
}

const MachineList: React.FC<MachineListProps> = ({
  navigation,
  dateToFrom,
  loc,
}) => {
  const languege = useSelector(state => state.app.language);

  const dataListMachine = useApiQuery(
    ['listMachine', dateToFrom.startDate, dateToFrom.endDate, loc, languege],
    () =>
      homeServices.getListMachine(
        dateToFrom.startDate,
        dateToFrom.endDate,
        loc,
        languege,
      ),
    !!dateToFrom.startDate || !!dateToFrom.endDate || !!loc,
  ) as {data: MachineListType[]};

  return (
    <>
      {dataListMachine.data && dataListMachine.data.length > 0 ? (
        <Animated.View
          entering={
            Platform.OS === 'ios' ? FadeInLeft.duration(1000) : undefined
          }
          style={styles.container}>
          <FlatList
            refreshing={false}
            onRefresh={() => {
              dataListMachine.refetch();
            }}
            data={dataListMachine.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <View style={[styles.viewContent]}>
                  <View style={styles.headerContent}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={[
                          styles.machinename,
                          Theme.font,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {color: item.tinH_TRANG > 1 ? 'red' : Colors.black},
                        ]}>
                        {item.teN_MAY}
                      </Text>
                      <Text
                        style={[
                          Theme.font,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {color: item.tinH_TRANG > 1 ? 'red' : Colors.black},
                        ]}>
                        {item.mS_MAY}
                      </Text>
                    </View>

                    <TouchableOpacity
                      disabled={!item.online}
                      onPress={() => {
                        navigation.navigate('DetailsContainer', {
                          name: 'DetailsContainer',
                          MS_MAY: item.mS_MAY,
                          initScreen: 'MonitorRealTime',
                          ID_TB: item.iD_TB,
                          dateToFrom: dateToFrom,
                          MachineStatus: item.online,
                        });
                      }}
                      style={[
                        styles.online,
                        {
                          backgroundColor: item.online
                            ? Colors.chart1
                            : '#b1b1b1',
                        },
                      ]}>
                      <Text
                        style={[
                          Theme.font,
                          {
                            color: item.online ? Colors.black : Colors.white,
                          },
                        ]}>
                        {item.online ? 'ON' : 'OFF'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bodyContent}>
                    <View style={styles.percent}>
                      <Text style={Theme.font}>
                        {item.kW_DAT +
                          ' KWh' +
                          ' (' +
                          item.phaN_TRAM_DAT +
                          '%)'}
                      </Text>
                      <Text style={Theme.font}>
                        {item.kW_CHUA_DAT +
                          ' KWh' +
                          ' (' +
                          item.phaN_TRAM_CHUA_DAT +
                          '%)'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.chartContent}
                      onPress={() => {
                        navigation.navigate('DetailsContainer', {
                          name: 'DetailsContainer',
                          MS_MAY: item.mS_MAY,
                          initScreen: 'Monitor',
                          ID_TB: item.iD_TB,
                          dateToFrom: dateToFrom,
                          MachineStatus: item.online,
                        });
                      }}>
                      <View style={styles.noFee} />
                      {/* <LinearGradient
             colors={Colors.colorChart2}
             style={styles.noFee}></LinearGradient> */}

                      <View
                        style={[
                          styles.reachfee,
                          {
                            width:
                              item.phaN_TRAM_DAT &&
                              item.phaN_TRAM_DAT.toString() === '0'
                                ? '0'
                                : item.phaN_TRAM_DAT.toString() + '%',
                          },
                        ]}
                      />
                    </TouchableOpacity>

                    <View style={styles.percent}>
                      <Text style={Theme.font}>
                        {'(' + item.chI_PHI_DAT + ' VND)'}
                      </Text>
                      <Text style={Theme.font}>
                        {'(' + item.chI_PHI_CHUA_DAT + ' VND)'}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </Animated.View>
      ) : (
        <ContentLoaderComponent />
      )}
    </>
  );
};

export default MachineList;

const styles = StyleSheet.create({
  container: {flex: 1},
  headerContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  machinename: {
    marginRight: 20,
  },
  online: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  textOnline: {},
  bodyContent: {
    flex: 2,
  },
  viewContent: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    flex: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundColor,
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  percent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: 6,
  },
  noFee: {
    width: '100%',
    height: HEIGHT_CHART,
    backgroundColor: Colors.chart2,
    marginVertical: 10,
  },
  reachfee: {
    position: 'absolute',
    height: HEIGHT_CHART,
    backgroundColor: Colors.chart1,
    marginVertical: 10,
  },
  chartContent: {
    flex: 1,
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});
