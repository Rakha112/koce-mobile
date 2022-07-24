import {StyleSheet} from 'react-native';
import React from 'react';
import DeleteIcon from '../assets/svg/DeleteIcon.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
const DeleteButton = ({
  noHP,
  menu,
  data,
  setRefreshKeranjang,
  refreshKeranjang,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        axios
          .delete('https://server-koce.herokuapp.com/keranjang/delete', {
            params: {
              noHP: noHP,
              menu: menu,
              variasi: data.Variasi,
            },
          })
          .then(res => {
            Toast.show({
              type: 'sukses',
              text1: `Berhasil menghapus ${menu} dari keranjang`,
              visibilityTime: 2000,
            });
            setRefreshKeranjang(!refreshKeranjang);
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
const mapStateToProps = state => {
  return {
    refreshKeranjang: state.refreshKeranjang,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setRefreshKeranjang: data =>
      dispatch({type: 'REFRESH_KERANJANG', payload: data}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);

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
