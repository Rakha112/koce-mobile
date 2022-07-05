/* eslint-disable react-native/no-inline-styles */
import {Text, View, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import CheckBoxIcon from '../assets/svg/CheckBoxIcon.svg';
import CheckBoxIconAktif from '../assets/svg/CheckBoxIconAktif.svg';
const CheckBoxComp = ({nama, maxRasa, setJumlahRasa, rasa}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    return () => {
      setJumlahRasa(0);
    };
  }, [setJumlahRasa]);

  return (
    <View style={{marginBottom: Platform.OS === 'android' ? 0 : 10}}>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('LOHAA');
          if (toggleCheckBox) {
            console.log('HALOOO');
            setJumlahRasa(rasa - 1);
            setToggleCheckBox(false);
          } else {
            if (rasa < maxRasa) {
              console.log({rasa});
              console.log({maxRasa});
              setJumlahRasa(rasa + 1);
              setToggleCheckBox(true);
            }
          }
        }}
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              color: 'black',
              fontSize: 16,
            }}>
            {nama}
          </Text>
        </View>
        {toggleCheckBox ? <CheckBoxIconAktif /> : <CheckBoxIcon />}
      </TouchableWithoutFeedback>
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
