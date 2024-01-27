import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import Animated, {FadeInLeft} from 'react-native-reanimated';

import Colors from '../../../Common/Colors';
import Theme from '../../../Common/Theme';
import {HEIGHT_CHART, WIDTH_SCREEN} from '../../../Common/Dimentions';
import CircularProgress from './Chart/CircularProgress';
import useApiQuery from '../../../../services/useApiQuery';
import * as monitorService from '../../../apiServices/monitorService';
import {MonitorType} from '../../../typeServices/type.app';
import ContentLoaderComponent from '../../../Components/ContentLoaderComponent';
import {useSelector} from 'react-redux';

interface MonitorProps {
  navigation: any;
  MA_THIET_BI: string | number;
  ID_TB: number;
  dateToFrom: {
    startDate: string;
    endDate: string;
  };
}
const Monitor: React.FC<MonitorProps> = ({
  navigation,
  MA_THIET_BI,
  ID_TB,
  dateToFrom,
}) => {
  const {t} = useTranslation();
  const languege = useSelector(state => state.app.language);

  const dataMonitor = useApiQuery(
    ['monitor', dateToFrom.startDate, dateToFrom.endDate, languege],
    () =>
      monitorService.getDataMonitor(
        dateToFrom.startDate,
        dateToFrom.endDate,
        ID_TB,
        languege,
      ),
    !!dateToFrom.startDate || !!dateToFrom.endDate,
  ) as {data: MonitorType};

  return (
    <>
      {dataMonitor.data && dataMonitor.data.thongKeLoiVanHanh ? (
        <Animated.View
          entering={
            Platform.OS === 'ios' ? FadeInLeft.duration(1000) : undefined
          }
          style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={[styles.machineName]}>
              {t('thiet-bi')} : {MA_THIET_BI}
            </Text>
            <Text style={Theme.font}>
              {moment(dateToFrom.startDate).format('DD/MM/YYYY')} -{' '}
              {moment(dateToFrom.endDate).format('DD/MM/YYYY')}
            </Text>
            <View style={styles.tinhTrangDongCo}>
              <Text
                style={[
                  Theme.fontTitle,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color:
                      dataMonitor.data.typE_MACHINE === 1
                        ? Colors.chart1
                        : 'red',
                  },
                ]}>
                {dataMonitor.data.typE_MACHINE === 1
                  ? t('dong-co-khong-can-bao-tri')
                  : t('dong-co-can-bao-tri')}
              </Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <ScrollView style={styles.scroolViewContent}>
              <View style={[styles.card]}>
                <View style={styles.cardView}>
                  <Text style={styles.cardText}>
                    {t('thong-so-van-hanh-dong-co')}
                  </Text>
                </View>
                <View>
                  {dataMonitor.data.thongSoVanHanh.map(item => {
                    const PHAN_TRAM_GIOI_HAN =
                      (item.thuC_TE /
                        ((Math.max(item.gioI_HAN, item.gioI_HAN_2) / 80) *
                          100)) *
                      100;

                    return (
                      <View key={item.iD_ND} style={styles.contentView}>
                        <View style={styles.chartContent}>
                          <View style={styles.viewGioiHan} />
                          <View style={styles.lineBlack} />
                          <View style={styles.lineWhite} />

                          {item.gioI_HAN !== item.gioI_HAN_2 && (
                            <>
                              <View style={styles.lineBlack2} />
                              <View style={styles.lineWhite2} />
                            </>
                          )}
                        </View>
                        <View
                          style={[
                            styles.valueChart,
                            {
                              width:
                                item.thuC_TE >
                                Math.max(item.gioI_HAN, item.gioI_HAN_2)
                                  ? '95%'
                                  : PHAN_TRAM_GIOI_HAN.toString() + '%',
                              backgroundColor: item.color,
                            },
                          ]}>
                          <Text style={Theme.font}>{item.thuC_TE}</Text>
                        </View>

                        <View style={styles.noteView}>
                          <Text style={Theme.font}>{item.teN_ND}</Text>
                          <View style={styles.gioiHanView}>
                            <Text style={Theme.font}>
                              {Math.max(item.gioI_HAN, item.gioI_HAN_2)}
                            </Text>
                          </View>

                          {item.gioI_HAN !== item.gioI_HAN_2 && (
                            <View style={styles.gioiHan2View}>
                              <Text style={Theme.font}>
                                {Math.min(item.gioI_HAN, item.gioI_HAN_2)}
                              </Text>
                            </View>
                          )}

                          {/* <View
                        style={[
                          styles.thucTeView,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            right:
                              item.THUC_TE >= item.GIOI_HAN
                                ? 10
                                : WIDTH_SCREEN -
                                  (WIDTH_SCREEN * PHAN_TRAM_GIOI_HAN) / 100 -
                                  7,
                          },
                        ]}>
                        <Text style={Theme.font}>{item.THUC_TE}</Text>
                      </View> */}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={[styles.card]}>
                <View style={styles.cardView}>
                  <Text style={styles.cardText}>
                    {t('thong-ke-loi-van-hanh')}
                  </Text>
                </View>
                <View style={styles.circularView}>
                  {dataMonitor.data.thongKeLoiVanHanh.map(item => {
                    return (
                      <View key={item.iD_ND} style={styles.item}>
                        <CircularProgress
                          percent={
                            item.gioI_HAN === 0
                              ? 0
                              : Math.round((item.thuC_TE / item.gioI_HAN) * 100)
                          }
                          text={item.teN_HIEN}
                          color={item.color}
                          color_opacity={item.coloR_OPACITY}
                        />
                        <Text style={[Theme.font]}>{item.teN_ND}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      ) : (
        <ContentLoaderComponent />
      )}
    </>
  );
};

export default memo(Monitor);

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
  bodyContainer: {
    flex: 1,
  },
  scroolViewContent: {
    flex: 1,
    marginBottom: 20,
  },
  machineName: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
  },
  tinhTrangDongCo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  card: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: Colors.backgroundColor,
    shadowColor: Colors.black,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 3.85,
    elevation: 5,
    borderRadius: 10,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
  },
  contentView: {
    marginVertical: 10,
  },
  chartContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewGioiHan: {
    width: '80%',
    height: HEIGHT_CHART + 10, // chiều cao + thêm 10 vì cao hơn chart 10 đơn vị
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: Colors.black, // Màu của đường đoạn
  },
  lineBlack: {
    width: 1,
    height: HEIGHT_CHART + 20, // cao hơn view giới hạn 10 đơn vj để lòi ra
    backgroundColor: 'black',
  },
  lineWhite: {
    width: 5,
    height: 20,
    backgroundColor: Colors.white,
    position: 'absolute',

    right: WIDTH_SCREEN - 5 - (WIDTH_SCREEN * 80) / 100, // right = WIDTH - 5PX PADDING - 80%
  },

  lineBlack2: {
    width: 1,
    height: HEIGHT_CHART + 20, // cao hơn view giới hạn 10 đơn vj để lòi ra
    backgroundColor: Colors.black,
    position: 'absolute',
    right: WIDTH_SCREEN - 5 - (WIDTH_SCREEN * 60) / 100,
  },
  lineWhite2: {
    width: 5,
    height: 20,
    backgroundColor: Colors.white,
    position: 'absolute',
    right: WIDTH_SCREEN - 5 - (WIDTH_SCREEN * 60) / 100, // right = WIDTH - 5PX PADDING - 80%
  },

  valueChart: {
    marginTop: 10,
    position: 'absolute',
    height: HEIGHT_CHART,
    borderWidth: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardView: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  item: {
    width: WIDTH_SCREEN / 2 - 7, // Đảm bảo rằng mỗi item chiếm 1/2 chiều rộng màn hình
    alignItems: 'center',
    flexShrink: 2,
  },
  circularView: {
    marginVertical: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  noteView: {
    flexDirection: 'row',
  },
  gioiHanView: {
    position: 'absolute',
    right: WIDTH_SCREEN - 10 - (WIDTH_SCREEN * 80) / 100,
  },
  gioiHan2View: {
    position: 'absolute',
    right: WIDTH_SCREEN - 10 - (WIDTH_SCREEN * 60) / 100,
  },
  thucTeView: {
    position: 'absolute',
  },
});
