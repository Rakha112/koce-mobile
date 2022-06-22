/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import HomePage from '../screen/HomePage';
import FavoritPage from '../screen/FavoritPage';
import AkunPage from '../screen/AkunPage';
import HomeIcon from '../assets/svg/HomeIcon.svg';
import FavoritIcon from '../assets/svg/FavoriteIcon.svg';
import AkunIcon from '../assets/svg/AkunIcon.svg';
import NotaIcon from '../assets/svg/NotaIcon.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialTopTabsNavigator from './MaterialTopTabsNavigator';

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
        name="Favorit"
        component={FavoritPage}
        options={{
          tabBarIcon: ({focused}) => (
            <FavoritIcon
              width={26}
              height={26}
              fill={focused ? '#FFA901' : 'white'}
              stroke={focused ? '#FFA901' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transaksi"
        component={MaterialTopTabsNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <NotaIcon
              width={26}
              height={26}
              fill={focused ? '#FFA901' : 'white'}
              stroke={focused ? '#FFA901' : 'black'}
            />
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
    paddingBottom: 10,
    height: 60,
  },
  hidden: {
    display: 'none',
    position: undefined,
  },
});
