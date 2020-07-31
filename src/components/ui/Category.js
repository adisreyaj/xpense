import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import CategoryIcon from './CategoryIcon';

const Category = ({ title, subtitle, icon }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.icon}>{icon && <CategoryIcon icon={icon} />}</View>
        <View>
          {title && (
            <Text style={[human.subhead, TYPOGRAPHY.heading]}>{title}</Text>
          )}
          {subtitle && (
            <Text style={[human.footnote, TYPOGRAPHY.body]}>{subtitle}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width / 2 - 40,
    margin: 8,
    flex: 1,
  },
  card: {
    backgroundColor: THEME.bg,
    width: '100%',
    height: Dimensions.get('window').width / 2.8,
    borderRadius: 24,
    padding: 24,
    paddingVertical: 24,
    justifyContent: 'flex-end',
  },
  icon: {
    width: Dimensions.get('screen').width / 8,
    height: Dimensions.get('screen').width / 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    left: 16,
  },
});
