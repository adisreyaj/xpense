import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { human } from 'react-native-typography';
import * as LocalAuthentication from 'expo-local-authentication';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Spacing from '../../components/ui/Spacing';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import { SCREENS } from '../../config/screens';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';

const LockScreen = ({ navigation }) => {
  const enterAnimatedValue = new Animated.Value(0);
  const [getData, _] = useAsyncStorage();
  const enterAnimation = Animated.timing(enterAnimatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
    easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
  });
  const [authenitcated, setAuthenitcated] = useState(false);

  useEffect(() => {
    enterAnimatedValue.setValue(0);
    setAuthenitcated(false);
    enterAnimation.start();
  }, []);

  useEffect(() => {
    if (authenitcated) {
      Animated.timing(enterAnimatedValue, {
        toValue: 2,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      }).start(() => {
        navigation.replace(SCREENS.home);
      });
    }
  }, [authenitcated]);

  useEffect(() => {
    getData('fingerprint').then((isEnabled) => {
      if (!isEnabled) navigation.replace(SCREENS.home);
      else {
        (async () => {
          const checkIfAuthMethodsAvailable = async () => {
            return await LocalAuthentication.hasHardwareAsync();
          };

          const getSupportedAuthMethods = async () => {
            try {
              return await LocalAuthentication.supportedAuthenticationTypesAsync();
            } catch (error) {
              return null;
            }
          };

          const hasAuthData = async () => {
            try {
              return LocalAuthentication.isEnrolledAsync();
            } catch (error) {
              return null;
            }
          };

          const authenticate = async (options) => {
            try {
              return await LocalAuthentication.authenticateAsync(options);
            } catch (error) {
              return null;
            }
          };
          const hasDevice = await checkIfAuthMethodsAvailable();
          if (hasDevice) {
            const methodsAvailable = await getSupportedAuthMethods();
            if (
              methodsAvailable.includes(
                LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
              )
            ) {
              const hasFingerprintRegistered = await hasAuthData();
              if (hasFingerprintRegistered) {
                setTimeout(async () => {
                  const authenticated = await authenticate({
                    promptMessage: 'Please verify Fingerprint to continue',
                  });
                  setAuthenitcated(authenticated);
                }, 600);
              }
            }
          }
        })();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {!authenitcated && (
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: enterAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: enterAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            }}
          >
            <Text style={[human.title1White, TYPOGRAPHY.heading]}>
              Verify Identity
            </Text>
            <Spacing b={4} />
            <Text style={[human.bodyWhite, TYPOGRAPHY.body]}>
              Verify your fingerprint to access your data
            </Text>
            <Spacing b={8} />
          </Animated.View>
        )}
        <View style={[styles.icon]}>
          {authenitcated ? (
            <Animated.View
              style={{
                alignItems: 'center',
                transform: [
                  {
                    scale: enterAnimatedValue.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: [0, 0, 1],
                    }),
                  },
                ],
              }}
            >
              <Feather name="check-circle" size={80} color="#fff" />
            </Animated.View>
          ) : (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: enterAnimatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                  {
                    rotate: enterAnimatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-90deg', '0deg'],
                    }),
                  },
                ],
              }}
            >
              <MaterialIcons name="fingerprint" size={80} color="#fff" />
            </Animated.View>
          )}
        </View>
        <Spacing b={8} />
        {authenitcated && (
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: enterAnimatedValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, 0, 1],
              }),
              transform: [
                {
                  translateY: enterAnimatedValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [50, 50, 0],
                  }),
                },
              ],
            }}
          >
            <Text style={[human.title3White, TYPOGRAPHY.body]}>
              Successfully Verified!
            </Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
