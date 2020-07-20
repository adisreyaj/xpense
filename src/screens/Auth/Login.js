import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Animated,
  Easing,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { human } from 'react-native-typography';
import { Formik } from 'formik';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';
import Buttons from '../../components/ui/Buttons';
import { SCREENS } from '../../config/screens';

const Login = () => {
  const navigator = useNavigation();
  const animatedValue = useRef(new Animated.Value(-1)).current;
  const [focus, setFocus] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const drawerAnimation = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
    useNativeDriver: false,
  });

  useEffect(() => {
    animatedValue.setValue(-1);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      useNativeDriver: false,
    }).start();
    setOtpSent(false);
  }, []);

  const openDrawer = () => {
    drawerAnimation.start();
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={styles.header}>
        <Animated.View
          style={{
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.3],
                  outputRange: [1, 0.3],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.3, 1],
                  outputRange: [0, 0, -Dimensions.get('window').width - 180],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 0.3, 1],
                  outputRange: [0, 0, -Dimensions.get('window').height / 3],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <Image
            source={require('../../../assets/xpense_white.png')}
            resizeMode="contain"
            style={{
              height: 120,
              width: 120,
            }}
          />
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    Dimensions.get('window').height / 1.4,
                    Dimensions.get('window').height / 4,
                  ],
                }),
              },
            ],
            paddingTop: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 16],
            }),
          },
        ]}
      >
        <View style={{ paddingVertical: 12, paddingHorizontal: 12 }}>
          <Text style={[human.title1, TYPOGRAPHY.heading]}>Login</Text>
          <Spacing b={2} />
          <Text style={[human.body, TYPOGRAPHY.body]}>
            Manage all your expenses at one place
          </Text>
          <Spacing b={3} />
        </View>
        <Formik
          initialValues={{ mobile: '', otp: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View>
                <View
                  style={[
                    styles.inputContainer,

                    {
                      borderColor:
                        focus === 'phone' ? THEME.primary : '#f3f3f3',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.textInput, { paddingLeft: 50 }]}
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number"
                    editable={!otpSent}
                    onChangeText={handleChange('phone')}
                    onBlur={() => {
                      setFocus(null);
                      handleBlur('phone');
                    }}
                    value={values.phone}
                    onFocus={() => {
                      drawerAnimation.start();
                      setFocus('phone');
                    }}
                  />

                  <View style={{ position: 'absolute', top: 16, left: 16 }}>
                    <Feather
                      name="phone"
                      size={20}
                      color={focus === 'phone' ? THEME.primary : '#999'}
                    />
                  </View>
                </View>
              </View>
              <Spacing b={8} />
              {otpSent && (
                <View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.inputContainer,

                        {
                          borderColor:
                            focus === 'otp' ? THEME.primary : '#f3f3f3',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.textInput, { paddingLeft: 50 }]}
                        keyboardType="numeric"
                        onChangeText={handleChange('otp')}
                        onBlur={() => {
                          setFocus(null);
                          handleBlur('otp');
                        }}
                        value={values.otp}
                        onFocus={() => {
                          setFocus('otp');
                        }}
                      />

                      <View style={{ position: 'absolute', top: 15, left: 16 }}>
                        <Feather
                          name="lock"
                          size={20}
                          color={focus === 'otp' ? THEME.primary : '#999'}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Spacing b={8} />
                </View>
              )}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 0.8, 1],
                        outputRange: [0, 50, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                  opacity: animatedValue.interpolate({
                    inputRange: [0, 0.8, 1],
                    outputRange: [0, 0, 1],
                    extrapolate: 'clamp',
                  }),
                }}
              >
                <Buttons
                  click={() => {
                    if (otpSent) navigator.navigate(SCREENS.home);
                    else setOtpSent(true);
                  }}
                >
                  {otpSent ? 'Login' : 'Generate OTP'}
                </Buttons>
                <View
                  style={{
                    marginTop: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={[human.footnote, TYPOGRAPHY.body]}>
                    Copyright © 2020 - Xpense Inc
                  </Text>
                </View>
              </Animated.View>
            </View>
          )}
        </Formik>
      </Animated.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.primary,
    height: Dimensions.get('window').height,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 3,
    minHeight: 350,
  },
  content: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: THEME.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },

  inputContainer: {
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    // elevation: 0.5,
    margin: 4,
  },
  textInput: {
    height: 50,
    paddingHorizontal: 18,
    fontSize: 24,
    color: THEME.textPrimary,
    fontFamily: 'Quicksand_500Medium',
  },
});
