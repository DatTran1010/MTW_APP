import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  cloneElement,
  useCallback,
  useMemo,
  useRef,
  Children,
  useState,
} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import {HEIGHT_SCREEN} from '../Common/Dimentions';
import {useDispatch, useSelector} from 'react-redux';
import {setHideBottomSheetOption} from '../Redux/AppSlice';

interface TextProps {}

interface OptionComponentProps extends BottomSheetProps {
  label: string;
  children: any;
  index?: number;
  heightPercent?: number;
  styleLabel?: TextProps;
}
const OptionComponent: React.FC<OptionComponentProps> = ({
  label,
  children,
  index = 2,
  heightPercent = HEIGHT_SCREEN <= 700 ? 70 : 50,
  styleLabel,
  ...props
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bottomSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(
    () => ['5%', '25%', heightPercent + '%'],
    [heightPercent],
  );

  const HeaderBottomSheet = useCallback(() => {
    return <View />;
  }, []);

  //handle

  // callbacks
  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        setShowBottomSheet(false);
      }, 100);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShowBottomSheet(true);
        }}>
        <Text style={styleLabel}>{label}</Text>
      </TouchableOpacity>
      <Modal visible={showBottomSheet} transparent>
        <View style={{flex: 1}}>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <BottomSheet
                style={{
                  margin: 10,
                }}
                backgroundStyle={{
                  backgroundColor: 'transparent',
                }}
                ref={bottomSheetRef}
                index={index}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backdropComponent={BottomSheetBackdrop}
                handleComponent={HeaderBottomSheet}
                enablePanDownToClose={false}
                onClose={() => {
                  // bottomSheetRef.current.snapToIndex(0);
                }}
                enableContentPanningGesture={
                  Platform.OS === 'android' ? false : true
                }
                {...props}>
                <View style={styles.container}>
                  {Children.map(children, child =>
                    cloneElement(child, {handleSheetChanges}),
                  )}
                </View>
              </BottomSheet>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </>
  );
};

export default OptionComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
