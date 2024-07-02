import { Headers } from "@/src/components/Headers";
import { Container, Content, Icon } from "./style";
import { HighLight } from "@/src/components/HighLight";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";

export function NewGroup() {
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

        <Input placeholder="Nome da Turma" />

        <Button title="Criar Turma" onPress={() => {}} />

      </Content>
    </Container>
  );
}