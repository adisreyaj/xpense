import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import Search from '../../components/ui/Search';

const HomeBody = () => {
  return (
    <View style={styles.body}>
      <View style={styles.content}>
        <Search />
      </View>
    </View>
  );
};

export default HomeBody;

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    top: 300,
    height: Dimensions.get('screen').height - 180,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
});
