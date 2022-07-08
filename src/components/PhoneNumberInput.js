import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
const PhoneNumberInput = () => {
  const {width} = useWindowDimensions();
  return (
    <View
      style={[
        styles.phoneInputContainer,
        {
          width: (width * 90) / 100,
        },
      ]}>
      <TouchableOpacity
        style={styles.phoneInputFlagStyle}
        onPress={() => {
          console.log('PRESS');
        }}>
        <Text style={styles.flag}>🇮🇩</Text>
      </TouchableOpacity>
      <Text style={styles.phoneInputTextContainer}>+62</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Masukkan Nomor HP..."
        keyboardType="numeric"
        // set border aktif
        onFocus={() => {
          // setNamaInput(true);
        }}
        // set border tidak aktif
        onBlur={() => {
          // setNamaInput(false);
        }}
        // set value dari input ke state NamaValue
        // onChangeText={value => setNamaValue(value)}
        // Ke input selanjutnya jika keyboard selesai
        // onSubmitEditing={() => emailRef.current.focus()}
        autoComplete="name"
        textContentType="name"
      />
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  phoneInputContainer: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  phoneInputTextContainer: {
    paddingRight: 10,
    fontFamily: 'Inter-Bold',
  },
  phoneInputFlagStyle: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {fontSize: 20},
  input: {
    fontFamily: 'Inter-Regular',
  },
});
