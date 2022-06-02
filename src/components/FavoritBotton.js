import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FavoritIcon from '../assets/svg/FavoriteIcon.svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
const FavoritBotton = () => {
  const [favorit, setFavorit] = useState(false);
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
      onPress={() => {
        if (favorit) {
          setFavorit(false);
        } else {
          setFavorit(true);
        }
      }}
      onPressOut={() => {
        scaleValue.value = withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.exp),
        });
      }}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <FavoritIcon
          width={26}
          height={26}
          fill={favorit ? '#FFA901' : 'white'}
          stroke={favorit ? '#FFA901' : '#B2B1B9'}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FavoritBotton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
