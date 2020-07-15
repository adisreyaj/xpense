import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Constants from 'expo-constants';
import SectionHeader from '../../components/ui/SectionHeader';
import Spacing from '../../components/ui/Spacing';
import { TYPOGRAPHY } from '../../config/typography';
import { human } from 'react-native-typography';
import Header from '../../components/ui/Header';
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../../config/theme';

const mockCategories = [
  {
    label: 'Transportation',
    icon: require('../../../assets/images/transport.png'),
  },
  {
    label: 'Food',
    icon: require('../../../assets/images/food.png'),
  },
  {
    label: 'Shopping',
    icon: require('../../../assets/images/shopping.png'),
  },
  {
    label: 'Work',
    icon: require('../../../assets/images/work.png'),
  },
  {
    label: 'Rent',
    icon: require('../../../assets/images/rent.png'),
  },
  {
    label: 'Gym',
    icon: require('../../../assets/images/gym.png'),
  },
  {
    label: 'Hospital',
    icon: require('../../../assets/images/hospital.png'),
  },
  {
    label: 'Clothing',
    icon: require('../../../assets/images/apparels.png'),
  },
  {
    label: 'Bills',
    icon: require('../../../assets/images/bills.png'),
  },
];

const Categories = () => {
  const navigator = useNavigation();
  const goBack = () => navigator.goBack();
  const itemAnimationValues = mockCategories.map(() => new Animated.Value(0));
  const itemAnimations = itemAnimationValues.map((value) =>
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      useNativeDriver: true,
    })
  );

  const itemTransitions = (index) => ({
    transform: [
      {
        translateY: itemAnimationValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
    opacity: itemAnimationValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  });

  useEffect(() => {
    itemAnimationValues.forEach((value) => value.setValue(0));
    Animated.stagger(50, itemAnimations).start();
  }, []);

  return (
    <View>
      <Header clicked={goBack} />
      <View style={styles.body}>
        <SectionHeader
          title="Categories"
          subtitle="Select a category to view stats"
        />
        <Spacing t={4} />
        <FlatList
          numColumns={3}
          keyExtractor={(item) => item.label}
          data={mockCategories}
          renderItem={({ item, index }) => {
            return (
              <Animated.View
                style={{
                  flex: 1,
                  ...itemTransitions(index),
                }}
              >
                <CategoriesIcons {...item} />
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    backgroundColor: THEME.bg,
    height: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

const CategoriesIcons = ({ label, icon }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginVertical: 16,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 100,
          }}
        >
          <Image source={icon} resizeMode="contain" style={{ flex: 1 }} />
        </View>
        <Spacing b={4} />
        <Text style={[human.body, TYPOGRAPHY.subheading, { opacity: 0.6 }]}>
          {label}
        </Text>
      </View>
    </View>
  );
};
