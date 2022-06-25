/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, useWindowDimensions, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import OTPPage from './OTPPage';
const LogIn = () => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  // State
  const [noHpInput, setNoHpInput] = useState(false);
  const [noHpValue, setNoHpValue] = useState('');
  const [confirm, setConfirm] = useState(null);
  // Ref
  const noHpRef = useRef(null);
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
    const checkValid = noHpRef.current.isValidNumber(noHpValue);
    //Jika username dan password tidak kosong
    if (noHpValue !== '') {
      // check apakah nomor HP valid
      if (checkValid) {
        // check ke database nomor HP terdaftar atau tidak
        axios
          .post('https://server-koce.herokuapp.com/login/mobile', {
            nomorhp: noHpValue,
          })
          .then(res => {
            // Jika nomor HP terdaftar
            if (res.data.alert === 1) {
              // Sign in dengan nomor HP ke firebase
              auth()
                .signInWithPhoneNumber(noHpValue)
                .then(response => {
                  // Jika berhasil sign in
                  if (response) {
                    setConfirm(response);
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
        // jika nomor HP tidak Valid
      } else {
        Toast.show({
          type: 'warning',
          text1: 'Nomor HP tidak valid',
          visibilityTime: 2000,
        });
      }
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
    return <OTPPage confirm={confirm} nomorhp={noHpValue} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{height: height}}>
          <View style={{alignItems: 'center', marginTop: 'auto'}}>
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
              <PhoneInput
                ref={noHpRef}
                // autoFocus={true}
                // Container Style
                containerStyle={[
                  styles.phoneInputContainer,
                  {width: (width * 90) / 100},
                ]}
                // Text Container Style
                textContainerStyle={[
                  styles.phoneInputTextContainer,
                  {borderColor: noHpInput ? '#FFA901' : 'black'},
                ]}
                // flag style
                flagButtonStyle={[
                  styles.phoneInputFlagStyle,
                  {borderColor: noHpInput ? '#FFA901' : 'black'},
                ]}
                // +62 style
                codeTextStyle={{marginHorizontal: 10}}
                // Text input props seperti onFocus, onBlur
                textInputProps={{
                  onFocus: () => {
                    setNoHpInput(true);
                  },
                  onBlur: () => {
                    setNoHpInput(false);
                  },
                  onSubmitEditing: () => submitHandle(),
                }}
                defaultCode="ID"
                layout="first"
                onChangeFormattedText={text => {
                  setNoHpValue(text);
                }}
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
    </SafeAreaView>
  );
};

export default LogIn;

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
  bawah: {
    marginTop: 'auto',
    marginBottom: 30,
    alignItems: 'center',
  },
  form: {
    marginTop: 40,
    marginBottom: 'auto',
    alignItems: 'center',
  },
  phoneInputContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 0,
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
