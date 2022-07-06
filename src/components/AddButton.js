/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
const AddButton = ({maxRasa, rasa, harga, namaRasa, namaMakanan, jumlah}) => {
  const {width} = useWindowDimensions();
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });
  // Jika rasa yang dipilih xama maksRasa (rasa yang dibutuhkan)
  if (rasa === maxRasa) {
    return (
      <Animated.View
        style={[styles.container, animatedStyles, {width: width * 0.9}]}>
        <TouchableWithoutFeedback
          style={[styles.button, {width: width * 0.9}]}
          onPressIn={() => {
            scaleValue.value = withTiming(0.9, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}
          onPress={() => {
            console.log({namaRasa});
            console.log({harga});
            console.log({namaMakanan});
            console.log({jumlah});
          }}
          onPressOut={() => {
            scaleValue.value = withTiming(1, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}>
          <Text style={styles.text}>Add</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
  // Jika rasa yang dipilih kurang maksRasa (rasa yang dibutuhkan)
  return (
    <View style={[styles.container, {width: width * 0.9}]}>
      <TouchableWithoutFeedback
        onPress={() => {
          Toast.show({
            type: 'warning',
            text1: 'Pilih rasa terlebih dahulu',
            visibilityTime: 2000,
          });
        }}
        style={[styles.button, {width: width * 0.9, backgroundColor: 'grey'}]}>
        <Text style={styles.text}>Add</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    rasa: state.rasa,
    namaRasa: state.namaRasa,
  };
};
export default connect(mapStateToProps)(AddButton);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
  },
  button: {
    height: 50,
    backgroundColor: '#FFA901',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
