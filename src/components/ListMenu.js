import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Menu from './Menu';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const ListMenu = ({data}) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <ActivityIndicator size={'large'} />
      ) : (
        data.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.textTittle}>{item.NamaKategori}</Text>
              {JSON.parse(item.Menu) === null ? (
                <Text>KOSONG</Text>
              ) : (
                JSON.parse(item.Menu).map((value, i) => {
                  return (
                    <TouchableWithoutFeedback
                      key={i}
                      onPressIn={() => {
                        if (value.Status === 1) {
                          setSelected(value.Nama);
                        } else {
                          Toast.show({
                            type: 'warning',
                            text1: `${value.Nama} Stok Habis`,
                            visibilityTime: 2000,
                          });
                        }
                      }}
                      onPress={() => {
                        if (value.Status === 1) {
                          navigation.navigate('Detail', {item: value});
                        }
                      }}
                      onPressOut={() => {
                        if (value.Status === 1) {
                          setSelected('');
                        }
                      }}>
                      <Menu
                        status={value.Status}
                        judul={value.Nama}
                        foto={value.Foto}
                        deskripsi={value.Deskripsi}
                        harga={value.Harga}
                        now={value.Nama}
                        selected={selected}
                      />
                    </TouchableWithoutFeedback>
                  );
                })
              )}
            </View>
          );
        })
      )}
    </View>
  );
};

export default ListMenu;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  textTittle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
    // paddingLeft: 10,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'black',
  },
});
