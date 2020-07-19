import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { human } from 'react-native-typography';
import { TYPOGRAPHY } from '../../config/typography';

const DropdownMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.item, human.body, TYPOGRAPHY.body]}>Debit</Text>
      <Text style={[styles.item, human.body, TYPOGRAPHY.body]}>Credit</Text>
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 4,
    padding: 12,
    position: 'absolute',
    width: '100%',
  },
  item: {
    paddingVertical: 8,
  },
});
