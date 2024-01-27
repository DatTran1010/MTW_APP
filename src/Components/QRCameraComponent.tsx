import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {QRreader} from 'react-native-qr-decode-image-camera';

import {WIDTH_SCREEN, HEIGHT_SCREEN} from '../Common/Dimentions';
import Colors from '../Common/Colors';
import IconComponent from './IconComponent';
import ModalCamera from './ModalCameraComponent';

import {
  setNotiferWarning,
  setResultScanned,
  setShowCamera,
  setShowModalCamera,
} from '../Redux/AppSlice';

const QRCameraComponent = () => {
  const dispatch = useDispatch();

  const [showFlash, setShowFlash] = useState(false);
  const isShowCamera = useSelector(state => state.app.showCamera);

  const handleOpenFlash = () => {
    setShowFlash(!showFlash);
  };

  //#region  handle

  const handleChooseImageLib = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: 'Chỉnh sửa ảnh',
      cropperStatusBarColor: Colors.primarySecond,
    }).then(image => {
      // console.log(image);

      QRreader(image.path)
        .then(data => {
          dispatch(setShowModalCamera(true));
          dispatch(setResultScanned(data.trim()));
        })
        .catch(err => {
          console.log(err);
          dispatch(
            setNotiferWarning({
              showNotifer: true,
              label:
                'Mã QR không hợp lệ hoặc chất lượng hình ảnh không phù hợp quy chuẩn của hệ điều hành.',
              label2: 'Vui lòng kiểm tra lại.',
            }),
          );
        });
    });
  };

  const handleCloseCamera = () => {
    dispatch(setShowCamera(false));
  };

  const handleReadQRCode = e => {
    dispatch(setShowModalCamera(true));
    dispatch(setResultScanned(e.data.trim()));
  };

  const handleOpenModalURL = () => {
    dispatch(setShowModalCamera(true));
  };

  //#endregion
  const CameraFrame = () => {
    const rectWidth = 250;
    const rectHeight = 250;
    const rectX = (WIDTH_SCREEN - rectWidth) / 2;
    const rectY = (HEIGHT_SCREEN - rectHeight) / 2;
    const cornerLength = 30;
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />

            {/* #1 */}
            <Rect
              x={rectX}
              y={rectY}
              width={rectWidth}
              height={rectHeight}
              fill="black"
            />
          </Mask>
        </Defs>

        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#mask)"
        />

        {/* Các cạnh gần góc */}
        <Rect x={rectX} y={rectY} width={cornerLength} height="3" fill="#fff" />
        <Rect x={rectX} y={rectY} width="3" height={cornerLength} fill="#fff" />

        <Rect
          x={rectX + rectWidth - cornerLength}
          y={rectY}
          width={cornerLength}
          height="3"
          fill="#fff"
        />
        <Rect
          x={rectX + rectWidth - 2}
          y={rectY}
          width="3"
          height={cornerLength}
          fill="#fff"
        />

        <Rect
          x={rectX}
          y={rectHeight + rectY - 2}
          width={cornerLength}
          height="3"
          fill="#fff"
        />
        <Rect
          x={rectX}
          y={rectHeight + rectY - cornerLength}
          width="3"
          height={cornerLength}
          fill="#fff"
        />

        <Rect
          x={rectX + rectWidth - cornerLength}
          y={rectHeight + rectY - 2}
          width={cornerLength}
          height="3"
          fill="#fff"
        />
        <Rect
          x={rectX + rectWidth - 2}
          y={rectHeight + rectY - cornerLength}
          width="3"
          height={cornerLength}
          fill="#fff"
        />
      </Svg>
    );
  };

  //rederCamera
  const RenderCamera = () => {
    return (
      <>
        <SafeAreaView>
          <View>
            <QRCodeScanner
              onRead={handleReadQRCode}
              flashMode={
                showFlash
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              }
              reactivate={true}
              reactivateTimeout={1000}
              cameraStyle={{
                position: 'relative',
                width: WIDTH_SCREEN,
                height: HEIGHT_SCREEN,
              }}
              // showMarker={true}
              markerStyle={{
                borderWidth: 1,
              }}
              fadeIn={false}
            />

            <CameraFrame />

            <View style={styles.headerContent}>
              <View>
                <IconComponent
                  nameicon={'arrow-back-outline'}
                  border={false}
                  size={25}
                  colorIcon={Colors.white}
                  onPress={handleCloseCamera}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.white,
                    fontWeight: 'bold',
                  }}>
                  Quét mã QR
                </Text>
              </View>
              <View>
                <IconComponent
                  nameicon={'flash-outline'}
                  border={false}
                  size={25}
                  colorIcon={Colors.white}
                  onPress={handleOpenFlash}
                />
              </View>
            </View>
            <View style={styles.bodyContent}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.white,
                  fontWeight: '300',
                  textAlign: 'center',
                }}>
                Quét mã QR để chuyển hướng đến dữ liệu
              </Text>
            </View>
            <View style={styles.footerContent}>
              <TouchableOpacity onPress={handleChooseImageLib}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconComponent
                    nameicon={'images-outline'}
                    border={false}
                    colorIcon={Colors.white}
                    size={20}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.white,
                      fontWeight: '400',
                      textDecorationLine: 'underline',
                    }}>
                    Chọn ảnh trong máy
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenModalURL}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconComponent
                    nameicon={'link-outline'}
                    border={false}
                    colorIcon={Colors.white}
                    size={20}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.white,
                      fontWeight: '400',
                      textDecorationLine: 'underline',
                    }}>
                    Nhập bằng tay
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <ModalCamera />
      </>
    );
  };

  return isShowCamera && <RenderCamera />;
};

export default QRCameraComponent;
const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'space-between',
    position: 'absolute',
  },
  bodyContent: {
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  footerContent: {
    bottom: WIDTH_SCREEN / 2 - 50,
    right: 0,
    left: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
