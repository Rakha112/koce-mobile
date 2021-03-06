/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import OTP from '../components/OTP';
import {connect} from 'react-redux';
const OTPPage = ({confirm, OTPcode, nomorhp}) => {
  // const {data} = route.params;
  const {height} = useWindowDimensions();
  const submitHandle = async () => {
    try {
      await confirm.confirm(OTPcode);
      console.log('BERHASIL');
    } catch (error) {
      console.log('Invalid code.');
      console.log({error});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{height: height, alignItems: 'center'}}>
          <View style={{alignItems: 'center', marginTop: 40, marginBottom: 40}}>
            <Image
              source={require('../assets/images/koceLogo.png')}
              style={styles.image}
            />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'Inter-Bold',
              fontSize: 22,
              marginBottom: 10,
            }}>
            Verifikasi Nomor HP
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'Inter-regular',
              fontSize: 14,
            }}>
            Terkirim ke nomor {nomorhp}
          </Text>
          <OTP />
          <Button text={'SUBMIT'} submit={submitHandle} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    OTPcode: state.OTPcode,
  };
};
export default connect(mapStateToProps)(OTPPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    resizeMode: 'contain',
    width: 250,
    aspectRatio: 16 / 9,
    height: undefined,
  },
  box: {
    borderRadius: 10,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
  },
  boxOrange: {
    borderRadius: 10,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFA901',
    marginRight: 10,
  },
});
