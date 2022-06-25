import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FavoritIcon from '../assets/svg/FavoriteIcon.svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import axios from 'axios';
const FavoritBotton = ({judul, deskripsi, harga}) => {
  axios.defaults.withCredentials = true;
  const [favorit, setFavorit] = useState(false);
  const [load, setLoad] = useState(false);
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });

  useEffect(() => {
    if (!load) {
      axios
        .get('https://server-koce.herokuapp.com/favorit/get', {
          params: {
            makanan: judul,
          },
        })
        .then(res => {
          if (res.data.status === 1) {
            setLoad(true);
            setFavorit(true);
          }
        })
        .catch(err => {
          if (err.response.data.status === 2) {
            setLoad(true);
            setFavorit(false);
          }
        });
    }
  }, [judul, load]);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        scaleValue.value = withTiming(0.9, {
          duration: 500,
          easing: Easing.out(Easing.exp),
        });
      }}
      onPress={() => {
        if (favorit) {
          console.log(1);
          axios
            .delete('https://server-koce.herokuapp.com/favorit/delete', {
              data: {
                makanan: judul,
              },
            })
            .then(res => {
              console.log(2);
              console.log(res.data);
              setFavorit(false);
            })
            .catch(err => {
              console.log(3);
              console.log(err.response.data);
            });
        } else {
          axios
            .post('https://server-koce.herokuapp.com/favorit', {
              nomor_hp: '+62811223322112',
              makanan: judul,
              deskripsi: deskripsi,
              harga: harga,
            })
            .then(res => {
              console.log(res.data);
              setFavorit(true);
            })
            .catch(err => {
              console.log(err.response.data);
            });
        }
      }}
      onPressOut={() => {
        scaleValue.value = withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.exp),
        });
      }}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <FavoritIcon
          width={26}
          height={26}
          fill={favorit ? '#FFA901' : 'white'}
          stroke={favorit ? '#FFA901' : '#B2B1B9'}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FavoritBotton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
