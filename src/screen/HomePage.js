import {
  StyleSheet,
  ScrollView,
  Keyboard,
  RefreshControl,
  // SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from '../components/Carousel';
import ListMenu from '../components/ListMenu';
import axios from 'axios';
const HomePage = () => {
  axios.defaults.withCredentials = true;
  // eslint-disable-next-line no-unused-vars
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const handleRefresh = () => {
    axios.get('https://server-koce.herokuapp.com/data').then(res => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  };
  useEffect(() => {
    axios.get('https://server-koce.herokuapp.com/data').then(res => {
      setData(res.data.data);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <ScrollView
        onScrollBeginDrag={() => Keyboard.dismiss()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => handleRefresh()}
            refreshing={refreshing}
          />
        }>
        <Carousel />
        <ListMenu data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputSection: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA901',
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {marginLeft: 10, flex: 1, height: 40, justifyContent: 'center'},
  cartIcon: {
    flex: 1,
    padding: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
