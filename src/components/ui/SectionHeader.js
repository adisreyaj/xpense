import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { human } from 'react-native-typography';

import { TYPOGRAPHY } from '../../config/typography';
import { THEME } from '../../config/theme';
import Buttons from './Buttons';

const SectionHeader = ({ title, subtitle, button }) => {
  return title ? (
    <View style={styles.transactionsHeader}>
      <View>
        <Text style={[human.title2, TYPOGRAPHY.subheading]}>{title}</Text>
        <Text
          style={[human.body, TYPOGRAPHY.body, { color: THEME.textSecondary }]}
        >
          {subtitle}
        </Text>
      </View>
      {button && (
        <Buttons type="fade" color="fade">
          {button}
        </Buttons>
      )}
    </View>
  ) : null;
};

export default SectionHeader;

const styles = StyleSheet.create({
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 12,
  },
});
