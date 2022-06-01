/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import React, {useRef, useEffect} from 'react';
import SearchIcon from '../assets/svg/SearchIcon.svg';
import ArrowIcon from '../assets/svg/ArrowIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
const SearchPage = () => {
  const inputRef = useRef(null);
  const navigation = useNavigation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            Keyboard.dismiss();
            navigation.pop();
          }}>
          <ArrowIcon
            width={24}
            height={24}
            fill={'#FFA901'}
            style={styles.arrowIcon}
          />
        </TouchableWithoutFeedback>
        <View style={styles.inputSection}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('KLIK');
              inputRef.current.focus();
            }}>
            <SearchIcon
              width={16}
              height={16}
              fill={'#FFA901'}
              style={styles.searchIcon}
            />
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.input}
            placeholder="Cari..."
            ref={inputRef}
          />
        </View>
      </View>
      <ScrollView onScrollBeginDrag={() => Keyboard.dismiss()}>
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

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA901',
    flex: 1,
    marginRight: 20,
  },
  searchIcon: {
    marginLeft: 10,
  },
  arrowIcon: {marginHorizontal: 10},
  input: {marginLeft: 10, flex: 1, height: 40, fontFamily: 'Inter-Regular'},
});
