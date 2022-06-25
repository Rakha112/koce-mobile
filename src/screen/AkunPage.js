/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import EncryptedStorage from 'react-native-encrypted-storage';
import PhoneIcon from '../assets/svg/PhoneIcon.svg';
import EmailIcon from '../assets/svg/EmailIcon.svg';
import LocationIcon from '../assets/svg/LocationIcon.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
const AkunPage = () => {
  const keluarHandle = () => {
    EncryptedStorage.removeItem('user_session');
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const {height} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{height: height - 60}}>
          <View style={{marginTop: 20}}>
            <Text style={styles.textNama}>Halo, Rakha Wibowo</Text>
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <PhoneIcon width={40} height={40} />
              <Text style={styles.textNoHp}>+6281229284274</Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <EmailIcon width={40} height={40} />
              <Text style={styles.textEmail}>rakhawibowo1998@gmail.com</Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <LocationIcon width={40} height={40} />
              <Text style={styles.textEmail}>Alamat Pengiriman</Text>
            </View>
          </View>
          <View style={{marginTop: 'auto', marginBottom: 20}}>
            <Button text={'KELUAR'} submit={keluarHandle} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AkunPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textNama: {
    marginVertical: 20,
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
  },
  textNoHp: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'black',
  },
  textEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'black',
  },
});
