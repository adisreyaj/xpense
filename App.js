import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { Oswald_400Regular } from '@expo-google-fonts/oswald';
import { AppLoading } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { SCREENS } from './src/config/screens';
import Home from './src/screens/Home/Home';
import Transactions from './src/screens/Transactions/Transactions';
import Profile from './src/screens/Profile/Profile';
import Categories from './src/screens/Categories/Categories';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Oswald_400Regular,
  });
  console.disableYellowBox = true;
  if (!fontsLoaded) return <AppLoading />;
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={SCREENS.home} headerMode="none">
          <Stack.Screen name={SCREENS.home} component={Home}></Stack.Screen>
          <Stack.Screen
            name={SCREENS.profile}
            component={Profile}
          ></Stack.Screen>
          <Stack.Screen
            name={SCREENS.transactions}
            component={Transactions}
          ></Stack.Screen>
          <Stack.Screen
            name={SCREENS.categories}
            component={Categories}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
