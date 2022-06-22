import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const TransaksiSelesaiPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Belum ada transaksi...</Text>
    </SafeAreaView>
  );
};

export default TransaksiSelesaiPage;

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
