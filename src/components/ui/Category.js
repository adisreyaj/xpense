import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';

const Category = ({ title, subtitle, icon }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={icon} size={24} color={THEME.primary} />
        </View>
        <View>
          <Text style={[human.title2, TYPOGRAPHY.heading]}>{title}</Text>
          <Text style={[human.footnote, TYPOGRAPHY.body]}>{subtitle}</Text>
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
    height: Dimensions.get('window').width / 3,
    borderRadius: 24,
    padding: 24,
    paddingVertical: 24,
    justifyContent: 'flex-end',
  },
  icon: {
    backgroundColor: `${THEME.primary}30`,
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    left: 16,
  },
});
