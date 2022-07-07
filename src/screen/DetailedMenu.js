/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddButton from '../components/AddButton';
import ArrowIcon from '../assets/svg/ArrowIcon.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CheckBoxComp from '../components/CheckBoxComp';
import CounterComp from '../components/CounterComp';
import {connect} from 'react-redux';
import FormatNumber from '../components/FormatNumber';
const DetailedMenu = ({route, counter, setCounter}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [data] = useState(route.params.item);
  useEffect(() => {
    return () => {
      setCounter(1);
    };
  }, [setCounter]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.pop()}>
          <ArrowIcon
            width={24}
            height={24}
            fill={'#FFA901'}
            style={styles.arrowIcon}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.imageContainer, {width: width * 0.9}]}>
          <Image
            source={data.image}
            resizeMode={'center'}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.judulHarga}>
            <Text style={styles.textJudul}>{data.nama}</Text>
            <FormatNumber
              value={data.harga * counter}
              style={styles.textJudul}
            />
          </View>
          <Text style={styles.textDeskripsi}>{data.deskripsi}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.textDeskripsi,
                {fontFamily: 'Inter-Bold', fontSize: 20},
              ]}>
              Rasa
            </Text>
            <Text style={[styles.textDeskripsi, {marginHorizontal: 5}]}>
              Pilih {data.maxRasa}
            </Text>
          </View>
          <CheckBoxComp nama={'Korean Spicy'} maxRasa={data.maxRasa} />
          <CheckBoxComp nama={'Korean Spicy Nut'} maxRasa={data.maxRasa} />
          <CheckBoxComp nama={'Original'} maxRasa={data.maxRasa} />
          <CheckBoxComp nama={'Bulgogi'} maxRasa={data.maxRasa} />
          <CheckBoxComp nama={'SnowCheese'} maxRasa={data.maxRasa} />
        </View>
        <CounterComp />
      </ScrollView>
      <View style={styles.bawah}>
        <AddButton
          maxRasa={data.maxRasa}
          harga={data.harga * counter}
          namaMakanan={data.nama}
          jumlah={counter}
        />
      </View>
    </SafeAreaView>
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailedMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  contentContainer: {
    marginTop: 20,
  },
  imageContainer: {
    overflow: 'hidden',
    aspectRatio: 1,
    borderRadius: 20,
  },
  image: {flex: 1, width: '100%', height: undefined},
  judulHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textJudul: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 24,
  },
  textDeskripsi: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
  },
  bawah: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 0,
  },
});
