import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Easing,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SectionHeader from '../../components/ui/SectionHeader';
import TransactionItem from './TransactionItem';
import Header from '../../components/ui/Header';
import { THEME } from '../../config/theme';
import { expenseService } from '../../services/expenses.service';

const Transactions = () => {
  const [expenses, setExpenses] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigator = useNavigation();
  const goBack = () => navigator.goBack();
  let listItemValues = null;
  let animations = [];
  const listItemTransitions = (index, animatedValues) => {
    return {
      opacity: animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateY: animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };
  };
  useEffect(() => {
    if (listItemValues) listItemValues.forEach((value) => value.setValue(0));
    expenseService.getExpenses().then((data) => {
      listItemValues = data.map(() => new Animated.Value(0));
      animations = listItemValues.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 300,
          easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
          useNativeDriver: true,
        })
      );
      setLoaded(true);
      Animated.stagger(80, animations).start();
      const dataWithTransitions = data.map((item, i) => {
        return { ...item, transition: listItemTransitions(i, listItemValues) };
      });
      setExpenses(dataWithTransitions);
    });
  }, []);

  return (
    <View>
      <Header
        clicked={goBack}
        title="Transactions"
        buttons={['back', 'search']}
      />
      <View style={styles.body}>
        {expenses && loaded && (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
              // <Animated.View>
              <Animated.View style={item.transition}>
                <TransactionItem key={index} {...item} />
              </Animated.View>
            )}
          />
        )}
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
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
