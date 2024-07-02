import { FlatList } from "react-native";
import { Headers } from "@/src/components/Headers";
import { Container, Form, HeaderList, NumberOfPlayers } from "./style";
import { HighLight } from "@/src/components/HighLight";
import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Input } from "@/src/components/Input";
import { Filter } from "@/src/components/Filter";
import { useState } from "react";
import { PlayerCard } from "@/src/components/PlayerCard";

export function Players() {

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([
    'Jogador 1',
    'Jogador 2',
    'Jogador 3',
    'Jogador 4',
    'Jogador 5',
    'Jogador 6',
    'Jogador 7',
  ]);

  return (
    <Container>
      <Headers showBackButton />

      <HighLight
        title="Jogadores"
        subtitle="Encontre jogadores para jogar com você"
      />
      <Form>
        <Input
          placeholder="Buscar por jogadores"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
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
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => { }} />
        )}
      >

      </FlatList>
    </Container>
  );
}