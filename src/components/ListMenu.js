import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Menu from './Menu';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const ListMenu = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://server-koce.herokuapp.com/data').then(res => {
      console.log('HAHAHAHA');
      setData(res.data.data);
      EncryptedStorage.setItem(
        'data_menu',
        JSON.stringify({
          data: res.data.data,
        }),
      );
    });
  }, []);

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
                      onPressIn={() => setSelected(value.nama)}
                      onPress={() =>
                        navigation.navigate('Detail', {item: value})
                      }
                      onPressOut={() => setSelected('')}>
                      <Menu
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
