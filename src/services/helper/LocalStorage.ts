import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native';

function LocalStorage() {
  async function set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async function get(key: string) {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value || 'null');
  }

  async function remove(key: string) {
    await AsyncStorage.removeItem(key);
  }

  return { set, get, remove };
}

export default LocalStorage();
