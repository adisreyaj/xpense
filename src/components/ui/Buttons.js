import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import { human } from 'react-native-typography';

const Buttons = ({ children, color = 'primary', type = 'base', click }) => {
  return (
    <TouchableOpacity
      onPress={() => click()}
      style={[buttonTypes[type], styles[color]]}
      activeOpacity={0.8}
    >
      <Text
        style={{
          ...human.footnoteObject,
          ...TYPOGRAPHY.subheading,
          ...textColor[color],
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
    elevation: 2,
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
