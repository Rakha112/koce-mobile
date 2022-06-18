/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import SearchIcon from '../assets/svg/SearchIcon.svg';
import CartIcon from '../assets/svg/CartIcon.svg';
import {useNavigation} from '@react-navigation/native';
import Carousel from '../components/Carousel';
import ListMenu from '../components/ListMenu';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
const HomePage = () => {
  const navigation = useNavigation();
  // eslint-disable-next-line no-unused-vars
  const [refreshing, setRefreshing] = useState(false);

  const retrieveUserSession = async () => {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        // Congrats! You've just retrieved your first value!
        return session;
      }
    } catch (error) {
      // There was an error on the native side
      console.log(error);
    }
  };

  React.useEffect(() => {
    retrieveUserSession();
  }, []);

  const storeUserSession = async (accessToken, refreshToken, login) => {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          refreshToken: refreshToken,
          accessToken: accessToken,
          login: login,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = () => {
    retrieveUserSession().then(res => {
      axios
        .get('http://192.168.161.28:3001/profile', {
          headers: {
            Authorization: `Bearer ${JSON.parse(res).accessToken} ${
              JSON.parse(res).refreshToken
            }`,
          },
          params: {username: 'rakha'},
        })
        .then(response => {
          console.log(response.data);
          // jika header tidak undefined
          if (response.headers.authorization !== undefined) {
            // set storage untuk access token Baru
            storeUserSession(
              response.headers.authorization.split(' ')[1],
              JSON.parse(res).refreshToken,
              true,
            );
          }
        });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback
            style={[styles.inputSection]}
            onPress={() => navigation.navigate('Search')}>
            <SearchIcon
              width={16}
              height={16}
              fill={'#FFA901'}
              style={styles.searchIcon}
            />
            <View style={styles.input}>
              <Text style={{fontFamily: 'Inter-Regular'}}>Cari...</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Keranjang')}>
          <CartIcon width={28} height={28} stroke={'black'} />
        </TouchableWithoutFeedback>
      </View>
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
        <ListMenu />
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
