import { Container, Logo, BackButton, BackIcon } from './style';
import logoImg from '@assets/logo.png';
import { useNavigation } from '@react-navigation/native';

type HeadersProps = {
  showBackButton?: boolean;
};

export function Headers({ showBackButton = false }: HeadersProps) {
  
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('groups');
  }

  return (
    <Container>
      {
        showBackButton &&
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImg} />
    </Container>
  );
}