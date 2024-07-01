import { Container, Icon, Title } from './style';
import { TouchableOpacity } from 'react-native';

type GroupCardProps = TouchableOpacity & {
  title: string;
};

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>
        {title}
      </Title>
    </Container>
  );
}