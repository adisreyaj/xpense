import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../../config/theme';
import SectionHeader from '../../components/ui/SectionHeader';
import TransactionItem from './TransactionItem';
import { transactionsItems } from '../../data/mock';
import { useNavigation } from '@react-navigation/native';

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
  useEffect(() => {
    // Reset all the values to 0 on load
    listItemValues.forEach((value) => value.setValue(0));
    Animated.stagger(80, animations).start();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.back}
          onPress={goBack}
        >
          <Ionicons name="md-arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <SectionHeader
          title="Transactions"
          subtitle="All your transactions can be viewed here"
        />

        <FlatList
          data={transactionsItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
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
              }}
            >
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
  header: {
    paddingHorizontal: 16,
    backgroundColor: THEME.primary,
    width: '100%',
    height: 150,
    paddingTop: Constants.statusBarHeight + 24,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  body: {
    width: '100%',
    backgroundColor: '#fff',
    height: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
