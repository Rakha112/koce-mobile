/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, ScrollView, Keyboard} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import SearchIcon from '../assets/svg/SearchIcon.svg';
import CartIcon from '../assets/svg/CartIcon.svg';
import {useNavigation} from '@react-navigation/native';
import Carousel from '../components/Carousel';
const HomePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback
            style={[styles.inputSection]}
            onPress={() => navigation.navigate('Search')}>
            <SearchIcon
              width={16}
              height={16}
              fill={'#FFA901'}
              style={styles.searchIcon}
            />
            <View style={styles.input}>
              <Text style={{fontFamily: 'Inter-Regular'}}>Cari...</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Keranjang')}>
          <CartIcon width={26} height={26} fill={'black'} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView onScrollBeginDrag={() => Keyboard.dismiss()}>
        <Carousel />
        <Text style={{height: 100}}>HALOO</Text>
        <Text style={{height: 100}}>HALOO</Text>
        <Text style={{height: 100}}>HALOO</Text>
        <Text style={{height: 100}}>HALOO</Text>
        <Text style={{height: 100}}>HALOO</Text>
        <Text style={{height: 100}}>HALOO</Text>
        <Text style={{height: 100}}>HALOO</Text>
        <Text style={{height: 100}}>HALOO END</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputSection: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA901',
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {marginLeft: 10, flex: 1, height: 40, justifyContent: 'center'},
  cartIcon: {
    flex: 1,
    padding: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
