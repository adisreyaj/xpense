import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { human } from 'react-native-typography';

import { TYPOGRAPHY } from '../../config/typography';
import { THEME } from '../../config/theme';

const QuickAccess = ({ title, color, route, clicked }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => clicked(route)}
      activeOpacity={0.8}
    >
      <View style={{ ...styles.card }}>
        <View style={{ ...styles.dot, backgroundColor: color }}></View>
        <Text style={[human.subheadWhite, TYPOGRAPHY.subheading]}>{title}</Text>
        <Text style={[human.footnoteWhite, TYPOGRAPHY.body]}>150 Items</Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuickAccess;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    flex: 1,
  },
  card: {
    backgroundColor: THEME.primaryDark,
    width: '100%',
    height: Dimensions.get('window').width / 3.5,
    borderRadius: 24,
    padding: 24,
    paddingVertical: 32,
    justifyContent: 'flex-end',
  },
  dot: {
    backgroundColor: THEME.primary,
    position: 'absolute',
    top: 16,
    right: 16,
    width: 20,
    height: 20,
    borderRadius: 24,
  },
});
