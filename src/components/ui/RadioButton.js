import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { THEME } from '../../config/theme';

const RadioButton = ({ selected = false }) => {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: THEME.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: THEME.primary,
          }}
        />
      ) : null}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
