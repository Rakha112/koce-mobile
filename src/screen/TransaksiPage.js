import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const TransaksiPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Belum ada transaksi...</Text>
    </SafeAreaView>
  );
};

export default TransaksiPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
  },
});
