import {View, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const OverlayComponent = () => {
  const overLay = useSelector(state => state.app.overlay);

  return (
    overLay && (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <ActivityIndicator size="large" />
        </ScrollView>
      </View>
    )
  );
};

export default OverlayComponent;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
  },
});
