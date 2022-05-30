import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const FavoritPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FavoritPage</Text>
    </SafeAreaView>
  );
};

export default FavoritPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
