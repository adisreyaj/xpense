import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Header from '../../components/ui/Header';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import { human } from 'react-native-typography';
import Spacing from '../../components/ui/Spacing';
import { lightenColor } from '../../helpers/color.helper';

const Profile = () => {
  const navigator = useNavigation();
  const goBack = () => navigator.goBack();

  const hightlightData = [
    {
      label: 'Transactions',
      value: 150,
      icon: (color = black) => (
        <MaterialCommunityIcons name="cash" size={24} color={color} />
      ),
      color: THEME.primary,
    },
    {
      label: 'Savings',
      value: '$2,350',
      icon: (color = black) => (
        <FontAwesome5 name="piggy-bank" size={24} color={color} />
      ),
      color: '#39dd5d',
    },
    {
      label: 'Expenditure',
      value: '$5,653',
      color: '#FD901E',
      icon: (color = black) => (
        <MaterialCommunityIcons
          name="credit-card-minus"
          size={24}
          color={color}
        />
      ),
    },
  ];

  return (
    <View>
      <Header height={200} clicked={goBack} />
      <View style={styles.body}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.avatarContainer}>
            <View
              style={{
                position: 'absolute',
                right: 0,
                left: 0,
                alignItems: 'center',
                padding: 8,
              }}
            >
              <AnimatedCircularProgress
                size={210}
                width={10}
                rotation={0}
                fill={60}
                lineCap="round"
                tintColor={THEME.accent}
                backgroundColor={THEME.bg}
              />
            </View>
            <Image
              source={require('../../../assets/images/avatar.png')}
              resizeMode="contain"
              style={styles.avatar}
            />
          </View>
          <Spacing b={8} />
          <Text
            style={[human.title1, TYPOGRAPHY.heading, { color: THEME.primary }]}
          >
            Maicy Williams
          </Text>
          <Spacing t={2} />
          <Text
            style={[
              human.title3,
              TYPOGRAPHY.body,
              { color: THEME.textSecondary },
            ]}
          >
            Saving Streak
          </Text>
          <View
            style={{
              marginTop: 42,
              width: '100%',
              paddingHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ width: '100%' }}>
              <FlatList
                horizontal
                contentContainerStyle={{
                  width: '100%',
                  justifyContent: 'space-between',
                }}
                data={hightlightData}
                renderItem={({ item }) => (
                  <View style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        ...styles.highlightIcons,
                        backgroundColor: lightenColor(item.color, 150),
                      }}
                    >
                      {item.icon(item.color)}
                    </View>
                    <Spacing t={5} />
                    <Text
                      style={[
                        human.title1,
                        TYPOGRAPHY.numbers,
                        { color: THEME.textPrimary, fontWeight: '700' },
                      ]}
                    >
                      {item.value}
                    </Text>
                    <Spacing t={1} />
                    <Text
                      style={[
                        human.callout,
                        TYPOGRAPHY.body,
                        { color: THEME.textSecondary },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatarContainer: {
    width: 220,
    height: 220,
    marginTop: -100,
    borderRadius: 250,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#fff',
    borderWidth: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 180,
  },
  body: {
    width: '100%',
    backgroundColor: '#fff',
    height: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  highlightIcons: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: THEME.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
