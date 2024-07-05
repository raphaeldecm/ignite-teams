import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '../storageConfig';
import { groupList } from './groupList';
import { AppError } from '@/src/utils/AppError';

export async function groupCreate(groupName: string) {
  try {
    const storedGroups = await groupList();

    if(storedGroups.includes(groupName)){
      throw new AppError('Group already exists');
    }

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...storedGroups, groupName]));
    
  } catch (error) {
    throw error;
  }
}