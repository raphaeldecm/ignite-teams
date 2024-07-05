import { Headers } from "@/src/components/Headers";
import { Container, Content, Icon } from "./style";
import { HighLight } from "@/src/components/HighLight";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup() {

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew(){
    navigation.navigate('players', { group })
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