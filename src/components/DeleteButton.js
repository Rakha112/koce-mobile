import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DeleteIcon from '../assets/svg/DeleteIcon.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
const DeleteButton = ({noHP, menu}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        axios
          .delete('https://server-koce.herokuapp.com/keranjang/delete', {
            params: {
              noHP: noHP,
              menu: menu,
            },
          })
          .then(res => {
            Toast.show({
              type: 'sukses',
              text1: `Berhasil menghapus ${menu} dari keranjang`,
              visibilityTime: 2000,
            });
            navigation.goBack();
          })
          .catch(err => {
            console.log(err);
          });
      }}
      style={styles.container}>
      <DeleteIcon width={26} height={26} color={'red'} />
    </TouchableWithoutFeedback>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 14,
    borderColor: '#F83E3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
