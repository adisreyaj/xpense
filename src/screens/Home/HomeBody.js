import React, { useState, useEffect, useRef, createRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
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

const HomeBody = ({ translationY }) => {
  const navigator = useNavigation();
  const [translationYValue, setTranslationYValue] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  // Animations Preps
  const bodyTranslateY = new Animated.Value(0);
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

  const drawerSlideInAnimation = Animated.timing(translationY, {
    toValue: 0,
    duration: 500,
    easing: Easing.bezier(0.24, 0.82, 0.84, 0.98),
    useNativeDriver: true,
  });

  const slideDownAnimation = Animated.timing(translationY, {
    toValue: 0,
    duration: 300,
    easing: Easing.bezier(0.17, 0.67, 0.83, 0.98),
    useNativeDriver: true,
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
      drawerSlideInAnimation,
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

  const bodyTransitions = {
    transform: [
      {
        translateY: translationY.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [Dimensions.get('window').height, 300, 120],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const contentTransitions = {
    transform: [
      {
        translateY: translationY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 12],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const backButtonTransition = {
    opacity: translationY.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
  };

  const searchTransitions = {
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
  };

  const quickAccessHeaderTransitions = {
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
  };

  const quickAccessItemTransitions = (index) => ({
    opacity: quickAccessAnimationValues[index + 1].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: quickAccessAnimationValues[index + 1].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  });

  const categoriesHeaderTransitions = {
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
  };

  const categoriesItemTransitions = (index) => ({
    opacity: categoriesAnimationValues[index + 1].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: categoriesAnimationValues[index + 1].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  });

  const navigateTo = (screen) => screen && navigator.navigate(screen);

  const goBackHome = () =>
    slideDownAnimation.start(() => {
      setIsOpen(false);
    });

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
          ...bodyTransitions,
        }}
      >
        <Animated.View
          style={{
            ...styles.content,
            ...contentTransitions,
          }}
        >
          <TouchableOpacity onPress={goBackHome} style={{ width: 50 }}>
            <Animated.View
              style={{
                alignItems: 'center',
                ...backButtonTransition,
              }}
            >
              <Ionicons name="md-arrow-back" size={26} color="black" />
            </Animated.View>
          </TouchableOpacity>
          <Animated.View
            style={{
              height: Dimensions.get('screen').height - 180,
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
            <Animated.View style={searchTransitions}>
              <Search />
            </Animated.View>
            <Spacing b={8} />
            <ScrollView
              scrollEnabled={isOpen}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, flexGrow: 1 }}
            >
              <Animated.View style={quickAccessHeaderTransitions}>
                <SectionHeader title="Quick Access" />
              </Animated.View>
              <FlatList
                numColumns={2}
                data={quickAccess}
                keyExtractor={(item) => item.title}
                renderItem={({ item, index }) => (
                  <Animated.View
                    style={{
                      flex: 1,
                      ...quickAccessItemTransitions(index),
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
              <Animated.View style={categoriesHeaderTransitions}>
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
                      ...categoriesItemTransitions(index),
                    }}
                  >
                    <Category {...item} />
                  </Animated.View>
                )}
              />
              <Spacing t={8} />
              <Animated.View style={categoriesHeaderTransitions}>
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
                      ...categoriesItemTransitions(index),
                    }}
                  >
                    <Category {...item} />
                  </Animated.View>
                )}
              />
              <Spacing b={20} />
            </ScrollView>
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
});
