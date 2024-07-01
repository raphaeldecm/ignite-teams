import { Container, Logo, BackButton, BackIcon } from './style';
import logoImg from '@assets/logo.png';

type HeadersProps = {
  showBackButton?: boolean;
};

export function Headers({ showBackButton = false }: HeadersProps) {
  return (
    <Container>
      {
        showBackButton &&
        <BackButton>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImg} />
    </Container>
  );
}