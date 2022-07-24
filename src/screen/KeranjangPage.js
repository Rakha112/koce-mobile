/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {connect} from 'react-redux';
import KeranjangIconAktif from '../assets/svg/KeranjangIconAktif';
import MenuKeranjang from '../components/MenuKeranjang';
const KeranjangPage = ({noHP, refreshKeranjang}) => {
  const {width} = useWindowDimensions();
  const [dataKeranjang, setDataKeranjang] = useState();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    axios
      .get('https://server-koce.herokuapp.com/keranjang/', {
        params: {
          noHP: noHP,
        },
      })
      .then(res => {
        setDataKeranjang(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [noHP, refreshKeranjang]);
  const handleRefresh = () => {
    setRefreshing(true);
    axios
      .get('https://server-koce.herokuapp.com/keranjang/', {
        params: {
          noHP: noHP,
        },
      })
      .then(res => {
        setDataKeranjang(res.data.data);
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            onRefresh={() => handleRefresh()}
            refreshing={refreshing}
            colors={['#FFA901']}
            tintColor={'#FFA901'}
          />
        }>
        {dataKeranjang === undefined ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={'#FFA901'} />
          </View>
        ) : dataKeranjang.length > 0 ? (
          dataKeranjang.map((value, index) => {
            return <MenuKeranjang value={value} key={index} />;
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <KeranjangIconAktif width={width * 0.4} height={width * 0.4} />
            <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 16}}>
              Keranjang masih kosong
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    noHP: state.noHP,
    refreshKeranjang: state.refreshKeranjang,
  };
};
export default connect(mapStateToProps)(KeranjangPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
