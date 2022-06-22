import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import EncryptedStorage from 'react-native-encrypted-storage';
const AkunPage = () => {
  const keluarHandle = () => {
    EncryptedStorage.removeItem('user_session');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button text={'KELUAR'} submit={keluarHandle} />
    </SafeAreaView>
  );
};

export default AkunPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
