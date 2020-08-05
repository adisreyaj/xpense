import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';
import CategoryIcon from '../../components/ui/CategoryIcon';

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
            <CategoryIcon icon={icon} />
          </View>
          <Spacing r={2} />
          <View style={styles.info}>
            <Text
              style={[human.callout, TYPOGRAPHY.subheading]}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text style={[human.footnote, TYPOGRAPHY.body]}>25 Jun</Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          {arrowIcons[type]}
          <Spacing r={1} />
          <Text style={[human.body, TYPOGRAPHY.numbers]}>Rs.{amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 6,
  },
  content: {
    width: '100%',
    paddingVertical: 12,
    paddingRight: 16,
    paddingLeft: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.7,
  },
  contentRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 0.3,
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
});
