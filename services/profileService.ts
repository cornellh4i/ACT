import AsyncStorage from '@react-native-async-storage/async-storage';
import { Children, Progress } from '../components/SwitchUserModal';

const getProfiles = async () => {
  try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allChildren = allKeys.filter(key => key.startsWith('@ACT:Children'))
      const keyValuePairs = await AsyncStorage.multiGet(allChildren);
      return keyValuePairs.map(([key, value]) => value ? JSON.parse(value): []);
     } catch (error) {
       console.error('Failed to load children:', error);
     }
}

const addProfile = async (child: Children) => {
  try {
    await AsyncStorage.setItem(`@ACT:Children:${child.id}`, JSON.stringify(child));
  } catch (error) {
    console.error('Failed to add child:', error);
  }
}

const updateProfile = async (profileId: number, update: Partial<Children>) => {
  try {
    await AsyncStorage.mergeItem(`@ACT:Children${profileId}`, JSON.stringify(update));
  } catch (error) {
    console.error('Failed to update child:', error);
  }
}

const deleteProfile = async (profileId: Number) =>{
  try{
  await AsyncStorage.removeItem(`@ACT:Children${profileId}`);
  }
  catch(error){
    console.error('Failed to remove child:', error);
  }
}

const getProfile = async (profileId: Number) =>{
  try{
  await AsyncStorage.getItem(`@ACT:Children${profileId}`);
  }
  catch(error){
    console.error('Failed to get child:', error);
  }
}

const updateProgress = async (profileId: number, deckId: number, updatedProgress: Partial<Progress>) => {
  try {
    await AsyncStorage.mergeItem(`@ACT:Children${profileId}:Progress`, JSON.stringify(updatedProgress));
  } catch (error) {
    console.error('Failed to update child:', error);
  }
}