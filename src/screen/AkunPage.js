import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const AkunPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AkunPage</Text>
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
