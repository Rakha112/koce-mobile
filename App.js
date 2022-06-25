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
import SplashScreen from 'react-native-splash-screen';
import {axiosAuth} from './src/services/axiosAuth';
import OTPPage from './src/screen/OTPPage';

const App = () => {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  // Get user LOGIN
  useEffect(() => {
    console.log('INIT');
    if (!loading) {
      console.log('HALOO');
      axiosAuth
        .get('http://192.168.11.149:3001/profile')
        .then(res => {
          console.log(1);
          console.log(res.data);
          if (res.data.loggedIn) {
            console.log(2);
            setLogin(true);
            setTimeout(() => {
              setLoading(true);
            }, 500);
          } else {
            console.log(3);
            setTimeout(() => {
              setLoading(true);
            }, 500);
            setLogin(false);
          }
        })
        .catch(() => {
          console.log(4);
          setLogin(false);
          setLoading(true);
          // EncryptedStorage.removeItem('user_session');
        });
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
            // initialRouteName={'OTP'}
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            {/* <Stack.Screen name="Home" component={BottomTabNavigation} />
            <Stack.Screen name="Keranjang" component={KeranjangPage} />
            <Stack.Screen name="Search" component={SearchPage} />
            <Stack.Screen name="Detail" component={DetailedMenu} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUpPage} /> */}

            {login ? (
              <>
                <Stack.Screen name="Home" component={BottomTabNavigation} />
                <Stack.Screen name="Keranjang" component={KeranjangPage} />
                <Stack.Screen name="Search" component={SearchPage} />
                <Stack.Screen name="Detail" component={DetailedMenu} />
              </>
            ) : (
              <>
                <Stack.Screen name="SignUp" component={SignUpPage} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="OTP" component={OTPPage} />
                <Stack.Screen name="Home" component={BottomTabNavigation} />
                <Stack.Screen name="Detail" component={DetailedMenu} />
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
