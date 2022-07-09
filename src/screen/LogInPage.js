/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import OTPPage from './OTPPage';
import PhoneNumberInput from '../components/PhoneNumberInput';
import BottomSheetCountryPicker from '../components/BottomSheetCountryPicker';
import {connect} from 'react-redux';
const LogIn = ({noHP}) => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  // State
  const [confirm, setConfirm] = useState(null);
  // Ref
  const bottomSheetRef = useRef(null);
  axios.defaults.withCredentials = true;

  // function untuk store ke storage
  const storeUserSession = async (
    accessToken,
    refreshToken,
    login,
    username,
  ) => {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          refreshToken: refreshToken,
          accessToken: accessToken,
          login: login,
          username: username,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandle = async () => {
    //Jika username dan password tidak kosong
    console.log({noHP});
    if (noHP !== '') {
      // check ke database nomor HP terdaftar atau tidak
      axios
        .post('https://server-koce.herokuapp.com/login/mobile', {
          nomorhp: noHP,
        })
        .then(res => {
          // Jika nomor HP terdaftar
          if (res.data.alert === 1) {
            // Sign in dengan nomor HP ke firebase
            auth()
              .signInWithPhoneNumber(noHP)
              .then(response => {
                // Jika berhasil sign in
                if (response) {
                  setConfirm(response);
                  storeUserSession('a', 'b', 'c', 'd');
                }
              })
              // jika error
              .catch(err => {
                console.log(err);
              });
            // Jika nomor HP tidak terdaftar
          } else {
            Toast.show({
              type: 'gagal',
              text1: 'Nomor HP tidak terdaftar, Silahkan daftar',
              visibilityTime: 2000,
            });
          }
        })
        // jika server ke databse error
        .catch(err => {
          console.log(err);
        });
      // jika form nomor hp kosong
    } else {
      Toast.show({
        type: 'warning',
        text1: 'Nomor HP tidak boleh kosong',
        visibilityTime: 2000,
      });
    }
  };
  // Jika Sign in berhasil dan ke OTP PAGE
  if (confirm) {
    return <OTPPage confirm={confirm} nomorhp={noHP} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={
            Platform.OS === 'android'
              ? {
                  height: height,
                }
              : {flex: 1}
          }>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/koceLogo.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.form}>
            <View>
              <Text
                style={[styles.text, {alignSelf: 'baseline', marginLeft: 10}]}>
                Nomor HP
              </Text>
              <PhoneNumberInput
                bottomSheetRef={bottomSheetRef}
                onSubmit={submitHandle}
              />
            </View>
          </View>
          <View style={styles.bawah}>
            <Button text={'MASUK'} submit={submitHandle} />
            <Text style={styles.text}>
              Sudah punya akun ? silahkan{' '}
              <Text
                style={styles.span}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                Daftar
              </Text>{' '}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <BottomSheetCountryPicker ref={bottomSheetRef} />
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    noHP: state.noHP,
  };
};
export default connect(mapStateToProps)(LogIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 250,
    aspectRatio: 16 / 9,
    height: undefined,
  },
  text: {
    fontFamily: 'Inter-Regular',
    color: 'black',
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 20,
  },
  span: {
    color: '#FFA901',
    fontFamily: 'Inter-SemiBold',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  bawah: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  form: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  phoneInputContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 0,
    paddingVertical: 0,
    height: 45,
  },
  phoneInputTextContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  phoneInputFlagStyle: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
