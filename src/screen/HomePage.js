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
import {useNavigation} from '@react-navigation/native';
import NetworkErrorComp from '../components/NetworkErrorComp';
import {connect} from 'react-redux';
const HomePage = ({networkRefresh, networkStatus}) => {
  axios.defaults.withCredentials = true;

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const handleRefresh = () => {
    setRefreshing(true);
    if (networkStatus) {
      axios
        .get('https://server-koce.herokuapp.com/data')
        .then(res => {
          setData(res.data.data);
          setRefreshing(false);
          console.log('HIHI');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    console.log('HOHO');
    if (networkStatus) {
      axios
        .get('https://server-koce.herokuapp.com/data')
        .then(res => {
          setData(res.data.data);
          console.log('HAHAHA');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [navigation, networkStatus, networkRefresh]);
  if (networkStatus) {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <ScrollView
          onScrollBeginDrag={() => Keyboard.dismiss()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={() => handleRefresh()}
              refreshing={refreshing}
              colors={'#FFA901'}
              tintColor={'#FFA901'}
            />
          }>
          <Carousel />
          <ListMenu data={data} />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <NetworkErrorComp />
      </SafeAreaView>
    );
  }
};
const mapStateToProps = state => {
  return {
    networkRefresh: state.networkRefresh,
    networkStatus: state.networkStatus,
  };
};
export default connect(mapStateToProps)(HomePage);

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
