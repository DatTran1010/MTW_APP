import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import Colors from '../../../Common/Colors';
import {HEIGHT_CHART, WIDTH_SCREEN} from '../../../Common/Dimentions';
import DonutChart from './Chart/DonutChart';
import Theme from '../../../Common/Theme';
import StackChart from './Chart/StackChart';
import useApiQuery from '../../../../services/useApiQuery';
import * as consumeService from '../../../apiServices/consumeService';
import {ConsumeType} from '../../../typeServices/type.app';
import ContentLoaderComponent from '../../../Components/ContentLoaderComponent';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

interface ConsumeProps {
  navigation: any;
  MA_THIET_BI: string | number;
  ID_TB: number;
  dateToFrom: {
    startDate: string;
    endDate: string;
  };
}
const Consume: React.FC<ConsumeProps> = ({
  navigation,
  MA_THIET_BI,
  dateToFrom,
  ID_TB,
}) => {
  const {t} = useTranslation();
  const languege = useSelector(state => state.app.language);

  const dataConsume = useApiQuery(
    ['consume', dateToFrom.startDate, dateToFrom.endDate, languege],
    () =>
      consumeService.getDataConsume(
        dateToFrom.startDate,
        dateToFrom.endDate,
        ID_TB,
        languege,
      ),
    !!dateToFrom.startDate || !!dateToFrom.endDate,
  ) as {data: ConsumeType};

  // const dataCongSuat = [
  //   {id: 1, teN_ND: '45 kVar', phaN_TRAM: 30.24, color: Colors.chart2},
  //   {id: 2, teN_ND: '101 kW', phaN_TRAM: 69.42, color: Colors.chart1},
  //   {id: 3, teN_ND: '101 kW', phaN_TRAM: 0, color: Colors.chart3},
  // ];

  return (
    <>
      {dataConsume.data && dataConsume.data.dienNangTieuThu ? (
        <Animated.View
          style={styles.container}
          entering={
            Platform.OS === 'ios' ? FadeInLeft.duration(1000) : undefined
          }>
          <View style={styles.headerContainer}>
            <Text style={styles.machineName}>
              {t('thiet-bi')} : {MA_THIET_BI}
            </Text>
            <Text style={Theme.font}>
              {moment(dateToFrom.startDate).format('DD/MM/YYYY')} -{' '}
              {moment(dateToFrom.endDate).format('DD/MM/YYYY')}
            </Text>
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.dienNangTT}>
              <View style={styles.cardView}>
                <Text style={styles.cardText}>{t('dien-nang-lang-phi')}</Text>
              </View>
              <View style={styles.contentGroup}>
                <StackChart data={dataConsume.data.dienNangHuuIch} />
              </View>

              <View style={[styles.note, styles.viewNoteDienNangLangPhi]}>
                {/* <View style={styles.viewNote}>
                  <View
                    style={[
                      styles.noteIcon,
                      {
                        backgroundColor:
                          dataConsume.data.dienNangHuuIch[0].coloR_HU,
                      },
                    ]}
                  />
                  <Text style={Theme.font}>
                    {dataConsume.data.dienNangHuuIch[0].teN_ND_HU}
                  </Text>
                </View> */}
                <View style={styles.viewNote}>
                  <View
                    style={[
                      styles.noteIcon,
                      {
                        backgroundColor:
                          dataConsume.data.dienNangHuuIch[0].coloR_HST,
                      },
                    ]}
                  />
                  <Text style={Theme.font}>
                    {dataConsume.data.dienNangHuuIch[0].teN_ND_HST}
                  </Text>
                </View>
                <View style={styles.viewNote}>
                  <View
                    style={[
                      styles.noteIcon,
                      {
                        backgroundColor:
                          dataConsume.data.dienNangHuuIch[0].coloR_LP_KT,
                      },
                    ]}
                  />
                  <Text style={Theme.font}>
                    {dataConsume.data.dienNangHuuIch[0].teN_ND_LP}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.dienNangTT}>
              <View style={styles.cardView}>
                <Text style={styles.cardText}>{t('dien-nang-tieu-thu')}</Text>
              </View>
              <View style={styles.donutChart}>
                <View style={styles.marginDonutChart}>
                  <DonutChart
                    data={dataConsume.data.dienNangTieuThu.filter(
                      item => item.typE_BD === 1,
                    )}
                    donVi="KWh"
                    donutLength={3}
                  />
                </View>
                <View style={styles.marginDonutChart}>
                  <DonutChart
                    data={dataConsume.data.dienNangTieuThu.filter(
                      item => item.typE_BD === 2,
                    )}
                    donVi="Tr. VND"
                    donutLength={3}
                  />
                </View>
              </View>

              <View style={styles.note}>
                {dataConsume.data.dienNangTieuThu
                  .filter(f => f.typE_BD === 1)
                  .map(item => {
                    return (
                      <View style={styles.viewNote} key={item.id}>
                        <View
                          style={[
                            styles.noteIcon,
                            {backgroundColor: item.color},
                          ]}
                        />
                        <Text style={Theme.font}>{item.teN_ND}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
            <View style={styles.dienNangTT}>
              <View style={styles.cardView}>
                <Text style={styles.cardText}>{t('thoi-gian-chay-may')}</Text>
              </View>
              <View
                style={[
                  styles.contentGroup,
                  {flexDirection: 'row', marginTop: 50},
                ]}>
                <View style={styles.chartContent}>
                  <View style={[Theme.shadow, styles.timeKhongTai]}>
                    <View
                      style={[
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          right:
                            dataConsume.data.thoiGianChayMay[0]
                              .phaN_TRAM_KHONG_TAI < 5
                              ? -20
                              : 0,
                          backgroundColor:
                            dataConsume.data.thoiGianChayMay[0].coloR_KHONG_TAI,
                        },
                        styles.viewPositionValue,
                      ]}>
                      <Text style={[styles.textKhongTai, Theme.font]}>
                        {dataConsume.data.thoiGianChayMay[0].valuE_KHONG_TAI +
                          '/ ' +
                          dataConsume.data.thoiGianChayMay[0]
                            .phaN_TRAM_KHONG_TAI +
                          '%'}
                      </Text>
                    </View>
                    <View
                      style={[
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          borderTopColor:
                            dataConsume.data.thoiGianChayMay[0].coloR_KHONG_TAI,
                          right:
                            dataConsume.data.thoiGianChayMay[0]
                              .phaN_TRAM_KHONG_TAI < 5
                              ? -10
                              : 10,
                        },
                        styles.arrowPositionValue,
                      ]}
                    />
                  </View>
                  <View
                    style={[
                      Theme.shadow,
                      styles.timeCoTai,
                      {
                        width:
                          dataConsume.data.thoiGianChayMay &&
                          dataConsume.data.thoiGianChayMay[0].phaN_TRAM_CO_TAI.toString() ===
                            '0'
                            ? '0'
                            : dataConsume.data.thoiGianChayMay[0].phaN_TRAM_CO_TAI.toString() +
                              '%',
                      } as ViewStyle,
                    ]}>
                    <View
                      style={[
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          left:
                            dataConsume.data.thoiGianChayMay[0]
                              .phaN_TRAM_CO_TAI < 5
                              ? -10
                              : 0,
                          backgroundColor:
                            dataConsume.data.thoiGianChayMay[0].coloR_CO_TAI,
                        },
                        styles.viewPositionValue,
                      ]}>
                      <Text style={Theme.font}>
                        {dataConsume.data.thoiGianChayMay[0].valuE_CO_TAI +
                          '/ ' +
                          dataConsume.data.thoiGianChayMay[0].phaN_TRAM_CO_TAI +
                          '%'}
                      </Text>
                    </View>
                    <View
                      style={[
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          borderTopColor:
                            dataConsume.data.thoiGianChayMay[0].coloR_CO_TAI,
                          left:
                            dataConsume.data.thoiGianChayMay[0]
                              .phaN_TRAM_CO_TAI < 5
                              ? -10
                              : 10,
                        },
                        styles.arrowPositionValue,
                      ]}
                    />
                  </View>
                </View>
                <View style={[styles.donViView]}>
                  <Text style={[styles.textDonVi, styles.donVi]}>hrs</Text>
                </View>
              </View>
              <View style={[styles.note, styles.justifyContentArround]}>
                <View style={styles.viewNote}>
                  <View
                    style={[
                      styles.noteIcon,
                      {
                        backgroundColor:
                          dataConsume.data.thoiGianChayMay[0].coloR_CO_TAI,
                      },
                    ]}
                  />
                  <Text style={Theme.font}>
                    {dataConsume.data.thoiGianChayMay[0].teN_ND_CO_TAI}
                  </Text>
                </View>
                <View style={styles.viewNote}>
                  <View
                    style={[
                      styles.noteIcon,
                      {
                        backgroundColor:
                          dataConsume.data.thoiGianChayMay[0].coloR_KHONG_TAI,
                      },
                    ]}
                  />
                  <Text style={Theme.font}>
                    {dataConsume.data.thoiGianChayMay[0].teN_ND_KHONG_TAI}
                  </Text>
                </View>
              </View>
            </View>

            {/* <View style={styles.dienNangTT}>
              <View
                style={[
                  [
                    styles.cardView,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ],
                ]}>
                <Text style={styles.cardText}>{t('hieu-qua-dien-nang')}</Text>
                <Text style={[styles.textDonVi, styles.textDonViHieuQuaDN]}>
                  kW
                </Text>
              </View>
              <View style={[styles.contentGroup]}>
                <View style={styles.chartContent}>
                  <View
                    style={[
                      // eslint-disable-next-line react-native/no-inline-styles
                      Theme.shadow,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        width:
                          dataConsume.data.hieuQuaDienNang[0].valuE_THUC_TE >
                          dataConsume.data.hieuQuaDienNang[0].valuE_THAM_CHIEU
                            ? '80%'
                            : '100%',
                        backgroundColor:
                          dataConsume.data.hieuQuaDienNang[0].coloR_THAM_CHIEU,
                      },
                      styles.chartHieuQuaDN,
                    ]}>
                    <Text style={Theme.font}>
                      {dataConsume.data.hieuQuaDienNang[0].valuE_THAM_CHIEU}
                    </Text>
                  </View>
                  <View
                    style={[
                      // eslint-disable-next-line react-native/no-inline-styles
                      Theme.shadow,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        width:
                          dataConsume.data.hieuQuaDienNang[0].valuE_THUC_TE <
                          dataConsume.data.hieuQuaDienNang[0].valuE_THAM_CHIEU
                            ? '80%'
                            : '100%',
                        backgroundColor:
                          dataConsume.data.hieuQuaDienNang[0].coloR_THUC_TE,
                      },
                      styles.chartHieuQuaDN,
                    ]}>
                    <Text style={Theme.font}>
                      {dataConsume.data.hieuQuaDienNang[0].valuE_THUC_TE}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.note, styles.justifyContentArround]}>
                <View style={styles.viewNote}>
                  <View
                    style={[
                      styles.noteIcon,
                      {
                        backgroundColor:
                          dataConsume.data.hieuQuaDienNang[0].coloR_THAM_CHIEU,
                      },
                    ]}
                  />
                  <Text style={Theme.font}>
                    {dataConsume.data.hieuQuaDienNang[0].teN_ND_THAM_CHIEU}
                  </Text>
                </View>
                <View style={styles.viewNote}>
                  <View
                    style={[
                      styles.noteIcon,
                      {
                        backgroundColor:
                          dataConsume.data.hieuQuaDienNang[0].coloR_THUC_TE,
                      },
                    ]}
                  />
                  <Text style={Theme.font}>
                    {dataConsume.data.hieuQuaDienNang[0].teN_ND_THUC_TE}
                  </Text>
                </View>
              </View>
            </View> */}
          </ScrollView>
        </Animated.View>
      ) : (
        <ContentLoaderComponent />
      )}
    </>
  );
};

export default memo(Consume);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 7,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 10,
  },
  machineName: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
  },
  scrollContent: {
    flex: 1,
  },
  dienNangTT: {
    flex: 1,
    shadowColor: Colors.black,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 3.85,
    elevation: 5,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 6,
    marginBottom: 20,
  },

  cardText: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
  },
  cardView: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  contentGroup: {
    marginHorizontal: 10,
  },
  donutChart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  marginDonutChart: {marginTop: 20},
  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  viewNote: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  noteIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
  },

  timeKhongTai: {
    width: '100%',
    height: HEIGHT_CHART,
    backgroundColor: Colors.chart2,
    marginVertical: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timeCoTai: {
    position: 'absolute',
    height: HEIGHT_CHART,
    backgroundColor: Colors.chart1,
    marginVertical: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  chartContent: {
    flex: 1,
  },
  textKhongTai: {
    // position: 'absolute',
    // right: 0,
    // top: HEIGHT_CHART / 6,
    // bottom: 0,
  },
  donViView: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  donVi: {
    color: Colors.black,
    marginLeft: 6,
  },
  textDonVi: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: Theme.fontSize,
  },
  chartHieuQuaDN: {
    height: HEIGHT_CHART,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textDonViHieuQuaDN: {
    marginRight: 10,
  },
  viewNoteDienNangLangPhi: {
    justifyContent: 'space-around',
  },
  viewPositionValue: {
    position: 'absolute',
    top: -HEIGHT_CHART - 20,
    height: HEIGHT_CHART + 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  arrowPositionValue: {
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
  justifyContentArround: {
    justifyContent: 'space-around',
  },
});
