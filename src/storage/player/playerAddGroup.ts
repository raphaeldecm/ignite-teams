import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@/src/utils/AppError";

import { PLAYER_COLLECTION } from "../storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerList } from "./playerList";

export async function PlayerAddGroup(newPlayer: PlayerStorageDTO, groupName: string) {
  try {
    const storedPlayers = await playerList(groupName);

    const playerExists = storedPlayers.filter(player => player.name === newPlayer.name);

    if (playerExists.length > 0) {
      throw new AppError('Player already exists');
    }

    AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupName}`, JSON.stringify([...storedPlayers, newPlayer]));
  } catch (error) {
    throw error;
  }
}