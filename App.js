import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import KeranjangPage from './src/screen/KeranjangPage';
import SearchPage from './src/screen/SearchPage';
import DetailedMenu from './src/screen/DetailedMenu';
import SignUpPage from './src/screen/SignUpPage';
import ToastComponent from './src/components/ToastComponent';
import LogIn from './src/screen/LogInPage';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  axios.defaults.withCredentials = true;
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const storeUserSession = async (
    accessToken,
    refreshToken,
    logedIn,
    username,
  ) => {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          refreshToken: refreshToken,
          accessToken: accessToken,
          login: logedIn,
          username: username,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(login);
    // EncryptedStorage.removeItem('user_session');
  }, [login]);

  // Get user LOGIN
  useEffect(() => {
    const retrieveUserSession = async () => {
      try {
        // ambil session dari storage
        const session = await EncryptedStorage.getItem('user_session');
        console.log(session);
        // jika ada session
        if (session !== undefined) {
          // Congrats! You've just retrieved your first value!
          console.log('Credentials successfully loaded for user ');
          // validasi accessToken
          axios
            .get('http://192.168.11.149:3001/accessToken', {
              headers: {
                Authorization: `Bearer ${JSON.parse(session).accessToken} ${
                  JSON.parse(session).refreshToken
                }`,
              },
              params: {username: JSON.parse(session).username},
            })
            .then(response => {
              console.log(response.data);
              // jika accessToken VALID
              if (response.data.valid) {
                setLogin(true);
                setLoading(true);
                // Jika user accessToken TIDAK VALID
              } else {
                // Validasi refreshToken
                axios
                  .get('http://192.168.11.149:3001/refreshToken', {
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(session).accessToken
                      } ${JSON.parse(session).refreshToken}`,
                    },
                    params: {username: JSON.parse(session).username},
                  })
                  .then(res => {
                    // jika refreshToken VALID
                    if (res.data.valid) {
                      setLogin(true);
                      setLoading(true);
                      // Buat accessToken BARU (newAccessToken)
                      axios
                        .get('http://192.168.11.149:3001/token', {
                          params: {username: JSON.parse(session).username},
                        })
                        .then(ress => {
                          console.log(ress.headers.authorization);
                          const newAccessToken =
                            ress.headers.authorization.split(' ')[1];
                          // simpan newAccessToken ke sessioin storage
                          storeUserSession(
                            newAccessToken,
                            JSON.parse(session).refreshToken,
                            ress.data.loggedIn,
                            JSON.parse(session).username,
                          );
                        });
                      // Jika refreshToken TIDAK VALID
                    } else {
                      setLogin(false);
                      setLoading(true);
                      //Hapus session storage
                      EncryptedStorage.removeItem('user_session');
                    }
                  });
              }
            });
          //Jika storage tidak ada
        } else {
          console.log('No credentials stored');
          setLogin(false);
          setLoading(true);
        }
      } catch (error) {
        // There was an error on the native side
        console.log('Storage tidak bisa diakses', error);
        setLogin(false);
        setLoading(true);
      }
    };
    if (!loading) {
      retrieveUserSession();
    } else {
      SplashScreen.hide();
    }
  }, [loading]);

  const initialState = {
    bottomSheet: false,
    login: false,
    rasa: 0,
    counter: 1,
    accessToken: '',
    refreshToken: '',
  };
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'BOTTOMSHEET':
        return {
          ...state,
          bottomSheet: action.payload,
        };
      case 'RASA':
        return {
          ...state,
          rasa: action.payload,
        };
      case 'COUNTER':
        return {
          ...state,
          counter: action.payload,
        };
      case 'ACCESSTOKEN':
        return {
          ...state,
          accessToken: action.payload,
        };
      case 'REFRESHTOKEN':
        return {
          ...state,
          refreshToken: action.payload,
        };
      default:
        return state;
    }
  };
  const store = configureStore({reducer: rootReducer});
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName="Detail"
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            {login ? (
              <>
                <Stack.Screen name="Home" component={BottomTabNavigation} />
                <Stack.Screen name="Keranjang" component={KeranjangPage} />
                <Stack.Screen name="Search" component={SearchPage} />
                <Stack.Screen name="Detail" component={DetailedMenu} />
              </>
            ) : (
              <>
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUpPage} />
                <Stack.Screen name="Home" component={BottomTabNavigation} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <ToastComponent />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

// const styles = StyleSheet.create({});
