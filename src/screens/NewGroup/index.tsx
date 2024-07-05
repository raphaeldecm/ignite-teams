import { Headers } from "@/src/components/Headers";
import { Container, Content, Icon } from "./style";
import { HighLight } from "@/src/components/HighLight";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@/src/storage/group/groupCreate";
import { Alert } from "react-native";
import { AppError } from "@/src/utils/AppError";

export function NewGroup() {

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew(){
    try {

      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome do grupo');
      }

      await groupCreate(group);
      navigation.navigate('players', { group })
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Erro ao criar grupo');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      {/* content */}
      <Headers showBackButton />
      <Content>
        <Icon />

        <HighLight
          title="Nova Turma"
          subtitle="Crie um grupo para adicionar pessoas."
        />

        <Input 
          placeholder="Nome da Turma" 
          onChangeText={setGroup}
        />

        <Button title="Criar Turma" onPress={handleNew} />

      </Content>
    </Container>
  );
}