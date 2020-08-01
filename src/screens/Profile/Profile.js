import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Header from '../../components/ui/Header';
import { THEME } from '../../config/theme';
import { TYPOGRAPHY } from '../../config/typography';
import { human } from 'react-native-typography';
import Spacing from '../../components/ui/Spacing';
import { lightenColor } from '../../helpers/color.helper';
import SectionHeader from '../../components/ui/SectionHeader';
import { profileSettings } from '../../data/mock';

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
      <Animated.View
        style={{
          ...styles.body,
        }}
      >
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacing t={8} />
          <View
            style={{
              width: '100%',
              paddingHorizontal: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Animated.View
              style={{
                ...styles.avatarContainer,
              }}
            >
              <View style={styles.progress}>
                <AnimatedCircularProgress
                  size={Dimensions.get('window').width / 3.5}
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
            </Animated.View>
            <Spacing r={6} />
            <View>
              <Text
                style={[
                  human.title2,
                  TYPOGRAPHY.heading,
                  { color: THEME.primary },
                ]}
              >
                Maicy Williams
              </Text>
              <Spacing t={2} />
              <Text
                style={[
                  human.headline,
                  TYPOGRAPHY.body,
                  { color: THEME.textSecondary },
                ]}
              >
                Saving Streak
              </Text>
            </View>
          </View>
          <Spacing b={4} />
          <View style={styles.highlightsContainer}>
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
                        human.title3,
                        TYPOGRAPHY.numbers,
                        { color: THEME.textPrimary, fontWeight: '700' },
                      ]}
                    >
                      {item.value}
                    </Text>
                    <Spacing t={1} />
                    <Text
                      style={[
                        human.footnote,
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
          <Spacing b={10} />
          <View
            style={{
              alignItems: 'flex-start',
              width: '100%',
              paddingHorizontal: 12,
            }}
          >
            <SectionHeader title="Settings" />
          </View>
          <View style={styles.settings}>
            <FlatList
              numColumns={2}
              scrollEnabled={false}
              data={profileSettings}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.settingsItemContainer}
                  activeOpacity={0.8}
                  onPress={() => navigator.navigate(item.path)}
                >
                  <View style={styles.settingsItem}>
                    <View style={styles.settingsItemIcon}>
                      <MaterialIcons
                        name={item.icon}
                        size={24}
                        color={THEME.primary}
                      />
                    </View>
                    <Spacing b={4} />
                    <Text style={[human.callout, TYPOGRAPHY.subheading]}>
                      {item.title}
                    </Text>
                    <Text style={[human.caption1, TYPOGRAPHY.body]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatarContainer: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    borderRadius: 250,
    flexDirection: 'row',
    borderColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    right: 0,
    left: 0,
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    borderRadius: 180,
  },
  body: {
    width: '100%',
    backgroundColor: '#fff',
    height: Dimensions.get('window').height - 130,
    marginTop: -80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  highlightsContainer: {
    marginTop: 42,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightIcons: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: THEME.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    right: 0,
    left: 0,
    alignItems: 'center',
    padding: 8,
  },

  settings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  settingsItemContainer: {
    flex: 0.5,
    padding: 8,
  },
  settingsItem: {
    backgroundColor: THEME.bg,
    padding: 16,
    borderRadius: 20,
    justifyContent: 'center',
  },
  settingsItemIcon: {
    maxWidth: 40,
    maxHeight: 40,
    minWidth: 25,
    minHeight: 25,
    width: Dimensions.get('window').width / 7,
    height: Dimensions.get('window').width / 7,
    borderRadius: 8,
    backgroundColor: `${THEME.primary}30`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
