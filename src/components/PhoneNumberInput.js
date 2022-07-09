/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
const PhoneNumberInput = ({
  bottomSheetRef,
  flag,
  dialCode,
  setNoHP,
  onSubmit,
}) => {
  const {width} = useWindowDimensions();
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={[
        styles.phoneInputContainer,
        {
          width: (width * 90) / 100,
          borderColor: focus ? '#FFA901' : 'black',
        },
      ]}>
      <TouchableOpacity
        style={styles.phoneInputFlagStyle}
        onPress={() => {
          console.log('PRESS');
          bottomSheetRef.current.expand();
        }}>
        <Text style={styles.flag}>{flag}</Text>
        <Text style={styles.phoneInputTextContainer}>{dialCode}</Text>
      </TouchableOpacity>
      <TextInput
        autoFocus={true}
        style={styles.input}
        autoCapitalize="none"
        placeholder="Masukkan Nomor HP..."
        keyboardType="phone-pad"
        // set border aktif
        onFocus={() => {
          setFocus(true);
        }}
        // set border tidak aktif
        onBlur={() => {
          setFocus(false);
        }}
        // set value dari input ke state NamaValue
        onChangeText={value => setNoHP(dialCode + value)}
        // Ke input selanjutnya jika keyboard selesai
        onSubmitEditing={() => onSubmit}
        autoComplete="name"
        textContentType="name"
      />
    </View>
  );
};
const mapStateToProps = state => {
  return {
    flag: state.flag,
    dialCode: state.dialCode,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setNoHP: data => dispatch({type: 'NO_HP', payload: data}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberInput);

const styles = StyleSheet.create({
  phoneInputContainer: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingLeft: 5,
  },
  phoneInputTextContainer: {
    paddingHorizontal: 10,
    fontFamily: 'Inter-Bold',
  },
  phoneInputFlagStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flag: {fontSize: 20, paddingLeft: 20},
  input: {
    fontFamily: 'Inter-Regular',
  },
});
