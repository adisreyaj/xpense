import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../config/theme';

const Header = ({ clicked, height = 150 }) => {
  return (
    <View style={{ ...styles.header, height }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.back}
        onPress={clicked}
      >
        <Ionicons name="md-arrow-back" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    backgroundColor: THEME.primary,
    width: '100%',
    paddingTop: Constants.statusBarHeight + 24,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
