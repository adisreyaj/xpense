import React from 'react';
import { View, Text } from 'react-native';

const Spacing = ({ t = 0, b = 0, r = 0, l = 0 }) => {
  return (
    <View
      style={{
        marginTop: t * 4,
        marginBottom: b * 4,
        marginLeft: l * 4,
        marginRight: r * 4,
      }}
    ></View>
  );
};

export default Spacing;
