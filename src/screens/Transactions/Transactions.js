import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SectionHeader from '../../components/ui/SectionHeader';
import TransactionItem from './TransactionItem';
import { transactionsItems } from '../../data/mock';
import Header from '../../components/ui/Header';
import { THEME } from '../../config/theme';

const Transactions = () => {
  const navigator = useNavigation();
  const goBack = () => navigator.goBack();
  let listItemValues = transactionsItems.map(() => new Animated.Value(0));
  const animations = listItemValues.map((value) =>
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      useNativeDriver: true,
    })
  );

  const listItemTransitions = (index) => ({
    opacity: listItemValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: listItemValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  });
  useEffect(() => {
    // Reset all the values to 0 on load
    listItemValues.forEach((value) => value.setValue(0));
    Animated.stagger(80, animations).start();
  }, []);

  return (
    <View>
      <Header clicked={goBack} />
      <View style={styles.body}>
        <SectionHeader
          title="Transactions"
          subtitle="All your transactions can be viewed here"
        />

        <FlatList
          data={transactionsItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <Animated.View style={listItemTransitions(index)}>
              <TransactionItem key={index} {...item} />
            </Animated.View>
          )}
        />
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    backgroundColor: THEME.bg,
    height: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
