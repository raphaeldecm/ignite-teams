import { playerList } from "./playerList";

export async function playerGetByGroupAndTeam(groupName: string, teamName: string){
  try {
    const storedPlayers = await playerList(groupName);

    const players = storedPlayers.filter(player => player.team === teamName);

    return players;

  } catch (error) {
    throw error;
  }
}