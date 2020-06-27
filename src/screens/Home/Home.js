import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import HomeHeader from './HomeHeader';

const Home = () => {
  return (
    <View>
      <HomeHeader />
      <View style={styles.body}></View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    top: 300,
    height: Dimensions.get('screen').height - 180,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
