import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { human } from 'react-native-typography';
import { useNavigation } from '@react-navigation/native';

import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';
import { SCREENS } from '../../config/screens';

const HomeHeader = ({ drawerTranslate }) => {
  const navigator = useNavigation();
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

  const welcomeMessageTransitions = {
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
  };

  const subtitleTransitions = {
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
  };

  const balanceTransitions = {
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
  };

  const profileImageTransitions = {
    transform: [
      {
        scale: translateValues[1].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  useEffect(() => {
    translateValues.forEach((value) => value.setValue(0));
    animation.start();
  }, []);

  const gotoProfilePage = () => navigator.navigate(SCREENS.profile);

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="bell" size={24} color="#fff" />
          {/* <Spacing r={4} />
          <Feather name="settings" size={22} color="#fff" /> */}
        </View>
      </View>

      <Animated.View
        style={[
          styles.section,
          styles.userInfo,
          {
            opacity: drawerTranslate.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5],
              extrapolate: 'clamp',
            }),
          },
          {
            transform: [
              {
                scale: drawerTranslate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View>
          <Animated.Text
            style={[
              human.title3White,
              TYPOGRAPHY.subheading,
              welcomeMessageTransitions,
            ]}
          >
            Hi Maicy,
          </Animated.Text>
          <Spacing t={3} />
          <Animated.Text
            style={[human.bodyWhite, TYPOGRAPHY.body, subtitleTransitions]}
          >
            Your current balance is
          </Animated.Text>
          <Animated.Text
            style={[
              human.title1White,
              TYPOGRAPHY.numbers,
              {
                fontSize: 32,
                paddingTop: 16,
              },
              balanceTransitions,
            ]}
          >
            $45,320
          </Animated.Text>
        </View>
        <Animated.View
          style={{
            ...styles.userImage,
            ...profileImageTransitions,
            elevation: 25,
          }}
        >
          <TouchableOpacity onPress={gotoProfilePage} activeOpacity={0.8}>
            <Image
              source={require('../../../assets/images/avatar.png')}
              resizeMode="contain"
              style={styles.userImage}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
    maxWidth: 100,
    maxHeight: 100,
    minHeight: 70,
    minWidth: 70,
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
  },
});
