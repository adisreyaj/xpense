import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { THEME } from '../../../config/theme';
import { SCREENS } from '../../../config/screens';

const AddExpenseFAB = () => {
  const navigator = useNavigation();
  const animateValue = new Animated.Value(0);
  const buttonScaleAnimation = Animated.timing(animateValue, {
    toValue: 1,
    duration: 400,
    useNativeDriver: false,
  });

  useEffect(() => {
    animateValue.setValue(0);
  }, []);

  const buttonScaleTransform = animateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').width / 2],
    extrapolate: 'clamp',
  });

  const onButtonPress = () => {
    buttonScaleAnimation.start(() => {
      navigator.navigate(SCREENS.addExpense);
      animateValue.setValue(0);
    });
  };
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onButtonPress}
      activeOpacity={0.8}
    >
      <MaterialIcons name="add" size={30} color="#fff" />
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 16,
          width: 10,
          height: 10,
          borderRadius: 10,
          transform: [
            {
              scale: buttonScaleTransform,
            },
          ],
          zIndex: 1,
          backgroundColor: THEME.primary,
        }}
      ></Animated.View>
    </TouchableOpacity>
  );
};

export default AddExpenseFAB;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    elevation: 20,
    backgroundColor: THEME.primary,
    width: 65,
    height: 65,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
