import { useState } from 'react';
import { FlatList } from 'react-native';
import { Headers } from '@/src/components/Headers';
import { Container } from './styles';
import { HighLight } from '@/src/components/HighLight';
import { GroupCard } from '@/src/components/GroupCard';
import { ListEmpty } from '@/src/components/ListEmpty';
import { Button } from '@/src/components/Button';

export function Groups() {

  const [groups, setGroups] = useState<string[]>([
  ]);

  return (
    <Container>
      <Headers showBackButton />
      <HighLight 
        title="Turmas"
        subtitle="Encontre turmas de estudo para se juntar"
      />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={ groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhuma turma encontrada" />
        )
        }
      />
      <Button
        title="Criar Turma"
        onPress={() => {}}
      />
    </Container>
  );
}