/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useWindowDimensions,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import PhoneNumberInput from '../components/PhoneNumberInput';
import BottomSheetCountryPicker from '../components/BottomSheetCountryPicker';
import {connect} from 'react-redux';
const SignUpPage = ({noHP}) => {
  const navigation = useNavigation();
  // State
  const {width, height} = useWindowDimensions();
  const [namaInput, setNamaInput] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [namaValue, setNamaValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  // Ref
  const namaRef = useRef(null);
  const emailRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmailValidate(false);
      setEmailValue(text);
      return false;
    } else {
      setEmailValidate(true);
      setEmailValue(text);
    }
  };
  axios.defaults.withCredentials = true;
  const onSubmitHandlePhone = () => {
    namaRef.current.focus();
  };
  const submitHandle = () => {
    if (namaValue !== '' && emailValue !== '' && noHP !== '') {
      if (emailValidate) {
        axios
          .post('https://server-koce.herokuapp.com/signup', {
            nohp: noHP,
            email: emailValue,
            nama: namaValue,
          })
          .then(response => {
            if (response.data.alert === 1) {
              Toast.show({
                type: 'sukses',
                text1: response.data.pesan,
                visibilityTime: 2000,
              });
              // navigation.replace('Login');
            } else if (response.data.alert === 2) {
              Toast.show({
                type: 'gagal',
                text1: response.data.pesan,
                visibilityTime: 2000,
              });
            } else {
              Toast.show({
                type: 'gagal',
                text1: response.data.pesan,
                visibilityTime: 2000,
              });
            }
          });
      } else {
        Toast.show({
          type: 'warning',
          text1: 'Email salah, Harap periksa kembali',
          visibilityTime: 2000,
        });
      }
    } else {
      Toast.show({
        type: 'warning',
        text1: 'Form tidak boleh kosong',
        visibilityTime: 2000,
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
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
            {/* Nomor HP input field */}
            <View>
              <Text
                style={[styles.text, {alignSelf: 'baseline', marginLeft: 10}]}>
                Nomor HP
              </Text>
              <PhoneNumberInput
                bottomSheetRef={bottomSheetRef}
                onSubmit={onSubmitHandlePhone}
              />
            </View>
            {/* Nama input field */}
            <View>
              <Text
                style={[styles.text, {alignSelf: 'baseline', marginLeft: 10}]}>
                Nama
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: (width * 90) / 100,
                    borderColor: namaInput ? '#FFA901' : 'black',
                  },
                ]}
                ref={namaRef}
                autoCapitalize="none"
                placeholder="Masukkan Nama Anda..."
                // set border aktif
                onFocus={() => {
                  setNamaInput(true);
                }}
                // set border tidak aktif
                onBlur={() => {
                  setNamaInput(false);
                }}
                // set value dari input ke state NamaValue
                onChangeText={value => setNamaValue(value)}
                // Ke input selanjutnya jika keyboard selesai
                onSubmitEditing={() => emailRef.current.focus()}
                autoComplete="name"
                textContentType="name"
              />
            </View>
            {/* Email input field */}
            <View>
              <Text
                style={[styles.text, {alignSelf: 'baseline', marginLeft: 10}]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: (width * 90) / 100,
                    borderColor: emailInput
                      ? emailValidate
                        ? '#FFA901'
                        : 'red'
                      : 'black',
                  },
                ]}
                ref={emailRef}
                autoCapitalize="none"
                placeholder="Masukkan Email Anda..."
                keyboardType="email-address"
                // set border aktif
                onFocus={() => {
                  setEmailInput(true);
                }}
                // set border tidak aktif
                onBlur={() => {
                  setEmailInput(false);
                }}
                // set value dari input ke state EmailValue
                onChangeText={value => validate(value)}
                // Ke input selanjutnya jika keyboard selesai
                onSubmitEditing={() => submitHandle()}
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>
          </View>
          <View style={styles.bawah}>
            <Button text={'DAFTAR'} submit={submitHandle} />
            <Text style={styles.text}>
              Sudah punya akun ? silahkan{' '}
              <Text
                style={styles.span}
                onPress={() => {
                  navigation.navigate('LogIn');
                }}>
                Masuk
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
export default connect(mapStateToProps)(SignUpPage);

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
    paddingVertical: 0,
    height: 45,
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
    // backgroundColor: 'pink',
  },
  form: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'orange',
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
