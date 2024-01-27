import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../../Common/Colors';
import {HEIGHT_CHART} from '../../../../Common/Dimentions';
import Theme from '../../../../Common/Theme';

interface StackChartProps {
  data: {
    id: number;
    valuE_HU: number;
    phaN_TRAM_HU: number;
    coloR_HU: string;
    valuE_LP_KT: number;
    phaN_TRAM_LP_KT: number;
    coloR_LP_KT: string;
    valuE_HST: number;
    phaN_TRAM_HST: number;
    coloR_HST: string;
    doN_VI: string;
    teN_ND_HU: string;
    teN_ND_LP: string;
    teN_ND_HST: string;
  }[];
}
const StackChart: React.FC<StackChartProps> = ({data}) => {
  return (
    data &&
    data.map(item => {
      return (
        <View key={item.id} style={styles.container}>
          <View style={styles.chartContainer}>
            <View style={[styles.chartContent, Theme.shadow]}>
              {/* <View
                style={[
                  styles.bar,
                  {
                    width: item.phaN_TRAM_HU + '%',
                    backgroundColor: item.coloR_HU,
                  },
                ]}>
                {item.phaN_TRAM_HU > 0 && (
                  <>
                    <View
                      style={[
                        {
                          backgroundColor: item.coloR_HU,
                          left: item.phaN_TRAM_HU,
                        },
                        styles.viewTextValue,
                      ]}>
                      <Text style={styles.barText}>
                        {item.valuE_HU.toString() +
                          '/ ' +
                          item.phaN_TRAM_HU +
                          '%'}
                      </Text>
                    </View>

                    <View
                      style={[
                        {
                          left: item.phaN_TRAM_HU + 10,
                          borderTopColor: item.coloR_HU,
                        },
                        styles.viewArrow,
                      ]}
                    />
                  </>
                )}
              </View> */}

              <View
                style={[
                  styles.bar,
                  {
                    width: `${
                      item.phaN_TRAM_HST === 0
                        ? '100%'
                        : item.phaN_TRAM_HST + '%'
                    }`,
                    backgroundColor:
                      item.phaN_TRAM_HST === 0
                        ? Colors.chart1_opacity
                        : item.coloR_HST,
                  },
                ]}>
                {/* <Text style={styles.barText}>
                  {item.valuE_HST.toString() + '/ ' + item.phaN_TRAM_HST + '%'}
                </Text> */}

                {item.phaN_TRAM_HST > 0 && (
                  <>
                    <View
                      style={[
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          backgroundColor: item.coloR_HST,
                          left: 0,
                        },
                        item.phaN_TRAM_HST < 10 && {left: -10},
                        // eslint-disable-next-line react-native/no-inline-styles
                        item.phaN_TRAM_HST < 10 && {
                          width: 100,
                        },
                        styles.viewTextValue,
                      ]}>
                      <Text style={styles.barText}>
                        {item.valuE_HST.toString() +
                          '/ ' +
                          item.phaN_TRAM_HST +
                          '%'}
                      </Text>
                    </View>

                    <View
                      style={[
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          borderTopColor: item.coloR_HST,
                          left: 10,
                        },
                        item.phaN_TRAM_HST < 10 && {left: -10},
                        styles.viewArrow,
                      ]}
                    />
                  </>
                )}
              </View>

              <View
                style={[
                  styles.bar,
                  {
                    width: item.phaN_TRAM_LP_KT + '%',
                    backgroundColor: item.coloR_LP_KT,
                  },
                ]}>
                {item.phaN_TRAM_LP_KT > 0 && (
                  <>
                    <View
                      style={[
                        {
                          backgroundColor: item.coloR_LP_KT,
                        },
                        item.phaN_TRAM_LP_KT < 10 && {left: -50},
                        item.phaN_TRAM_LP_KT < 10 && {width: 100},
                        styles.viewTextValue,
                      ]}>
                      <Text style={styles.barText}>
                        {item.valuE_LP_KT.toString() +
                          '/ ' +
                          item.phaN_TRAM_LP_KT +
                          '%'}
                      </Text>
                    </View>

                    <View
                      style={[
                        {
                          borderTopColor: item.coloR_LP_KT,
                          right: 10,
                        },
                        item.phaN_TRAM_LP_KT < 10 && {right: -10},
                        styles.viewArrow,
                      ]}
                    />
                  </>
                )}
              </View>
            </View>
            <View style={[styles.donViView]}>
              <Text style={styles.donVi}>{item.doN_VI}</Text>
            </View>
          </View>
        </View>
      );
    })
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContent: {
    width: '85%',
    flexDirection: 'row',
    marginTop: 30,
  },
  bar: {
    height: HEIGHT_CHART,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // shadowColor: Colors.black,
    // shadowOffset: {width: 2, height: 2},
    // shadowOpacity: 0.4,
    // shadowRadius: 3.85,
    // elevation: 5,
  },
  barText: {
    color: Colors.black,
  },
  donViView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: HEIGHT_CHART,
    marginLeft: 10,
    marginTop: 30,
  },
  donVi: {
    color: Colors.black,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  viewTextValue: {
    position: 'absolute',
    top: -HEIGHT_CHART - 20,
    height: HEIGHT_CHART + 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  viewArrow: {
    position: 'absolute',
    top: -15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 13,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default StackChart;
