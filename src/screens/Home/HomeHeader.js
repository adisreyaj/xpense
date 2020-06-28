import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';
const HomeHeader = () => {
  const elementsToAnimated = Array(3).fill(true);
  let translateValues = elementsToAnimated.map(() => new Animated.Value(0));
  const staggeredAnimations = translateValues.map((value) =>
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      delay: 300,
      easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      useNativeDriver: true,
    })
  );
  const animation = Animated.stagger(100, staggeredAnimations);

  useEffect(() => {
    translateValues.forEach((value) => value.setValue(0));
    animation.start();
  }, []);

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
          <Animated.Text
            style={[
              human.title1White,
              TYPOGRAPHY.subheading,
              {
                opacity: translateValues[0].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    translateY: translateValues[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            Hi Maicy,
          </Animated.Text>
          <Spacing t={3} />
          <Animated.Text
            style={[
              human.bodyWhite,
              TYPOGRAPHY.body,
              {
                opacity: translateValues[1].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    translateY: translateValues[1].interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            Your current balance is
          </Animated.Text>
          <Spacing t={3} />
          <Animated.Text
            style={[
              human.title1White,
              TYPOGRAPHY.numbers,
              {
                fontSize: 46,
                paddingTop: 20,
                opacity: translateValues[2].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    translateY: translateValues[2].interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            $45,320
          </Animated.Text>
        </View>
        <Animated.View
          style={{
            ...styles.userImage,
            elevation: 25,
            transform: [
              {
                scale: translateValues[1].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
        >
          <Image
            source={require('../../../assets/images/avatar.png')}
            resizeMode="contain"
            style={styles.userImage}
          />
        </Animated.View>
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
