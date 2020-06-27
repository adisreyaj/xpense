import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';

const TransactionItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="car"
              size={24}
              color={THEME.primary}
            />
          </View>
          <Spacing r={3} />
          <View>
            <Text style={[human.title2, TYPOGRAPHY.heading]}>Uber</Text>
            <Text style={[human.footnote, TYPOGRAPHY.body]}>25 Jun 2020</Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          <MaterialCommunityIcons name="arrow-down" size={20} color="red" />
          <Spacing r={1} />
          <Text style={[human.title2, TYPOGRAPHY.numbers]}>$250</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  content: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: `${THEME.primary}30`,
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
