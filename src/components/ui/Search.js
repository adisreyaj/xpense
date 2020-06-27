import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../config/theme';

const Search = () => {
  const [inFocus, setInFocus] = useState(false);

  return (
    <View>
      <View
        style={{
          ...styles.searchContainer,
          borderColor: inFocus ? THEME.primary : '#fff',
        }}
      >
        <View style={styles.searchIcon}>
          <Feather
            name="search"
            size={24}
            color={inFocus ? THEME.primary : THEME.textSecondary}
          />
        </View>
        <TextInput
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          placeholder="Search"
          placeholderTextColor={THEME.textSecondary}
          style={styles.textInput}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: THEME.bg,
    height: 55,
    borderRadius: 12,

    borderWidth: 2,
  },
  searchIcon: {
    position: 'absolute',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 16,
  },
  textInput: {
    height: 50,
    paddingHorizontal: 18,
    paddingLeft: 50,
    fontSize: 18,
    color: THEME.textPrimary,
    fontFamily: 'Quicksand_500Medium',
  },
});
