import { Alert, FlatList, TextInput } from "react-native";
import { Headers } from "@/src/components/Headers";
import { Container, Form, HeaderList, NumberOfPlayers } from "./style";
import { HighLight } from "@/src/components/HighLight";
import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Input } from "@/src/components/Input";
import { Filter } from "@/src/components/Filter";
import { useState, useEffect, useRef } from "react";
import { PlayerCard } from "@/src/components/PlayerCard";
import { ListEmpty } from "@/src/components/ListEmpty";
import { Button } from "@/src/components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@/src/utils/AppError";
import { PlayerAddGroup } from "@/src/storage/player/playerAddGroup";
import { playerGetByGroupAndTeam } from "@/src/storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@/src/storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@/src/storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@/src/storage/group/groupRemoveByName";
import { Loading } from "@/src/components/Loading";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams

  const newPlayerNameRef = useRef<TextInput>(null);

  async function handleIncludePlayer() {
    
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo Jogador', 'Informe o nome do jogador');
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    }
    
    try {
      await PlayerAddGroup(newPlayer, group);

      newPlayerNameRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Jogador', error.message);
      } else {
        console.log(error);
        Alert.alert('Novo Jogador', 'Não foi possível adicionar.');
      }

    }
  }
  
  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const players = await playerGetByGroupAndTeam(group, team);
      setPlayers(players);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      Alert.alert('Jogadores', 'Não foi possível carregar os jogadores');
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Jogadores', 'Não foi possível remover o jogador');
    }
  }
  async function groupRemove(){

    try {
      await groupRemoveByName(group)
      navigation.navigate("groups")
    } catch(error){
      console.log(error)
      Alert.alert("Remover grupo", "Não foi possível remover o grupo.")
    }

  }

  async function handleGroupRemove() {

    Alert.alert(
      "Remover",
      "Deseja remover o grupo?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => { groupRemove() } }
      ]
    );
    
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Headers showBackButton />

      <HighLight
        title={group}
        subtitle="Encontre jogadores para jogar com você"
      />
      <Form>
        <Input
          inputRef={newPlayerNameRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome do jogador"
          autoCorrect={false}
          onSubmitEditing={handleIncludePlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleIncludePlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {
        isLoading ? 
          <Loading /> :
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
            )}
            ListEmptyComponent={() => (
              <ListEmpty
                message="Não há jogadores nesse time"
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 }
            ]}
          />
      }
      <Button 
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}