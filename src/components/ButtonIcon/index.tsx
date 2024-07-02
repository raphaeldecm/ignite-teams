import { TouchableOpacityProps } from "react-native";
import { ButtonIconStyleProps, Container, Icon } from "./style";
import { MaterialIcons } from "@expo/vector-icons";

export type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconStyleProps;
};

export function ButtonIcon({ icon, type = "PRIMARY", ...rest}: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon
        name={icon}
        type={type}
      />
    </Container>
  );
}