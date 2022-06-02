/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import NumberFormat from 'react-number-format';
import FavoritBotton from './FavoritBotton';
const Menu = ({judul, image, now, selected, deskripsi, harga, maxRasa}) => {
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });

  useEffect(() => {
    if (now === selected) {
      scaleValue.value = withTiming(0.95, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    } else {
      scaleValue.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [now, scaleValue, selected]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={styles.imgaeContainer}>
        <Image
          source={image}
          resizeMode={'center'}
          style={{width: '100%', height: undefined, flex: 1}}
        />
      </View>
      <View
        style={{
          width: '100%',
          marginVertical: 10,
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.judul}>{judul}</Text>
          <Text style={styles.deskripsi}>{deskripsi}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <NumberFormat
              value={harga}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              renderText={(value, props) => (
                <Text style={styles.harga} {...props}>
                  {value}
                </Text>
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FavoritBotton />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
  },
  imgaeContainer: {
    backgroundColor: '#FFA901',
    width: 100,
    aspectRatio: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  judul: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
  },
  deskripsi: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 14,
  },
  harga: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 16,
  },
});
