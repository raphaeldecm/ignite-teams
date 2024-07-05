import { TextInputProps, TextInput } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from './style';
import React from "react";

type InputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
}

export function Input({inputRef, ...rest }: InputProps) {

  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest} 
    />
  );
}