import React, {useCallback, useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {dataCountry} from '../data/dataCountryPhoneNumber';
import {TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
const BottomSheetCountryPicker = () => {
  const [searchData, setSearchData] = useState(dataCountry);
  const [search, setSearch] = useState('');
  // ref
  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  // Search Handle
  useEffect(() => {
    const handleSearch = text => {
      // jika text in[ut tidak kosong]
      if (text !== '') {
        // membuat array kosong
        const array = [];
        // lakukan filter terhadap dataCountry
        dataCountry.filter(item => {
          // jika text input sama dengan nama countrt
          if (item.name.toLowerCase().match(text.toLowerCase())) {
            // masukan data country ke array
            array.push(item);
          }
        });
        // jika array tidak kosong
        if (array.length !== 0) {
          // set search data dengan array yang baru
          setSearchData(array);
        } else {
          // jika array kosong
          // ser search data kembali ke dataCountry
          setSearchData(dataCountry);
        }
      }
    };
    handleSearch(search);
  }, [search]);
  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          console.log('PRESS');
        }}>
        <Text style={styles.flag}>{item.emoji}</Text>
        <View style={styles.nameNumberContainer}>
          <Text style={styles.countryName}>{item.name}</Text>
          <Text style={styles.codeNumber}>{item.dial_code}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      enablePanDownToClose
      snapPoints={['90%', '90%']}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      <TextInput
        style={styles.searchStyle}
        placeholder="Cari Negara"
        onChangeText={e => {
          setSearch(e);
        }}
      />
      <BottomSheetFlatList
        data={searchData}
        // keyExtractor={i => i}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  searchStyle: {
    height: 40,
    marginHorizontal: 10,
    paddingLeft: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  itemContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  flag: {
    fontSize: 30,
    marginHorizontal: 20,
  },
  nameNumberContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryName: {
    fontFamily: 'Inter-SemiBold',
  },
  codeNumber: {
    marginRight: 20,
    fontFamily: 'Inter-SemiBold',
  },
});

export default BottomSheetCountryPicker;
