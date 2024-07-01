import { Headers } from '@/src/components/Headers';
import { Container } from './styles';
import { HighLight } from '@/src/components/HighLight';
import { GroupCard } from '@/src/components/GroupCard';

export function Groups() {
  return (
    <Container>
      <Headers showBackButton />
      <HighLight 
        title="Grupos"
        subtitle="Encontre grupos de estudo para se juntar"
      />
      <GroupCard title="Grupo de Matemática" />
    </Container>
  );
}