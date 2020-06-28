import React, { useState, useEffect, useRef, createRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Search from '../../components/ui/Search';
import QuickAccess from '../../components/ui/QuickAccess';
import Spacing from '../../components/ui/Spacing';
import Category from '../../components/ui/Category';
import SectionHeader from '../../components/ui/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import { quickAccess, categories } from '../../data/mock';

const HomeBody = () => {
  const navigator = useNavigation();
  const [translationYValue, setTranslationYValue] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  // Animations Preps
  const bodyTranslateY = new Animated.Value(0);
  const translationY = useRef(new Animated.Value(0)).current;
  const searchTranslate = new Animated.Value(0);
  let quickAccessAnimationValues = [true, ...quickAccess].map(
    () => new Animated.Value(0)
  );
  let categoriesAnimationValues = [true, ...categories].map(
    () => new Animated.Value(0)
  );

  const quickAccessAnimations = quickAccessAnimationValues.map((value) =>
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      useNativeDriver: true,
    })
  );

  const categoriesAnimations = categoriesAnimationValues.map((value) =>
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      useNativeDriver: true,
    })
  );

  const searchAnimation = Animated.timing(searchTranslate, {
    toValue: 1,
    duration: 200,
    easing: Easing.bezier(0.17, 0.67, 0.83, 0.98),
    useNativeDriver: true,
  });

  const slideDownAnimation = Animated.timing(translationY, {
    toValue: 0,
    duration: 300,
    easing: Easing.bezier(0.17, 0.67, 0.83, 0.98),
    useNativeDriver: true,
  });

  const goBackHome = () =>
    slideDownAnimation.start(() => {
      setIsOpen(false);
    });

  // Run once on start
  useEffect(() => {
    // Reset all the values to 0 on load
    quickAccessAnimationValues.forEach((value) => value.setValue(0));
    categoriesAnimationValues.forEach((value) => value.setValue(0));
    searchTranslate.setValue(0);
    const quickAccessStagger = Animated.stagger(80, quickAccessAnimations);
    const categoriesStagger = Animated.stagger(80, categoriesAnimations);

    // Start staggered animation
    Animated.sequence([
      searchAnimation,
      quickAccessStagger,
      categoriesStagger,
    ]).start();
  }, []);

  useEffect(() => {
    if (translationYValue) {
      if (translationYValue * -1 > 50) {
        Animated.timing(translationY, {
          toValue: 1,
          duration: 400,
          easing: Easing.bezier(0.17, 0.67, 0.83, 0.98),
          useNativeDriver: true,
        }).start(() => {
          bodyTranslateY.setValue(1);
          setIsOpen(true);
        });
      }
      if (translationYValue > 50) {
        Animated.timing(translationY, {
          toValue: 0,
          duration: 200,
          easing: Easing.in,
          useNativeDriver: true,
        }).start(() => {
          bodyTranslateY.setValue(0);
          setIsOpen(false);
        });
      }
    }
  }, [translationYValue]);

  const navigateTo = (screen) => screen && navigator.navigate(screen);
  return (
    <PanGestureHandler
      enabled={!isOpen}
      onHandlerStateChange={(e) =>
        setTranslationYValue(e.nativeEvent.translationY)
      }
    >
      <Animated.View
        style={{
          ...styles.body,
          transform: [
            {
              translateY: translationY.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 120],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Animated.View
          style={{
            ...styles.content,

            transform: [
              {
                translateY: translationY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 12],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <TouchableOpacity onPress={goBackHome} style={{ width: 50 }}>
            <Animated.View
              style={{
                alignItems: 'center',
                opacity: translationY.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [0, 0, 1],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Ionicons name="md-arrow-back" size={26} color="black" />
            </Animated.View>
          </TouchableOpacity>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: translationY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 24],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <Animated.View
              style={{
                opacity: quickAccessAnimationValues[0].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    translateY: quickAccessAnimationValues[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }}
            >
              <Search />
            </Animated.View>
            <Spacing b={8} />
            <Animated.ScrollView
              scrollEnabled={isOpen}
              showsVerticalScrollIndicator={false}
              style={{
                marginBottom: 220,
              }}
            >
              <View style={styles.categories}>
                <Animated.View
                  style={{
                    opacity: quickAccessAnimationValues[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                    transform: [
                      {
                        translateY: quickAccessAnimationValues[0].interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <SectionHeader title="Quick Access" />
                </Animated.View>
                <FlatList
                  numColumns={2}
                  data={quickAccess}
                  keyExtractor={(item) => item.label}
                  renderItem={({ item, index }) => (
                    <Animated.View
                      style={{
                        flex: 1,
                        opacity: quickAccessAnimationValues[
                          index + 1
                        ].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                        transform: [
                          {
                            translateY: quickAccessAnimationValues[
                              index + 1
                            ].interpolate({
                              inputRange: [0, 1],
                              outputRange: [50, 0],
                            }),
                          },
                        ],
                      }}
                    >
                      <QuickAccess
                        {...item}
                        clicked={(screen) => navigateTo(screen)}
                      />
                    </Animated.View>
                  )}
                />

                <Spacing t={8} />
                <Animated.View
                  style={{
                    opacity: categoriesAnimationValues[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                    transform: [
                      {
                        translateY: categoriesAnimationValues[0].interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <SectionHeader title="Categories" button="View More" />
                </Animated.View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={categories}
                  keyExtractor={(item) => item.title}
                  renderItem={({ item, index }) => (
                    <Animated.View
                      style={{
                        flex: 1,
                        opacity: categoriesAnimationValues[
                          index + 1
                        ].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                        transform: [
                          {
                            translateY: categoriesAnimationValues[
                              index + 1
                            ].interpolate({
                              inputRange: [0, 1],
                              outputRange: [50, 0],
                            }),
                          },
                        ],
                      }}
                    >
                      <Category {...item} />
                    </Animated.View>
                  )}
                />
              </View>
              <Spacing b={20} />
            </Animated.ScrollView>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default HomeBody;

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  categories: {},
});
