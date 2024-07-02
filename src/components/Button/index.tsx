import { TouchableOpacityProps } from "react-native";

import { Container, Title, ButtonStyleProps } from './style';

type ButtonProps = TouchableOpacityProps & {
  type?: ButtonStyleProps;
  title: string;
};

export const Button = ({ type = 'PRIMARY', title, ...rest }: ButtonProps) => {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}