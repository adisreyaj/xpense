import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
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
          renderItem={({ item }) => {
            return <CategoriesIcons {...item} />;
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
