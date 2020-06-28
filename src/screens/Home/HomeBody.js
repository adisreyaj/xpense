import React, { useState, useEffect, useRef, createRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolate, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import Search from '../../components/ui/Search';
import QuickAccess from '../../components/ui/QuickAccess';
import Spacing from '../../components/ui/Spacing';
import Category from '../../components/ui/Category';
import SectionHeader from '../../components/ui/SectionHeader';
import { SCREENS } from '../../config/screens';
import { useNavigation } from '@react-navigation/native';

const HomeBody = () => {
  const quickAccess = [
    {
      label: 'Transactions',
      color: '#19D093',
      route: SCREENS.transactions,
    },
    {
      label: 'Budget',
      color: '#FF594B',
      route: SCREENS.transactions,
    },
    {
      label: 'Accounts',
      color: '#EBAC48',
      route: SCREENS.transactions,
    },
    {
      label: 'Payments',
      color: '#2F26DB',
      route: SCREENS.transactions,
    },
  ];

  const categories = [
    {
      title: 'Transport',
      subtitle: '26 Jun $50',
      icon: 'car',
    },
    {
      title: 'Food',
      subtitle: '26 Jun $50',
      icon: 'food',
    },
    {
      title: 'Shopping',
      subtitle: '26 Jun $50',
      icon: 'cart',
    },
  ];

  const navigator = useNavigation();
  const [translationYValue, setTranslationYValue] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const bodyTranslateY = new Animated.Value(0);
  const translationY = useRef(new Animated.Value(0)).current;

  const slideDownAnimation = Animated.timing(translationY, {
    toValue: 0,
    duration: 300,
    easing: Easing.bezier(0.17, 0.67, 0.83, 0.98),
  });

  const goBackHome = () =>
    slideDownAnimation.start(() => {
      setIsOpen(false);
    });

  useEffect(() => {
    if (translationYValue) {
      if (translationYValue * -1 > 50) {
        Animated.timing(translationY, {
          toValue: 1,
          duration: 400,
          easing: Easing.bezier(0.17, 0.67, 0.83, 0.98),
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
          top: Animated.interpolate(translationY, {
            inputRange: [0, 1],
            outputRange: [300, 120],
            extrapolate: Extrapolate.CLAMP,
          }),
        }}
      >
        <Animated.View
          style={{
            ...styles.content,
            transform: [
              {
                translateY: Animated.interpolate(translationY, {
                  inputRange: [0, 1],
                  outputRange: [0, 12],
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ],
          }}
        >
          <TouchableOpacity onPress={goBackHome} style={{ width: 50 }}>
            <Animated.View
              style={{
                paddingBottom: Animated.interpolate(translationY, {
                  inputRange: [0, 1],
                  outputRange: [0, 24],
                  extrapolate: Extrapolate.CLAMP,
                }),

                alignItems: 'center',
                // backgroundColor: 'red',
                opacity: Animated.interpolate(translationY, {
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: Extrapolate.CLAMP,
                }),
              }}
            >
              <Ionicons name="md-arrow-back" size={26} color="black" />
            </Animated.View>
          </TouchableOpacity>
          <Search />
          <Spacing b={8} />
          <Animated.ScrollView
            scrollEnabled={isOpen}
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: 220,
            }}
          >
            <View style={styles.categories}>
              <SectionHeader title="Quick Access" />
              <FlatList
                numColumns={2}
                data={quickAccess}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => (
                  <QuickAccess
                    {...item}
                    clicked={(screen) => navigateTo(screen)}
                  />
                )}
              />

              <Spacing t={8} />
              <SectionHeader title="Categories" button="View More" />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => <Category {...item} />}
              />
              <Spacing t={8} />
              <SectionHeader title="Categories" button="View More" />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => <Category {...item} />}
              />
            </View>
            <Spacing b={20} />
          </Animated.ScrollView>
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
