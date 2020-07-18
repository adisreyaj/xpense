import React, { useEffect, useReducer, useState, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  View,
  Easing,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { human } from 'react-native-typography';

import SectionHeader from '../../components/ui/SectionHeader';
import Spacing from '../../components/ui/Spacing';
import Header from '../../components/ui/Header';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import { categories } from '../../data/mock';
import CategoryIcon from '../../components/ui/CategoryIcon';
import Buttons from '../../components/ui/Buttons';
import { useKeyboard } from '../../hooks/useKeyboardHeight';

const AddExpense = () => {
  const navigator = useNavigation();
  const [focus, setFocus] = useState(null);
  const animatedValue = new Animated.Value(0);
  const scrollViewRef = useRef();
  const [keyboardHeight] = useKeyboard();
  useEffect(() => {
    if (scrollViewRef) {
      let y = 0;
      switch (focus) {
        case 'DESCRIPTION':
          y = 200;
          break;
        case 'AMOUNT':
          y = keyboardHeight + 100;
          break;
      }
      scrollViewRef.current.scrollTo({
        x: 0,
        y,
        animated: true,
      });
    }
  }, [keyboardHeight]);

  const formFields = {
    category: '',
    title: '',
    description: '',
    amount: '',
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'CATEGORY':
        return { ...state, category: action.payload };
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, formFields);

  const bodyTransition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.17, 0.67, 0.82, 0.98),
      useNativeDriver: true,
    }).start();
  }, []);
  const goBack = () => navigator.goBack();

  return (
    <View style={[styles.body]}>
      <Header clicked={goBack} />
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={console.log}
        style={[
          styles.content,
          {
            transform: [{ translateY: bodyTransition }],
            marginBottom: keyboardHeight,
          },
        ]}
      >
        <SectionHeader title="Add New Expense" />
        <Spacing t={4} />
        <View>
          <Text style={[human.title3, TYPOGRAPHY.subheading]}>Title</Text>
          <Spacing b={3} />
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: focus === 'TITLE' ? THEME.primary : '#f3f3f3',
              },
            ]}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Home Rent"
              onFocus={() => setFocus('TITLE')}
              onBlur={() => setFocus(null)}
            />
          </View>
        </View>
        <Spacing b={8} />
        <View>
          <Text style={[human.title3, TYPOGRAPHY.subheading]}>Category</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              style={{
                marginTop: 16,
              }}
              keyExtractor={({ title }) => title}
              contentContainerStyle={{}}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.categoryItemWrapper}
                    onPress={() =>
                      dispatch({ type: 'CATEGORY', payload: item.title })
                    }
                  >
                    <View
                      style={[
                        styles.categoryItem,
                        {
                          borderColor:
                            formState.category === item.title
                              ? THEME.primary
                              : 'transparent',
                        },
                      ]}
                    >
                      <CategoryIcon icon={item.icon} />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <Spacing b={8} />
        <View>
          <Text style={[human.title3, TYPOGRAPHY.subheading]}>Description</Text>
          <Spacing b={3} />
          <View
            style={[
              styles.inputContainer,
              styles.textAreaContainer,
              {
                borderColor:
                  focus === 'DESCRIPTION' ? THEME.primary : '#f3f3f3',
              },
            ]}
          >
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.textInput, styles.textArea]}
              placeholder="Home Rent"
              onFocus={() => setFocus('DESCRIPTION')}
              onBlur={() => setFocus(null)}
            />
          </View>
        </View>
        <Spacing b={8} />
        <View>
          <Text style={[human.title3, TYPOGRAPHY.subheading]}>Amount</Text>
          <Spacing b={3} />
          <View
            style={[
              styles.inputContainer,

              {
                width: '50%',
                borderColor: focus === 'AMOUNT' ? THEME.primary : '#f3f3f3',
              },
            ]}
          >
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              placeholder="Home Rent"
              onFocus={() => setFocus('AMOUNT')}
              onBlur={() => setFocus(null)}
            />
          </View>
        </View>
        <Spacing b={8} />

        <View style={{ paddingVertical: 24 }}>
          <Buttons>Save</Buttons>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  body: {
    backgroundColor: THEME.primary,
    height: Dimensions.get('screen').height,
  },
  content: {
    marginTop: -22,
    paddingTop: 12,
    paddingHorizontal: 24,
    backgroundColor: THEME.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  categoryItemWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: 100,
    position: 'relative',
  },
  categoryItem: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'transparent',
  },
  categorySelectedCheck: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: `${THEME.primary}00`,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    color: THEME.textPrimary,
    fontFamily: 'Quicksand_500Medium',
  },
  textAreaContainer: {
    height: 200,
  },
  textArea: {
    flex: 1,
    display: 'flex',
    paddingVertical: 18,
    textAlignVertical: 'top',
  },
});
