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
import EncryptedStorage from 'react-native-encrypted-storage';
import {connect} from 'react-redux';
const LogIn = ({setAccessToken, setRefreshToken}) => {
  const navigation = useNavigation();
  // State
  const {width, height} = useWindowDimensions();
  const [userInput, setUserInput] = useState(false);
  const [passInput, setPassInput] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [userValue, setUserValue] = useState('');
  const [passValue, setPassValue] = useState('');
  // Ref
  const userRef = useRef(null);
  const passwordRef = useRef(null);

  axios.defaults.withCredentials = true;

  // React.useEffect(() => {
  //   async function retrieveUserSession() {
  //     try {
  //       const session = await EncryptedStorage.getItem('user_session');

  //       if (session !== undefined) {
  //         // Congrats! You've just retrieved your first value!
  //         console.log(JSON.parse(session));
  //       }
  //     } catch (error) {
  //       // There was an error on the native side
  //       console.log(error);
  //     }
  //   }
  //   retrieveUserSession();
  // }, []);
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
  const submitHandle = () => {
    //Jika username dan password tidak kosong
    if (userValue !== '' && passValue !== '') {
      // login ke server
      axios
        .post('http://192.168.11.149:3001/login/mobile', {
          username: userValue,
          password: passValue,
        })
        .then(response => {
          // Jika sukses
          if (response.data.alert === 1) {
            const accessToken = response.headers.authorization.split(' ')[1];
            const refreshToken = response.headers.authorization.split(' ')[2];
            console.log({accessToken});
            console.log({refreshToken});
            // Set accessToken dan refreshToken ke redux
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            // store storage
            storeUserSession(
              // AccessToken
              accessToken,
              // RefreshToken
              refreshToken,
              true,
              userValue,
            );
            Toast.show({
              type: 'sukses',
              text1: response.data.pesan,
              visibilityTime: 2000,
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          } else if (response.data.alert === 2) {
            Toast.show({
              type: 'warning',
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
      // Jika username dan password kosong
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
                onSubmitEditing={() => submitHandle()}
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

const mapDispatchToProps = dispatch => {
  return {
    setAccessToken: data => dispatch({type: 'ACCESSTOKEN', payload: data}),
    setRefreshToken: data => dispatch({type: 'REFRESHTOKEN', payload: data}),
  };
};
export default connect(null, mapDispatchToProps)(LogIn);

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
