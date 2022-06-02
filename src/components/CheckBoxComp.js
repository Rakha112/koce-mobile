/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
const CheckBoxComp = ({nama, maxRasa, setJumlahRasa, rasa}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    return () => {
      setJumlahRasa(0);
    };
  }, [setJumlahRasa]);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (toggleCheckBox) {
                setJumlahRasa(rasa - 1);
                setToggleCheckBox(false);
              } else {
                if (rasa < maxRasa) {
                  setJumlahRasa(rasa + 1);
                  setToggleCheckBox(true);
                }
              }
            }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                color: 'black',
                fontSize: 16,
              }}>
              {nama}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <CheckBox
          tintColors={{true: '#FFA901'}}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={() => {
            if (toggleCheckBox) {
              setJumlahRasa(rasa - 1);
              setToggleCheckBox(false);
            } else {
              if (rasa < maxRasa) {
                setJumlahRasa(rasa + 1);
                setToggleCheckBox(true);
              }
            }
          }}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    rasa: state.rasa,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setJumlahRasa: data => dispatch({type: 'RASA', payload: data}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxComp);

// const styles = StyleSheet.create({});
