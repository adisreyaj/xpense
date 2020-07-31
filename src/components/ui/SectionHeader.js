import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { human } from 'react-native-typography';

import { TYPOGRAPHY } from '../../config/typography';
import { THEME } from '../../config/theme';
import Buttons from './Buttons';
import Spacing from './Spacing';

const SectionHeader = ({ title, subtitle, button, buttonClicked }) => {
  return title ? (
    <View style={styles.transactionsHeader}>
      <View>
        <Text style={[human.title3, TYPOGRAPHY.subheading]}>{title}</Text>
        <Spacing b={2} />
        {subtitle && (
          <Text
            style={[
              human.body,
              TYPOGRAPHY.body,
              { color: THEME.textSecondary },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {button && (
        <Buttons type="fade" color="fade" click={() => buttonClicked()}>
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
    paddingHorizontal: 0,
  },
});
