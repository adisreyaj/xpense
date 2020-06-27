import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';
const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />

      <View style={styles.section}>
        <Image
          source={require('../../../assets/images/logo.png')}
          resizeMode="contain"
          width="30"
        />
        <Feather name="menu" size={28} color="#fff" />
      </View>

      <View style={[styles.section, styles.userInfo]}>
        <View>
          <Text style={[human.title1White, TYPOGRAPHY.subheading]}>
            Hi Maicy,
          </Text>
          <Spacing t={3} />
          <Text style={[human.bodyWhite, TYPOGRAPHY.body]}>
            Your current balance is
          </Text>
          <Spacing t={3} />
          <Text
            style={[
              human.title1White,
              TYPOGRAPHY.numbers,
              { fontSize: 46, paddingTop: 20 },
            ]}
          >
            $45,320
          </Text>
        </View>
        <View style={{ ...styles.userImage, elevation: 25 }}>
          <Image
            source={require('../../../assets/images/avatar.png')}
            resizeMode="contain"
            style={styles.userImage}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 32,
    backgroundColor: THEME.primary,
    width: '100%',
    height: 500,
    paddingTop: Constants.statusBarHeight + 24,
    paddingBottom: 250,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    marginTop: 42,
  },
  userImage: {
    borderRadius: 150,
    width: 100,
    height: 100,
  },
});
