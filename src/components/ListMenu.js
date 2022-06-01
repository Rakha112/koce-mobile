import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Menu from './Menu';
import {useNavigation} from '@react-navigation/native';
const ListMenu = () => {
  const [selected, setSelected] = useState('');
  const navigation = useNavigation();
  const dataKategori = [
    {
      kategori: 'Chicken Only',
      data: [
        {
          nama: 'Suju',
          image: require('../assets/images/suju.png'),
          deskripsi:
            'Suju - Super Tujuh, Setengah Ekor Ayam Yang Dipotong Menjadi 7',
          harga: 38000,
        },
        {
          nama: 'Half - Half',
          image: require('../assets/images/halfHalf.png'),
          deskripsi: 'Satu Ekor Ayam Yang Dipotong Menjadi 14 Bagian',
          harga: 68000,
        },
        {
          nama: 'Whole Cut',
          image: require('../assets/images/wholeCut.png'),
          deskripsi: 'Satu Ekor Ayam Yang Dipotong Menjadi 14 Bagian',
          harga: 68000,
        },
      ],
    },
    {
      kategori: 'Paket Nasi',
      data: [
        {
          nama: 'Panas S',
          image: require('../assets/images/panasS.png'),
          deskripsi: 'Paket Nasi + 2 Chicken (Ukuran 1/14)',
          harga: 17000,
        },
        {
          nama: 'Panas M',
          image: require('../assets/images/panasM.png'),
          deskripsi: 'Paket Nasi + 3 Chicken (Ukuran 1/14)',
          harga: 23000,
        },
        {
          nama: 'Panas L',
          image: require('../assets/images/panasL.png'),
          deskripsi: 'Paket Nasi + 4 Chicken (Ukuran 1/14)',
          harga: 29000,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {dataKategori.map((item, index) => {
        return (
          <View key={index}>
            <Text style={styles.textTittle}>{item.kategori}</Text>
            {item.data.map((data, i) => {
              return (
                <TouchableWithoutFeedback
                  key={i}
                  onPressIn={() => setSelected(data.nama)}
                  onPress={() => navigation.navigate('Detail', {item: data})}
                  onPressOut={() => setSelected('')}>
                  <Menu
                    judul={data.nama}
                    image={data.image}
                    deskripsi={data.deskripsi}
                    harga={data.harga}
                    now={data.nama}
                    selected={selected}
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        );
      })}
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
