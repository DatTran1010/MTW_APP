import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../Common/Colors';
import {HEIGHT_SCREEN} from '../Common/Dimentions';
import Theme from '../Common/Theme';

interface DateTimeComponentProps {
  mode: string | undefined;
  format?: string;
  date?: string;
  placeholder?: string;
  onPressDate: (date: Date) => void;
}
const DateTimeComponent: React.FC<DateTimeComponentProps> = ({
  mode = 'date',
  format = 'DD/MM/YYYY',
  onPressDate,
  placeholder,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const renderLabel = () => {
    if (dateSelected.toString() !== '' || focus) {
      return (
        <Text style={[styles.label, focus && {color: Colors.primary}]}>
          {placeholder}
        </Text>
      );
    }
    return null;
  };

  const handleConfirmDate = (date: Date) => {
    onPressDate(date);
    setDateSelected(date);
    setFocus(false);
  };
  return (
    <>
      {renderLabel()}
      <TouchableOpacity
        style={[
          styles.container,
          {
            borderColor: focus ? Colors.primary : Colors.border,
          },
        ]}
        onPress={() => {
          setFocus(true);
        }}>
        <Text style={Theme.font} {...props}>
          {moment(dateSelected).format(
            format === undefined ? 'DD/MM/YYYY' : format,
          )}
        </Text>
        <View style={styles.iconCalendar}>
          <Ionicons name="calendar-outline" size={25} />
        </View>
      </TouchableOpacity>

      {focus && (
        <View style={styles.dateView}>
          <DateTimePickerModal
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            isVisible={focus}
            mode={mode}
            onConfirm={(Date: Date) => {
              handleConfirmDate(Date);
            }}
            onCancel={() => {
              setFocus(false);
            }}
            is24Hour={true}
            date={new Date(dateSelected)}
          />
        </View>
      )}
    </>
  );
};

export default DateTimeComponent;
const styles = StyleSheet.create({
  container: {
    height: HEIGHT_SCREEN / 18,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.backgroundColor,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateView: {
    flex: 1,
  },
  iconCalendar: {
    position: 'absolute',
    right: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.backgroundColor,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSize,
    fontFamily: Theme.fontFamily,
  },
});
