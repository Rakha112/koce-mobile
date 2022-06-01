import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const DetailedMenu = ({route}) => {
  const {width} = useWindowDimensions();
  const [data] = useState(route.params.item);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.imageContainer, {width: width * 0.9}]}>
        <Image source={data.image} resizeMode={'center'} style={styles.image} />
      </View>
      <Text style={styles.text}>{data.nama}</Text>
    </SafeAreaView>
  );
};

export default DetailedMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    aspectRatio: 1,
    borderRadius: 20,
  },
  image: {flex: 1, width: '100%', height: undefined},
  text: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
  },
});
