import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';

const Buttons = ({ children, color = 'primary', type = 'base' }) => {
  return (
    <TouchableOpacity
      style={[buttonTypes[type], styles[color]]}
      activeOpacity={0.8}
    >
      <Text
        style={{
          ...TYPOGRAPHY.subheading,
          ...textColor[color],
          fontSize: 16,
          marginBottom: 4,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: THEME.primary,
  },
  primary: {
    backgroundColor: THEME.primary,
  },
  accent: {
    backgroundColor: THEME.accent,
  },
  fade: {
    backgroundColor: '#EFF1FE',
  },
});

const buttonTypes = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 5,
    alignItems: 'center',
  },
  fade: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
const textColor = StyleSheet.create({
  primary: {
    color: '#fff',
  },
  accent: {
    color: '#fff',
  },
  fade: {
    color: THEME.primary,
  },
});
