/* eslint-disable react-native/no-inline-styles */
import {Text, View, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import CheckBoxIcon from '../assets/svg/CheckBoxIcon.svg';
import CheckBoxIconAktif from '../assets/svg/CheckBoxIconAktif.svg';
const CheckBoxComp = ({
  nama,
  maxRasa,
  setJumlahRasa,
  rasa,
  setNamaRasa,
  removeNamaRasa,
  removeAllNamaRasa,
}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    return () => {
      setJumlahRasa(0);
      removeAllNamaRasa();
    };
  }, [removeAllNamaRasa, setJumlahRasa]);

  return (
    <View style={{marginBottom: Platform.OS === 'android' ? 0 : 10}}>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('LOHAA');
          if (toggleCheckBox) {
            setJumlahRasa(rasa - 1);
            removeNamaRasa(nama);
            setToggleCheckBox(false);
          } else {
            if (rasa < maxRasa) {
              setJumlahRasa(rasa + 1);
              setToggleCheckBox(true);
              setNamaRasa(nama);
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
    setNamaRasa: data => dispatch({type: 'SET_NAMA_RASA', payload: data}),
    removeNamaRasa: data => dispatch({type: 'REMOVE_NAMA_RASA', payload: data}),
    removeAllNamaRasa: () => dispatch({type: 'REMOVE_ALL_NAMA_RASA'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxComp);

// const styles = StyleSheet.create({});
