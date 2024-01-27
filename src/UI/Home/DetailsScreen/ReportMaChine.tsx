import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../../../Common/Colors';
import CalendarComponent from '../../../Components/CalendarComponent';
import {useTranslation} from 'react-i18next';
import {HEIGHT_TEXT_INPUT, WIDTH_SCREEN} from '../../../Common/Dimentions';
import TextInputComponent from '../../../Components/TextInputComponent';
import {useSelector} from 'react-redux';

interface ReportMaChineProps {
  navigation: any;
  MA_THIET_BI: string | number;
  ID_TB: number;
  startDate: string;
  endDate: string;
}

const ReportMaChine: React.FC<ReportMaChineProps> = ({
  navigation,
  MA_THIET_BI,
  ID_TB,
  startDate,
  endDate,
}) => {
  const {t} = useTranslation();

  const infoUser = useSelector(state => state.app.userInfo);

  const [dateToFrom, setDateToFrom] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  const [email, setEmail] = useState(infoUser.EMAIL);

  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <View style={styles.machineView}>
          <Text style={styles.machineName}>
            {t('thiet-bi')} : {MA_THIET_BI}
          </Text>
        </View>
        <View style={styles.fromtodate}>
          <CalendarComponent
            startDate={dateToFrom.startDate}
            endDate={dateToFrom.endDate}
            placeholder={t('from-to-date')}
          />
        </View>
        <View style={styles.email}>
          <TextInputComponent
            placeholder="Email"
            value={email}
            onChangeText={value => {
              setEmail(value);
            }}
          />
          <View style={styles.iconSend}>
            <FontAwesome name="send" size={25} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReportMaChine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 7,
  },
  ContentContainer: {
    flex: 1,
    marginTop: 10,
  },
  machineView: {
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 15,
  },
  machineName: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
  },
  iconSend: {
    position: 'absolute',
    right: 10,
    top: HEIGHT_TEXT_INPUT / 4,
  },
  fromtodate: {flex: 0.1},
  email: {flex: 0.1, flexDirection: 'row'},
});
