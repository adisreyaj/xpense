import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';

const Buttons = ({ children, color = 'primary', type = 'flat' }) => {
  return (
    <TouchableOpacity style={[styles.base, styles[color]]} activeOpacity={0.8}>
      <Text style={{ ...TYPOGRAPHY.subheading, color: '#fff', fontSize: 18 }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 5,
  },
  primary: {
    backgroundColor: THEME.primary,
  },
  accent: {
    backgroundColor: THEME.accent,
  },
});
