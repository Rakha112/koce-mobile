/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';

const CarouselComp = () => {
  const {width} = useWindowDimensions();
  const CARD_WIDTH = width * 0.85;
  const dataText = [
    {
      text: 'HALLO 1',
      imageLink: require('../assets/images/baner1.png'),
    },
    {
      text: 'HALLO 2',
      imageLink: require('../assets/images/baner2.png'),
    },
  ];

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal // Change the direction to horizontal
      pagingEnabled // Enable paging
      decelerationRate={0} // Disable deceleration
      snapToInterval={CARD_WIDTH + 10} // Calculate the size for a card including marginLeft and marginRight
      snapToAlignment="center" // Snap to the center
      contentContainerStyle={{
        // contentInset alternative for Android
        paddingHorizontal: 5, // Horizontal spacing before and after the ScrollView
        marginTop: 10,
      }}>
      {dataText.map((data, index) => {
        return (
          <View key={index} style={[styles.container, {width: CARD_WIDTH}]}>
            <Image
              source={data.imageLink}
              resizeMode={'contain'}
              style={{width: CARD_WIDTH}}
            />
            {/* <Text>{data.text}</Text> */}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CarouselComp;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA901',
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
});
