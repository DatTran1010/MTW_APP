import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import Animated, {FadeInLeft, useSharedValue} from 'react-native-reanimated';

import Colors from '../../../Common/Colors';
import {HEIGHT_CHART, WIDTH_SCREEN} from '../../../Common/Dimentions';
import SemiCircleProgressBar from './Chart/SemiCircleProgressBar';
import Theme from '../../../Common/Theme';
import DonutChart from './Chart/DonutChart';

import {DataRealTime} from '../../../typeServices/type.app';
import ContentLoaderComponent from '../../../Components/ContentLoaderComponent';
import {useSelector} from 'react-redux';
import {baseURL} from '../../../Common/AsyncStorageItem';

interface MonitorRealTimeProps {
  navigation: any;
  MA_THIET_BI: string | number;
  ID_TB: number;
}

const MonitorRealTime: React.FC<MonitorRealTimeProps> = ({
  navigation,
  MA_THIET_BI,
  ID_TB,
}) => {
  const {t} = useTranslation();

  const languege = useSelector(state => state.app.language);

  const [data, setData] = useState<DataRealTime>({
    bieudo1: [],
    bieudo2: [],
    bieudo3: [],
    bieudo4: [],
  });

  const [hubConnection, setHubConnection] = useState<HubConnection>();

  useEffect(() => {
    createHubConnection();
  }, []);

  const createHubConnection = async () => {
    const url = await baseURL();
    console.log(url + '/databieudo');
    const hubConnection = new HubConnectionBuilder()
      // .withUrl('http://192.168.2.21:7174/databieudo', {
      //   skipNegotiation: true,
      //   transport: HttpTransportType.WebSockets,
      // })

      .withUrl(`${url + '/databieudo'}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build();
    try {
      hubConnection.onclose(error => {
        if (error) {
          Alert.alert(`Connection closed due to an error: ${error}`);
        } else {
          console.log('Connection closed normally.');
          // Hiển thị thông báo khi kết nối bị đóng
          // Alert.alert('Connection to the server has been closed.');
          // setHubConnection(hubConnection);
        }
      });

      await hubConnection
        .start()
        .then(() => {
          console.log('Connected to SignalR Hub');
        })
        .catch((error: any) => {
          Alert.alert('Mất kết nối đến server');
          console.error('Error connecting to SignalR Hub:', error);
        });
    } catch {}

    setHubConnection(hubConnection);
  };

  useEffect(() => {
    if (hubConnection) {
      try {
        hubConnection.on('DataRealTime', async (id_tb, data) => {
          if (id_tb === ID_TB) {
            setData({
              bieudo1: data.bieuDo1,
              bieudo2: data.bieuDo2,
              bieudo3: data.bieuDo3,
              bieudo4: data.bieuDo4,
            });
          }
        });
      } catch {}
    }
  }, [ID_TB, hubConnection]);

  console.log('renderrrrrrr = =================');

  useEffect(() => {
    const getData = async () => {
      if (hubConnection) {
        try {
          await hubConnection.invoke('DataRealTime', ID_TB, 0);
        } catch {}
      }
    };
    getData();
  }, [ID_TB, hubConnection]);

  return (
    <View style={{flex: 1}}>
      {hubConnection?.state === HubConnectionState.Connected ? (
        <Animated.View
          entering={
            Platform.OS === 'ios' ? FadeInLeft.duration(1000) : undefined
          }
          style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.machineName}>
              {t('thiet-bi')} : {MA_THIET_BI}
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <ScrollView style={styles.scroolViewContent}>
              <View style={[styles.itemView, Theme.shadow]}>
                {data && data.bieudo1 ? (
                  data.bieudo1.map(item => {
                    return (
                      <View
                        key={item.id}
                        style={[styles.item, styles.circleItem]}>
                        <Text style={styles.itemText}>
                          {languege === 0 ? item.teN_ND : item.teN_ND_A}
                        </Text>
                        <SemiCircleProgressBar
                          percent={item.phaN_TRAM}
                          color={item.color}
                          color_opacity={item.coloR_OPACITY}
                          text={item.value}
                          minValue={item.miN_VALUE}
                          maxValue={item.maX_VALUE}
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text>Không có dữ liệu</Text>
                )}
              </View>

              <View style={[styles.electricContainer, Theme.shadow]}>
                <View style={styles.titleElectricContainer}>
                  <View style={styles.titleElectric}>
                    <Text style={Theme.fontBold}>{t('dien-ap')}</Text>
                  </View>
                  <View style={styles.titleElectric}>
                    <Text style={Theme.fontBold}>{t('dong-dien')}</Text>
                  </View>
                </View>
                <View style={[styles.itemView]}>
                  {data && data.bieudo2 ? (
                    data.bieudo2.map(item => {
                      // tìm ra số max của điện áp và dòng điện
                      const max_value_v = Math.max(
                        ...data.bieudo2
                          .filter(i => i.type === 0)
                          .map(item => item.value),
                      );

                      const max_value_a = Math.max(
                        ...data.bieudo2
                          .filter(i => i.type === 1)
                          .map(item => item.value),
                      );

                      //widtd value
                      const valueBD =
                        item.value > 0 // nếu item value > 0 thì mới tính các giá trị bên dưới , ngược lại sẽ = 0 %
                          ? max_value_v === item.value ||
                            max_value_a === item.value // nếu max v và a = giá trị hiện tại thì nó là lớn nhất là = 80* của biểu đồ
                            ? '80'
                            : (item.value /
                                (item.type === 0 ? max_value_v : max_value_a)) *
                              80 // ngược lại sẽ bằng value / max của a hoặc v * 80% sẽ tính ra được số % của biểu đồ còn lại
                          : '0';
                      return (
                        <View
                          key={item.id}
                          style={[styles.item, styles.stacChartItem]}>
                          <Text style={[Theme.fontBold, styles.textElectric]}>
                            {item.teN_ND}
                          </Text>
                          <View style={styles.chart}>
                            <View
                              style={[
                                styles.chartOpacity,
                                {backgroundColor: item.coloR_OPACITY},
                              ]}
                            />
                            <Animated.View
                              style={[
                                Theme.shadow,
                                styles.chartValue,
                                {
                                  backgroundColor: item.color,
                                  width: valueBD.toString() + '%',
                                  // max_value_v === item.value ||
                                  // max_value_a === item.value
                                  //   ? '80%'
                                  //   : (
                                  //       (item.value /
                                  //         (item.type === 0
                                  //           ? max_value_v
                                  //           : max_value_a)) *
                                  //       80
                                  //     ).toString() + '%',
                                },
                              ]}>
                              <Text style={Theme.fontBold}>{item.value}</Text>
                            </Animated.View>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <Text>Không có dữ liệu</Text>
                  )}
                </View>
              </View>

              <View style={[styles.itemView, Theme.shadow]}>
                <View style={styles.item}>
                  <View style={styles.titleCongSuat}>
                    <Text style={Theme.fontBold}>{t('cong-suat')}</Text>
                  </View>
                  <DonutChart data={data.bieudo3} />
                </View>
                <View style={styles.item}>
                  {data.bieudo4 && data.bieudo4 ? (
                    data.bieudo4.map(item => {
                      return (
                        <View key={item.id} style={styles.chartContainer}>
                          <View style={styles.titleLechDD}>
                            <Text style={Theme.fontBold}>
                              {languege === 0 ? item.teN_ND : item.teN_ND_A}
                            </Text>
                          </View>
                          <View style={styles.chartView}>
                            <View style={styles.chart}>
                              <View
                                style={[
                                  styles.chartOpacity,
                                  {
                                    backgroundColor: item.coloR_OPACITY,
                                  },
                                ]}
                              />
                              <View
                                style={[
                                  styles.chartValue,
                                  {
                                    width: item.phaN_TRAM + '%',
                                    backgroundColor: item.color,
                                  },
                                ]}
                              />
                            </View>
                            <Text style={[Theme.fontBold, styles.valueLechDD]}>
                              {item.value}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <Text>Không có dữ liệu</Text>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      ) : (
        <ContentLoaderComponent />
      )}
    </View>
  );
};

export default memo(MonitorRealTime);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: Colors.backgroundColor,
  },
  bodyContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 10,
  },
  scroolViewContent: {
    flex: 1,
    marginBottom: 20,
  },
  machineName: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemText: {
    fontSize: Theme.fontSize,
    marginBottom: 7,
    fontWeight: 'bold',
  },
  item: {
    width: WIDTH_SCREEN / 2 - 7, // Đảm bảo rằng mỗi item chiếm 1/2 chiều rộng màn hình
    marginVertical: 6,
    flexShrink: 2,
  },
  titleCongSuat: {
    marginBottom: 6,
    alignItems: 'center',
    width: '80%',
  },
  circleItem: {
    alignItems: 'center',
  },
  electricContainer: {
    flex: 1,
    marginBottom: 20,
  },
  titleElectricContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  titleElectric: {
    flex: 1,
    alignItems: 'center',
  },
  electricBody: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chartOpacity: {
    width: '100%',
    height: HEIGHT_CHART,
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  chartValue: {
    height: HEIGHT_CHART,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  stacChartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textElectric: {marginLeft: 7},
  chart: {
    flex: 1,
    marginLeft: 5,
  },
  chartContainer: {
    flex: 1,
  },
  chartView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueLechDD: {marginLeft: 10, width: '20%'},
  titileLechDD: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
