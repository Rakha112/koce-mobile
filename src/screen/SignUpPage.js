/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Button from '../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import VisibilityOn from '../assets/svg/visibilityOn.svg';
import VisibilityOff from '../assets/svg/visibilityOff.svg';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
const SignUpPage = () => {
  const navigation = useNavigation();
  // State
  const {width, height} = useWindowDimensions();
  const [userInput, setUserInput] = useState(false);
  const [passInput, setPassInput] = useState(false);
  const [ulangPassInput, setUlangPassInput] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [visibilityUlang, setVisibilityUlang] = useState(false);
  const [userValue, setUserValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [ulangPassValue, setUlangPassValue] = useState('');
  // Ref
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const ulangPasswordRef = useRef(null);
  axios.defaults.withCredentials = true;
  const submitHandle = () => {
    if (userValue !== '' && passValue !== '' && ulangPassValue !== '') {
      if (passValue === ulangPassValue) {
        axios
          .post('http://192.168.161.28:3001/signup', {
            username: userValue,
            password: passValue,
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
          text1: 'Password tidak sama',
          visibilityTime: 2000,
        });
      }
    } else {
      Toast.show({
        type: 'warning',
        text1: 'Username dan password tidak boleh kosong',
        visibilityTime: 2000,
      });
    }
  };
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
            <TextInput />
            <Text
              style={[styles.text, {alignSelf: 'baseline', marginLeft: 30}]}>
              USERNAME
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  width: (width * 90) / 100,
                  borderColor: userInput ? '#FFA901' : 'black',
                },
              ]}
              ref={userRef}
              autoCapitalize="none"
              placeholder="Masukkan Username..."
              // set border aktif
              onFocus={() => {
                setUserInput(true);
              }}
              // set border tidak aktif
              onBlur={() => {
                setUserInput(false);
              }}
              // set value dari input ke state userValue
              onChangeText={value => setUserValue(value)}
              // Ke input selanjutnya jika keyboard selesai
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Text
              style={[styles.text, {alignSelf: 'baseline', marginLeft: 30}]}>
              PASSWORD
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: (width * 90) / 100,
                    borderColor: passInput ? '#FFA901' : 'black',
                  },
                ]}
                ref={passwordRef}
                autoCapitalize="none"
                placeholder="Masukkan Password..."
                // set border aktif
                onFocus={() => {
                  setPassInput(true);
                }}
                // set border tidak aktif
                onBlur={() => {
                  setPassInput(false);
                }}
                // set pass value
                onChangeText={value => setPassValue(value)}
                // visibility password kalo visibility true
                secureTextEntry={visibility ? false : true}
                // Ke input selanjutnya jika keyboard selesai
                onSubmitEditing={() => ulangPasswordRef.current.focus()}
              />
              <TouchableWithoutFeedback
                containerStyle={{
                  position: 'absolute',
                  right: 10,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  setVisibility(!visibility);
                }}>
                {visibility ? (
                  // jika visibility on maka icon VisibilityOn
                  <VisibilityOn width={30} height={30} fill={'grey'} />
                ) : (
                  // jika visibility off maka icon VisibilityOff
                  <VisibilityOff width={30} height={30} fill={'grey'} />
                )}
              </TouchableWithoutFeedback>
            </View>
            <Text
              style={[styles.text, {alignSelf: 'baseline', marginLeft: 30}]}>
              ULANGI PASSWORD
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: (width * 90) / 100,
                    borderColor: ulangPassInput ? '#FFA901' : 'black',
                  },
                ]}
                ref={ulangPasswordRef}
                autoCapitalize="none"
                placeholder="Masukkan Password..."
                // set border aktif
                onFocus={() => {
                  setUlangPassInput(true);
                }}
                // set border tidak aktif
                onBlur={() => {
                  setUlangPassInput(false);
                }}
                // set pass value
                onChangeText={value => setUlangPassValue(value)}
                // visibility password kalo visibility true
                secureTextEntry={visibilityUlang ? false : true}
                // submit jika sudah selesai
                onSubmitEditing={() => submitHandle()}
              />
              <TouchableWithoutFeedback
                containerStyle={{
                  position: 'absolute',
                  right: 10,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  setVisibilityUlang(!visibilityUlang);
                }}>
                {visibilityUlang ? (
                  // jika visibility on maka icon VisibilityOn
                  <VisibilityOn width={30} height={30} fill={'grey'} />
                ) : (
                  // jika visibility off maka icon VisibilityOff
                  <VisibilityOff width={30} height={30} fill={'grey'} />
                )}
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.bawah}>
            <Button text={'DAFTAR'} submit={submitHandle} />
            <Text style={styles.text}>
              Sudah punya akun ? silahkan{' '}
              <Text
                style={styles.span}
                onPress={() => {
                  navigation.push('LogIn');
                }}>
                Masuk
              </Text>{' '}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;

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
    // marginTop: 200,
    marginBottom: 'auto',
    alignItems: 'center',
  },
});
