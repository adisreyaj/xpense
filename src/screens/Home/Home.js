import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

const Home = () => {
  return (
    <View>
      <HomeHeader />
      <HomeBody />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
