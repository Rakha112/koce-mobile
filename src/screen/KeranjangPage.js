import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const KeranjangPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>KeranjangPage</Text>
    </SafeAreaView>
  );
};

export default KeranjangPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
