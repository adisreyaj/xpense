import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import Header from '../../components/ui/Header';
import { THEME } from '../../config/theme';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';
import Spacing from '../../components/ui/Spacing';

const GeneralSettings = ({ navigation }) => {
  const goBack = () => navigation.goBack();
  const [getData, setData] = useAsyncStorage();
  const [isFPAuthEnabled, setIsFPAuthEnabled] = useState(false);
  const toggleFingerPrintAuth = () => setIsFPAuthEnabled((prev) => !prev);

  useEffect(() => {
    getData('fingerprint').then(setIsFPAuthEnabled);
  }, []);

  useEffect(() => {
    setData('fingerprint', isFPAuthEnabled);
  }, [isFPAuthEnabled]);
  return (
    <View>
      <Header clicked={goBack} title="General Settings" />
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                padding: 8,
                backgroundColor: `${THEME.primary}20`,
                width: 40,
                height: 40,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="md-finger-print"
                size={24}
                color={THEME.primary}
              />
            </View>
            <Spacing r={3} />
            <Text style={[human.body, TYPOGRAPHY.body]}>
              Enable Screen Lock
            </Text>
          </View>
          <Switch
            trackColor={{ false: `${THEME.primary}30`, true: THEME.primary }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleFingerPrintAuth}
            value={isFPAuthEnabled}
          />
        </View>
      </View>
    </View>
  );
};

export default GeneralSettings;

const styles = StyleSheet.create({
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
});
