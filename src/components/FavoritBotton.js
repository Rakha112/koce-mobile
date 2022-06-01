// import {StyleSheet} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FavoritIcon from '../assets/svg/FavoriteIcon.svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
const FavoritBotton = () => {
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });
  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        scaleValue.value = withTiming(0.9, {
          duration: 500,
          easing: Easing.out(Easing.exp),
        });
      }}
      onPress={() => console.log('PRESS')}
      onPressOut={() => {
        scaleValue.value = withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.exp),
        });
      }}>
      <Animated.View style={animatedStyles}>
        <FavoritIcon width={26} height={26} fill={'white'} stroke={'#FFA901'} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FavoritBotton;

// const styles = StyleSheet.create({});
