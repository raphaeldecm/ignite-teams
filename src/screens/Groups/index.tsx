import { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { Headers } from '@/src/components/Headers';
import { Container } from './styles';
import { HighLight } from '@/src/components/HighLight';
import { GroupCard } from '@/src/components/GroupCard';
import { ListEmpty } from '@/src/components/ListEmpty';
import { Button } from '@/src/components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupList } from '@/src/storage/group/groupList';
import { Loading } from '@/src/components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups(){
    try {
      setIsLoading(true)
      setGroups(await groupList())
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível carregar turmas.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleViewGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Headers />
      <HighLight 
        title="Turmas"
        subtitle="Encontre turmas de estudo para se juntar"
      />

      {
        isLoading ?
          <Loading /> :
          <FlatList
            data={groups}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleViewGroup(item)}
              />
            )}
            contentContainerStyle={ groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty message="Nenhuma turma encontrada" />
            )
            }
          />
      }
      
      <Button
        title="Criar Turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}