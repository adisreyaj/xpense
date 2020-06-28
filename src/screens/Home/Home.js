import React, { useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

const Home = () => {
  const translationY = useRef(new Animated.Value(-1)).current;
  return (
    <View>
      <HomeHeader drawerTranslate={translationY} />
      <HomeBody translationY={translationY} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
