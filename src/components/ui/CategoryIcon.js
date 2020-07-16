const categoryIcons = [
  {
    id: 'transportation',
    icon: require('../../../assets/images/transport.png'),
  },
  {
    id: 'food',
    icon: require('../../../assets/images/food.png'),
  },
  {
    id: 'shopping',
    icon: require('../../../assets/images/shopping.png'),
  },
  {
    id: 'work',
    icon: require('../../../assets/images/work.png'),
  },
  {
    id: 'rent',
    icon: require('../../../assets/images/rent.png'),
  },
  {
    id: 'gym',
    icon: require('../../../assets/images/gym.png'),
  },
  {
    id: 'hospital',
    icon: require('../../../assets/images/hospital.png'),
  },
  {
    id: 'clothing',
    icon: require('../../../assets/images/apparels.png'),
  },
  {
    id: 'bills',
    icon: require('../../../assets/images/bills.png'),
  },
];

import React from 'react';
import { StyleSheet, Image } from 'react-native';

const CategoryIcon = ({ icon }) => {
  let image = null;
  if (icon) {
    const item = categoryIcons.find((item) => item.id === icon);
    if (item && item.icon) image = item.icon;
  }

  return <Image source={image} resizeMode="contain" style={{ flex: 1 }} />;
};

export default CategoryIcon;

const styles = StyleSheet.create({});
