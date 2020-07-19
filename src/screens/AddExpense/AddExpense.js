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
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { human } from 'react-native-typography';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Spacing from '../../components/ui/Spacing';
import Header from '../../components/ui/Header';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import { categories } from '../../data/mock';
import CategoryIcon from '../../components/ui/CategoryIcon';
import Buttons from '../../components/ui/Buttons';
import { useKeyboard } from '../../hooks/useKeyboardHeight';
import RadioButton from '../../components/ui/RadioButton';

const AddExpense = () => {
  const navigator = useNavigation();
  const [focus, setFocus] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const animatedValue = new Animated.Value(0);
  const scrollViewRef = useRef();
  const [keyboardHeight] = useKeyboard();
  useEffect(() => {
    if (scrollViewRef) {
      let y = 0;
      switch (focus) {
        case 'description':
          y = 200;
          break;
        case 'amount':
        case 'type':
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
    date: new Date(),
    description: '',
    amount: '',
    type: 'debit',
  };

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

  const prettyifyDate = (date) => {
    if (date) {
      const dateValue = new Date(date);
      if (dateValue)
        return `${dateValue.getDate()}/${dateValue.getMonth()}/${dateValue.getFullYear()}`;
    }
    return '';
  };
  return (
    <View style={[styles.body]}>
      <Header clicked={goBack} title="Add New Expense" />
      <Animated.ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={[
          styles.content,
          {
            transform: [{ translateY: bodyTransition }],
            marginBottom: keyboardHeight,
          },
        ]}
      >
        <Spacing t={4} />
        <Formik
          initialValues={formFields}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View>
                <Text style={[human.title3, TYPOGRAPHY.subheading]}>Title</Text>
                <Spacing b={3} />
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor:
                        focus === 'title' ? THEME.primary : '#f3f3f3',
                    },
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="Home Rent"
                    onChangeText={handleChange('title')}
                    onBlur={() => {
                      setFocus(null);
                      handleBlur('title');
                    }}
                    value={values.title}
                    onFocus={() => setFocus('title')}
                  />
                </View>
              </View>
              <Spacing b={10} />
              <View>
                <Text style={[human.title3, TYPOGRAPHY.subheading]}>Date</Text>
                <Spacing b={3} />
                <View
                  style={[
                    styles.inputContainer,
                    {
                      width: '50%',
                      borderColor: focus === 'date' ? THEME.primary : '#f3f3f3',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.textInput, { paddingLeft: 46 }]}
                    value={prettyifyDate(values.date)}
                    onFocus={() => {
                      setFocus('date');
                    }}
                    onBlur={() => {
                      setFocus(null);
                      handleBlur('date');
                    }}
                    onChangeText={handleChange('date')}
                  />
                  <View style={{ position: 'absolute', top: 12, left: 16 }}>
                    <Ionicons
                      name="md-calendar"
                      size={24}
                      color={focus === 'date' ? THEME.primary : '#999'}
                    />
                  </View>
                  {showDatePicker && (
                    <DateTimePicker
                      value={values.date}
                      onChange={(_, date) => {
                        setShowDatePicker(false);
                        handleChange('date')(`${date}`);
                      }}
                    />
                  )}
                </View>
              </View>
              <Spacing b={10} />
              <View>
                <Text style={[human.title3, TYPOGRAPHY.subheading]}>
                  Category
                </Text>
                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    style={{ paddingTop: 20 }}
                    keyExtractor={({ title }) => title}
                    contentContainerStyle={{}}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={[
                            styles.categoryItemWrapper,
                            {
                              transform: [
                                {
                                  scale:
                                    values.category === item.title ? 1.2 : 1,
                                },
                              ],
                            },
                          ]}
                          onPress={() => handleChange('category')(item.title)}
                        >
                          <View
                            style={[
                              styles.categoryItem,
                              {
                                borderColor:
                                  values.category === item.title
                                    ? THEME.primary
                                    : 'transparent',
                              },
                            ]}
                          >
                            <CategoryIcon icon={item.icon} />
                          </View>
                          <Spacing b={2} />
                          {values.category === item.title ? (
                            <Text
                              style={[human.caption1, TYPOGRAPHY.subheading]}
                            >
                              {item.title}
                            </Text>
                          ) : (
                            <Text></Text>
                          )}
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
              <Spacing b={10} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 45 }}>
                  <Text style={[human.title3, TYPOGRAPHY.subheading]}>
                    Amount
                  </Text>
                  <Spacing b={3} />
                  <View
                    style={[
                      styles.inputContainer,

                      {
                        borderColor:
                          focus === 'amount' ? THEME.primary : '#f3f3f3',
                      },
                    ]}
                  >
                    <TextInput
                      style={[styles.textInput, { paddingLeft: 46 }]}
                      keyboardType="number-pad"
                      onChangeText={handleChange('amount')}
                      onBlur={() => {
                        setFocus(null);
                        handleBlur('amount');
                      }}
                      value={values.amount}
                      onFocus={() => setFocus('amount')}
                    />

                    <View style={{ position: 'absolute', top: 12, left: 16 }}>
                      <MaterialIcons
                        name="credit-card"
                        size={24}
                        color={focus === 'amount' ? THEME.primary : '#999'}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 5 }}></View>
                <View style={{ flex: 50 }}>
                  <Text style={[human.title3, TYPOGRAPHY.subheading]}>
                    Type
                  </Text>
                  <Spacing b={8} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleChange('type')('debit')}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <RadioButton selected={values.type === 'debit'} />
                      <Spacing r={2} />
                      <Text style={[human.body, TYPOGRAPHY.subheading]}>
                        Debit
                      </Text>
                    </TouchableOpacity>
                    <Spacing r={8} />
                    <TouchableOpacity
                      onPress={() => handleChange('type')('credit')}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <RadioButton selected={values.type === 'credit'} />
                      <Spacing r={2} />
                      <Text style={[human.body, TYPOGRAPHY.subheading]}>
                        Credit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Spacing b={10} />
              <View>
                <Text style={[human.title3, TYPOGRAPHY.subheading]}>
                  Description
                </Text>
                <Spacing b={3} />
                <View
                  style={[
                    styles.inputContainer,
                    styles.textAreaContainer,
                    {
                      borderColor:
                        focus === 'description' ? THEME.primary : '#f3f3f3',
                    },
                  ]}
                >
                  <TextInput
                    multiline
                    numberOfLines={4}
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Paid rent for the month of July"
                    onChangeText={handleChange('description')}
                    onBlur={() => {
                      setFocus(null);
                      handleBlur('description');
                    }}
                    value={values.description}
                    onFocus={() => setFocus('description')}
                  />
                </View>
              </View>
              <Spacing b={10} />
              <View style={{ paddingVertical: 24 }}>
                <Buttons click={handleSubmit}>Save</Buttons>
              </View>
              <Spacing b={10} />
            </View>
          )}
        </Formik>
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
    width: 120,
    position: 'relative',
  },
  categoryItem: {
    height: 60,
    width: 60,
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
