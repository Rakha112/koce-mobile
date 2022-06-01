import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
const AddButton = () => {
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
      <Animated.View style={[styles.container, animatedStyles]}>
        <Text style={styles.text}>Add</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderRadius: 20,
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFA901',
  },
  text: {
    color: '#FFA901',
    fontFamily: 'Inter-SemiBold',
  },
});
