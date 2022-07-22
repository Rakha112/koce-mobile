/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EditIcon from '../assets/svg/EditIcon.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const EditButton = ({data}) => {
  const navigation = useNavigation();
  const handleEdit = () => {
    axios
      .get('https://server-koce.herokuapp.com/keranjang/spesifik', {
        params: {
          menu: data.Menu,
        },
      })
      .then(res => {
        console.log(res.data.data[0]);
        navigation.navigate('Detail', {item: res.data.data[0]});
      });
  };
  return (
    <TouchableWithoutFeedback
      containerStyle={styles.container}
      onPress={() => {
        handleEdit();
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          borderRadius: 14,
          borderWidth: 1,
        }}>
        <EditIcon width={18} height={18} style={{marginRight: 5}} />
        <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 14}}>Edit</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
