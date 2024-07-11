import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "../storageConfig";
import { playerList } from "./playerList";

export async function playerRemoveByGroup( playerName: string, groupName: string) {
  try {
    const storedPlayers = await playerList(groupName);
    
    const newPlayers = storedPlayers.filter(player => player.name !== playerName);

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${groupName}`,
      JSON.stringify(newPlayers)
    );
    
  } catch (error) {
    throw error;
  }
}