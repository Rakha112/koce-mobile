import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import KeranjangPage from './src/screen/KeranjangPage';
import SearchPage from './src/screen/SearchPage';
import DetailedMenu from './src/screen/DetailedMenu';
const App = () => {
  const Stack = createStackNavigator();
  const initialState = {
    bottomSheet: false,
    rasa: 0,
    counter: 1,
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
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Home" component={BottomTabNavigation} />
            <Stack.Screen name="Keranjang" component={KeranjangPage} />
            <Stack.Screen name="Search" component={SearchPage} />
            <Stack.Screen name="Detail" component={DetailedMenu} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

// const styles = StyleSheet.create({});
