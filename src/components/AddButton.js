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
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const AddButton = ({
  maxRasa,
  rasa,
  hargaTotal,
  hargaAsli,
  namaRasa,
  namaMakanan,
  jumlah,
  foto,
  noHP,
  text,
  before,
  setRefreshKeranjang,
  refreshKeranjang,
}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });

  const handleAddKeranjang = () => {
    axios
      .get('https://server-koce.herokuapp.com/keranjang/check', {
        params: {
          menu: namaMakanan,
          // foto: foto,
          noHP: noHP,
          // hargaAsli: hargaAsli,
          // hargaTotal: hargaTotal,
          // jumlah: jumlah,
          variasi: JSON.stringify(namaRasa),
        },
      })
      .then(res => {
        if (res.data.data[0].Exist === 0) {
          axios
            .post('https://server-koce.herokuapp.com/keranjang/tambah', {
              menu: namaMakanan,
              foto: foto,
              noHP: noHP,
              hargaAsli: hargaAsli,
              hargaTotal: hargaTotal,
              jumlah: jumlah,
              variasi: JSON.stringify(namaRasa),
            })
            .then(() => {
              Toast.show({
                type: 'sukses',
                text1: `${namaMakanan} ${namaRasa} berhasil ditambahkan`,
                visibilityTime: 2000,
              });
              setRefreshKeranjang(!refreshKeranjang);
              navigation.goBack();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          Toast.show({
            type: 'warning',
            text1: `${namaMakanan} ${namaRasa} sudah ada`,
            visibilityTime: 2000,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Jika rasa yang dipilih xama maksRasa (rasa yang dibutuhkan)
  if (rasa === maxRasa) {
    return (
      <Animated.View
        style={[
          styles.container,
          animatedStyles,
          {width: before === 'Home' ? width * 0.9 : width * 0.7},
        ]}>
        <TouchableWithoutFeedback
          style={[
            styles.button,
            {width: before === 'Home' ? width * 0.9 : width * 0.7},
          ]}
          onPressIn={() => {
            scaleValue.value = withTiming(0.9, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}
          onPress={() => {
            handleAddKeranjang();
          }}
          onPressOut={() => {
            scaleValue.value = withTiming(1, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}>
          <Text style={styles.text}>{text}</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
  // Jika rasa yang dipilih kurang maksRasa (rasa yang dibutuhkan)
  return (
    <View
      style={[
        styles.container,
        {width: before === 'Home' ? width * 0.9 : width * 0.7},
      ]}>
      <TouchableWithoutFeedback
        onPress={() => {
          Toast.show({
            type: 'warning',
            text1: 'Pilih rasa terlebih dahulu',
            visibilityTime: 2000,
          });
        }}
        style={[
          styles.button,
          {
            width: before === 'Home' ? width * 0.9 : width * 0.7,
            backgroundColor: 'grey',
          },
        ]}>
        <Text style={styles.text}>{text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    rasa: state.rasa,
    namaRasa: state.namaRasa,
    refreshKeranjang: state.refreshKeranjang,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setRefreshKeranjang: data =>
      dispatch({type: 'REFRESH_KERANJANG', payload: data}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddButton);

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
    borderRadius: 14,
  },
});
