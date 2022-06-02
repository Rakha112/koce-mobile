import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import PlusIcon from '../assets/svg/PlusIcon.svg';
import MinIcon from '../assets/svg/MinIcon.svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {connect} from 'react-redux';
const CounterComp = ({counter, setCounter}) => {
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });
  const scaleValue2 = useSharedValue(1);
  const animatedStyles2 = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue2.value}]};
  });
  return (
    <View style={styles.container}>
      <Animated.View style={(styles.container, animatedStyles)}>
        <TouchableWithoutFeedback
          onPressIn={() => {
            scaleValue.value = withTiming(0.9, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}
          onPress={() => setCounter(counter + 1)}
          onPressOut={() => {
            scaleValue.value = withTiming(1, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}>
          <PlusIcon width={36} height={36} />
        </TouchableWithoutFeedback>
      </Animated.View>
      <Text style={styles.text}>{counter}</Text>
      <Animated.View style={(styles.container, animatedStyles2)}>
        <TouchableWithoutFeedback
          onPressIn={() => {
            scaleValue2.value = withTiming(0.9, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}
          onPress={() => {
            if (counter > 1) {
              setCounter(counter - 1);
            }
          }}
          onPressOut={() => {
            scaleValue2.value = withTiming(1, {
              duration: 500,
              easing: Easing.out(Easing.exp),
            });
          }}>
          <MinIcon width={36} height={36} />
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    counter: state.counter,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCounter: data => dispatch({type: 'COUNTER', payload: data}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CounterComp);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    marginHorizontal: 20,
  },
});
