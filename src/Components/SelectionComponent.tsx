import {
  FlatList,
  FlatListProps,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import TextInputComponent from './TextInputComponent';
import Colors from '../Common/Colors';
import IconComponent from './IconComponent';
import LineComponent from './LineComponent';
import Theme from '../Common/Theme';
import { HEIGHT_TEXT_INPUT } from '../Common/Dimentions';

interface DataProps {
  id: number;
  name: string;
}

interface SelectionComponentProps extends FlatListProps<DataProps> {
  placeholder: string;
  onPressSelection?: (id: number) => void;
  data: [];
  isBarCode?: boolean;
}

const SelectionComponent: React.FC<SelectionComponentProps> = ({
  placeholder,
  onPressSelection,
  data,
  isBarCode = false,
  ...props
}) => {
  console.log('render -selection');

  const [isShow, setIsShow] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DataProps>({
    id: -1,
    name: '',
  });

  const flatListRef = useRef<FlatList>(null);

  const handleSelection = () => {
    setIsShow(!isShow);
  };

  const handleValueSelection = (id: number, name: string) => {
    setSelectedValue({
      id: id,
      name: name,
    });
    setIsShow(false);
    if (onPressSelection) {
      onPressSelection(id);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: selectedValue.id === -1 ? 0 : selectedValue.id - 1,
        animated: false,
      });
    }, 100);
  }, [isShow, selectedValue.id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={handleSelection}>
        <View
          style={[
            styles.buttonSearch,
            Theme.shadow,
            { height: HEIGHT_TEXT_INPUT },
          ]}>
          {selectedValue.name !== '' ? (
            <Text
              style={[
                styles.label,
                {
                  color: Colors.black,
                },
              ]}>
              {placeholder}
            </Text>
          ) : (
            <></>
          )}
          <Text
            style={[
              Theme.font,
              {
                color: selectedValue.name !== '' ? Colors.black : Colors.gray,
              },
            ]}>
            {selectedValue.name === '' ? placeholder : selectedValue.name}
          </Text>
          {!isBarCode ? (
            <IconComponent
              nameicon="chevron-down-outline"
              colorIcon={Colors.black}
              style={styles.iconDropDown}
            />
          ) : (
            <TouchableOpacity style={styles.barCodeView}>
              <Image
                source={require('..//../assets/barcode.png')}
                style={styles.barCodeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {isShow && (
        <Modal
          transparent={false}
          style={styles.safeView}
          animationType="slide">
          <SafeAreaView style={[styles.selectionContainer]}>
            <View style={styles.searchControl}>
              <View style={styles.iconBack}>
                <IconComponent
                  nameicon="chevron-back"
                  size={25}
                  colorIcon={Colors.black}
                  label="Back"
                  onPress={handleSelection}
                />
              </View>
              <View style={styles.textSearch}>
                <TextInputComponent placeholder={placeholder} />
              </View>
            </View>
            <LineComponent />
            <View style={styles.valueControl}>
              <FlatList
                {...props}
                ref={flatListRef}
                data={data}
                keyExtractor={item => item.id + ''}
                stickyHeaderHiddenOnScroll
                windowSize={10}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => handleValueSelection(item.id, item.name)}>
                      <View
                        key={item.id}
                        style={[
                          styles.list,
                          Theme.shadow,
                          {
                            backgroundColor:
                              selectedValue.id === item.id
                                ? Colors.primary
                                : Colors.white,
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              color:
                                selectedValue.id === item.id
                                  ? Colors.white
                                  : Colors.black,
                            },
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                // initialScrollIndex={selectedValue.id - 1}
                // getItemLayout={getItemLayout}
                onScrollToIndexFailed={({}) => {}}
              />
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
};

export default SelectionComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.backgroundColor,
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
  iconDropDown: {
    marginRight: 10,
  },
  barCodeView: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  barCodeIcon: {
    width: 40,
    height: 40,
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    margin: 10,
    marginTop: Platform.OS === 'android' ? 25 : 0,
  },
  buttonSearch: {
    borderWidth: 1,
    borderColor: Colors.border,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  labelPlaceholder: {
    color: Colors.gray,
  },
  safeView: {
    flex: 1,
  },
  searchControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  valueControl: {
    flex: 1,
  },
  iconBack: {
    flex: 0.1,
    marginRight: 10,
  },
  textSearch: {
    flex: 0.9,
  },
  list: {
    flex: 1,
    borderWidth: 1,
    height: HEIGHT_TEXT_INPUT,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 10,
    borderColor: Colors.border,
  },
});
