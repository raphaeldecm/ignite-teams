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
import { useRoute } from "@react-navigation/native";
import { AppError } from "@/src/utils/AppError";
import { PlayerAddGroup } from "@/src/storage/player/playerAddGroup";
import { playerGetByGroupAndTeam } from "@/src/storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@/src/storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@/src/storage/player/playerRemoveByGroup";

type RouteParams = {
  group: string;
}

export function Players() {
  
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

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
      const players = await playerGetByGroupAndTeam(group, team);
      setPlayers(players);
    } catch (error) {
      console.log(error);
      Alert.alert('Jogadores', 'Não foi possível carregar os jogadores');
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      console.log(playerName);
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Jogadores', 'Não foi possível remover o jogador');
    }
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

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
}