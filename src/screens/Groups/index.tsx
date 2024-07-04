import { useState } from 'react';
import { FlatList } from 'react-native';
import { Headers } from '@/src/components/Headers';
import { Container } from './styles';
import { HighLight } from '@/src/components/HighLight';
import { GroupCard } from '@/src/components/GroupCard';
import { ListEmpty } from '@/src/components/ListEmpty';
import { Button } from '@/src/components/Button';
import { useNavigation } from '@react-navigation/native';

export function Groups() {

  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    // Navigate to the new group screen
    navigation.navigate('new');
  }

  return (
    <Container>
      <Headers />
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
        onPress={handleNewGroup}
      />
    </Container>
  );
}