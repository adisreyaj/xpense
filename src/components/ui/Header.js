import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import { human } from 'react-native-typography';

const Header = ({
  clicked,
  height = 150,
  title = null,
  buttons = ['back'],
}) => {
  return (
    <View style={{ ...styles.header, height }}>
      {buttons.includes('back') && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.back}
            onPress={clicked}
          >
            <Ionicons name="md-arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          {title && (
            <Text style={[human.title3White, TYPOGRAPHY.subheading]}>
              {title}
            </Text>
          )}
        </View>
      )}
      {buttons.includes('search') && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.back}
          onPress={clicked}
        >
          <Ionicons name="md-search" size={26} color="#fff" />
        </TouchableOpacity>
      )}
      {buttons.includes('edit') && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.back}
          onPress={clicked}
        >
          <Ionicons name="md-create" size={24} color="#fff" />
        </TouchableOpacity>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
