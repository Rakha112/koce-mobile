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
import {connect} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
const LogIn = ({setAccessToken, setRefreshToken}) => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  // State
  const [noHpInput, setNoHpInput] = useState(false);
  const [noHpValue, setNoHpValue] = useState('');
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
  const submitHandle = () => {
    const checkValid = noHpRef.current?.isValidNumber(noHpValue);
    //Jika username dan password tidak kosong
    if (noHpValue !== '') {
      // login ke server
      if (checkValid) {
        navigation.navigate('OTP');
      } else {
        Toast.show({
          type: 'warning',
          text1: 'Nomor HP tidak valid',
          visibilityTime: 2000,
        });
      }
    } else {
      Toast.show({
        type: 'warning',
        text1: 'Nomor HP tidak boleh kosong',
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
