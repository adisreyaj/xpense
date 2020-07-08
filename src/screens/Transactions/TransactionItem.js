import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';

const TransactionItem = ({ title, category, icon, color, type, amount }) => {
  const arrowIcons = {
    debit: <MaterialCommunityIcons name="arrow-down" size={20} color="red" />,
    credit: <MaterialCommunityIcons name="arrow-up" size={20} color="green" />,
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
          </View>
          <Spacing r={3} />
          <View>
            <Text style={[human.callout, TYPOGRAPHY.subheading]}>{title}</Text>
            <Spacing t={0.3} />
            <Text style={[human.footnote, TYPOGRAPHY.body]}>25 Jun</Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          {arrowIcons[type]}
          <Spacing r={1} />
          <Text style={[human.title2, TYPOGRAPHY.numbers]}>${amount}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
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
    backgroundColor: `${THEME.primary}10`,
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
