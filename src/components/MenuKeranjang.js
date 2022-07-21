/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import FormatNumber from './FormatNumber';
const MenuKeranjang = ({value}) => {
  return (
    <View style={styles.containerComp}>
      <View style={styles.imgaeContainer}>
        <Image
          source={{uri: value.Foto}}
          resizeMode={'contain'}
          style={{width: '100%', height: undefined, flex: 1}}
        />
      </View>
      <View
        style={{
          width: '100%',
          marginVertical: 10,
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.judul}>{value.Menu}</Text>
          {JSON.parse(value.Variasi).map((v, i) => {
            return (
              <Text style={styles.deskripsi} key={i}>
                {v}
              </Text>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FormatNumber value={value.HargaAsli} style={styles.harga} />
              <Text style={{fontFamily: 'Inter-Regular'}}>
                {' '}
                x {value.Jumlah}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MenuKeranjang;

const styles = StyleSheet.create({
  containerComp: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
  },
  imgaeContainer: {
    backgroundColor: '#FFA901',
    width: 100,
    aspectRatio: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  judul: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
  },
  deskripsi: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 14,
  },
  harga: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 16,
  },
});
