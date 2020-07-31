import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import QuickAccess from '../../components/ui/QuickAccess';
import Spacing from '../../components/ui/Spacing';
import Category from '../../components/ui/Category';
import SectionHeader from '../../components/ui/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import { quickAccess, categories } from '../../data/mock';
import { SCREENS } from '../../config/screens';

const HomeBody = ({ translationY }) => {
  const navigator = useNavigation();
  const [appLoaded, setAppLoaded] = useState(false);
  const [translationYValue, setTranslationYValue] = useState(undefined);
  const [drawerActive, setDrawerActive] = useState(true);
  // Animations Preps
  const bodyTranslateY = new Animated.Value(0);
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

  const drawerSlideInAnimation = Animated.timing(translationY, {
    toValue: 0,
    duration: 500,
    easing: Easing.bezier(0.24, 0.82, 0.84, 0.98),
    useNativeDriver: true,
  });

  // Run once on start
  useEffect(() => {
    // Reset all the values to 0 on load
    setDrawerActive(true);
    bodyTranslateY.setValue(0);
    setTranslationYValue(undefined);
    quickAccessAnimationValues.forEach((value) => value.setValue(0));
    categoriesAnimationValues.forEach((value) => value.setValue(0));
    const quickAccessStagger = Animated.stagger(80, quickAccessAnimations);
    const categoriesStagger = Animated.stagger(80, categoriesAnimations);

    // Start staggered animation
    Animated.sequence([
      drawerSlideInAnimation,
      quickAccessStagger,
      categoriesStagger,
    ]).start(() => setAppLoaded(true));
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
          setDrawerActive(false);
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
          setDrawerActive(true);
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
          outputRange: [0, -20],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const quickAccessHeaderTransitions = {
    opacity: quickAccessAnimationValues[0].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: quickAccessAnimationValues[0].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const quickAccessItemTransitions = (index) => ({
    opacity: quickAccessAnimationValues[index + 1].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: quickAccessAnimationValues[index + 1].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  const categoriesHeaderTransitions = {
    opacity: categoriesAnimationValues[0].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: categoriesAnimationValues[0].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const categoriesItemTransitions = (index) => ({
    opacity: categoriesAnimationValues[index + 1].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: categoriesAnimationValues[index + 1].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  const navigateTo = (screen) => screen && navigator.navigate(screen);

  return (
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
        <PanGestureHandler
          enabled={appLoaded && drawerActive}
          onHandlerStateChange={(e) => {
            setTranslationYValue(e.nativeEvent.translationY);
          }}
        >
          <Animated.View
            style={{
              height: Dimensions.get('window').height - 100,
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
            <ScrollView
              scrollEnabled={!drawerActive}
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
              }}
              onScrollEndDrag={({
                nativeEvent: {
                  contentOffset: { y },
                },
              }) => {
                if (y === 0) {
                  Animated.timing(translationY, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.in,
                    useNativeDriver: true,
                  }).start(() => {
                    bodyTranslateY.setValue(0);
                    setDrawerActive(true);
                  });
                }
              }}
            >
              <Animated.View style={quickAccessHeaderTransitions}>
                <SectionHeader title="Quick Access" />
              </Animated.View>
              <FlatList
                numColumns={2}
                scrollEnabled={false}
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
                <SectionHeader
                  title="Categories"
                  button="View More"
                  buttonClicked={() => navigateTo(SCREENS.categories)}
                />
              </Animated.View>
              <FlatList
                numColumns={2}
                scrollEnabled={false}
                data={categories.slice(0, 4)}
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
                <SectionHeader
                  title="Categories"
                  button="View More"
                  buttonClicked={() => navigateTo(SCREENS.categories)}
                />
              </Animated.View>
              <FlatList
                numColumns={2}
                scrollEnabled={false}
                data={categories.slice(0, 4)}
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
              <Spacing b={10} />
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
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
    paddingHorizontal: 24,
    flex: 1,
  },
});
