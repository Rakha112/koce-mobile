/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InternetErrorIcon from '../assets/svg/InternetErrorIcon.svg';
import Button from '../components/Button';
import {connect} from 'react-redux';
const NetworkErrorComp = ({setNetworkRefresh}) => {
  const {width} = useWindowDimensions();
  const buttonHandle = () => {
    setNetworkRefresh();
  };
  return (
    <SafeAreaView style={styles.container}>
      <InternetErrorIcon width={width * 0.3} height={width * 0.3} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 40,
        }}>
        <Text style={styles.text}>oops! Internet anda terputus.</Text>
        <Text style={styles.text}>
          Pastikan perangkat terhubung dengan internet
        </Text>
      </View>

      <Button text={'COBA LAGI'} submit={buttonHandle} />
    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    setNetworkRefresh: data =>
      dispatch({type: 'NETWORK_REFRESH', payload: data}),
  };
};
export default connect(null, mapDispatchToProps)(NetworkErrorComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
  },
});
