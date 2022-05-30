import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const TransaksiPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>TransaksiPage</Text>
    </SafeAreaView>
  );
};

export default TransaksiPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
