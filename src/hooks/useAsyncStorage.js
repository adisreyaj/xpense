import AsyncStorage from '@react-native-community/async-storage';

export const useAsyncStorage = () => {
  const getData = (key) => {
    try {
      return AsyncStorage.getItem(key).then(
        (data) => !!data && JSON.parse(data)
      );
    } catch (error) {
      return new Error('Failed to retrieve item');
    }
  };
  const setData = (key, value) => {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return new Error('Failed to save item');
    }
  };
  return [getData, setData];
};
