import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TransaksiPage from '../screen/TransaksiPage';
import TransaksiSelesaiPage from '../screen/TransaksiSelesaiPage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const MaterialTopTabsNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingTop: insets.top, margin: 0},
        tabBarLabelStyle: {fontFamily: 'Inter-Regular', textTransform: 'none'},
        tabBarPressColor: 'white',
        tabBarIndicatorStyle: {backgroundColor: '#FFA901'},
        tabBarActiveTintColor: '#FFA901',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen name="Sekarang" component={TransaksiPage} />
      <Tab.Screen name="Selesai" component={TransaksiSelesaiPage} />
    </Tab.Navigator>
  );
};

export default MaterialTopTabsNavigator;
