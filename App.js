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
import OTPPage from './src/screen/OTPPage';
import auth from '@react-native-firebase/auth';
const App = () => {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const onAuthStateChanged = res => {
      setUser(res);
      if (res) {
        setLogin(true);
        setLoading(true);
      } else {
        setLogin(false);
        setLoading(true);
      }
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (loading) {
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
    OTPcode: '',
    confirm: null,
    namaRasa: [],
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
      case 'SET_NAMA_RASA':
        return {
          ...state,
          namaRasa: [...state.namaRasa, action.payload],
        };
      case 'REMOVE_NAMA_RASA':
        return {
          ...state,
          // remove namaRasa yang sesuai dengan action.payload
          namaRasa: state.namaRasa.filter(nama => nama !== action.payload),
        };
      case 'REMOVE_ALL_NAMA_RASA':
        return {
          ...state,
          namaRasa: [],
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
      case 'OTP':
        return {
          ...state,
          OTPcode: action.payload,
        };
      case 'CONFIRM':
        return {
          ...state,
          confirm: action.payload,
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
                <Stack.Screen name="SignUp" component={SignUpPage} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="OTP" component={OTPPage} />
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
