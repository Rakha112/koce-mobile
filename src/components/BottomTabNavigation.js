/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Platform} from 'react-native';
import React from 'react';
import HomePage from '../screen/HomePage';
// import FavoritPage from '../screen/FavoritPage';
import AkunPage from '../screen/AkunPage';
import HomeIcon from '../assets/svg/HomeIcon.svg';
// import FavoritIcon from '../assets/svg/FavoriteIcon.svg';
import AkunIcon from '../assets/svg/AkunIcon.svg';
import NotaIcon from '../assets/svg/NotaIcon.svg';
import NotaIconAktif from '../assets/svg/NotaIconAktif.svg';
import KeranjangIcon from '../assets/svg/KeranjangIcon.svg';
import KeranjangIconAktif from '../assets/svg/KeranjangIconAktif.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialTopTabsNavigator from './MaterialTopTabsNavigator';
import KeranjangPage from '../screen/KeranjangPage';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarActiveTintColor: '#FFA901',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Regular',
        },
        tabBarButton: props => (
          <View style={{flex: 1}}>
            <TouchableWithoutFeedback
              containerStyle={{flex: 1}}
              activeOpacity={0.95}
              {...props}
            />
          </View>
        ),
      }}>
      <Tab.Screen
        name="Beranda"
        component={HomePage}
        listeners={() => ({
          tabPress: e => {
            console.log('BERANDA');
          },
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeIcon
              width={26}
              height={26}
              fill={focused ? '#FFA901' : 'white'}
              stroke={focused ? '#FFA901' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Keranjang"
        // component={FavoritPage}
        component={KeranjangPage}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <KeranjangIconAktif width={32} height={32} />
            ) : (
              <KeranjangIcon width={32} height={32} />
            ),
        }}
      />
      <Tab.Screen
        name="Transaksi"
        component={MaterialTopTabsNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <NotaIconAktif width={26} height={26} />
            ) : (
              <NotaIcon width={26} height={26} />
            ),
        }}
      />
      <Tab.Screen
        name="Akun"
        component={AkunPage}
        options={{
          tabBarIcon: ({focused}) => (
            <AkunIcon
              width={26}
              height={26}
              fill={focused ? '#FFA901' : 'white'}
              stroke={focused ? '#FFA901' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: Platform.OS === 'android' ? 5 : 25,
    height: Platform.OS === 'android' ? 60 : 80,
  },
  hidden: {
    display: 'none',
    position: undefined,
  },
});
