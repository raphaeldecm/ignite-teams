import { FlatList } from "react-native";
import { Headers } from "@/src/components/Headers";
import { Container, Form, HeaderList, NumberOfPlayers } from "./style";
import { HighLight } from "@/src/components/HighLight";
import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Input } from "@/src/components/Input";
import { Filter } from "@/src/components/Filter";
import { useState } from "react";
import { PlayerCard } from "@/src/components/PlayerCard";
import { ListEmpty } from "@/src/components/ListEmpty";
import { Button } from "@/src/components/Button";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  group: string;
}

export function Players() {

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams
  
  return (
    <Container>
      <Headers showBackButton />

      <HighLight
        title={group}
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