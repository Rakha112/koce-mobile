/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
export default function App() {
  const {width} = useWindowDimensions();
  const jumlahBox = 6;
  let inputRef = useRef(null);
  const [val, setVal] = useState('');
  const [focus, setFocus] = useState(false);
  const change = text => {
    setVal(text);
  };
  return (
    <View style={[styles.container, {width: width}]}>
      <View style={styles.boxContainer}>
        {Array(jumlahBox)
          .fill()
          .map((data, i) => (
            <TouchableWithoutFeedback
              style={[
                styles.box,

                {borderColor: focus && val.length === i ? 'orange' : 'black'},
              ]}
              onPress={() => inputRef.focus()}
              key={i}>
              <Text style={styles.text}>
                {val && val.length > 0 ? val[i] : ''}
              </Text>
            </TouchableWithoutFeedback>
          ))}
      </View>
      <TextInput
        ref={i => (inputRef = i)}
        style={styles.textInput}
        placeholder="Masukan Angka"
        maxLength={jumlahBox}
        keyboardType="numeric"
        returnKeyType="done"
        value={val}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={i => change(i)}
        autoFocus
        autoComplete={'sms-otp'}
        textContentType={'oneTimeCode'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  boxContainer: {
    width: '100%',
    alignItem: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  box: {
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
