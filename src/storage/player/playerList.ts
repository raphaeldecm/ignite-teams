import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "../storageConfig";

export async function playerList(groupName: string){
  try {
    const storedPlayers = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${groupName}`);
    
    const players: PlayerStorageDTO[] = storedPlayers ? JSON.parse(storedPlayers) : [];

    return players;

  } catch (error) {
    throw error;
  }
}