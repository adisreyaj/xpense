import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';
import AddExpenseFAB from '../../components/ui/AddExpense/AddExpenseFAB';

const Home = () => {
  const translationY = useRef(new Animated.Value(-1)).current;
  useEffect(() => {}, []);
  return (
    <View style={styles.body}>
      <HomeHeader drawerTranslate={translationY} />
      <HomeBody translationY={translationY} />
      <AddExpenseFAB translationY={translationY} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    height: Dimensions.get('window').height,
  },
});
