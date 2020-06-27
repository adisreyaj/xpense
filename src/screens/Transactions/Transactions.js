import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import SectionHeader from '../../components/ui/SectionHeader';

const Transactions = () => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.back}>
          <Ionicons name="md-arrow-back" size={26} color="#fff" />
        </View>
      </View>
      <View style={styles.body}>
        <SectionHeader
          title="Transactions"
          subtitle="All your transactions can be viewed here"
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
