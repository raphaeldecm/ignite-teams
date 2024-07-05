import styled, { css } from "styled-components/native";

export type ButtonStyleProps = 'PRIMARY' | 'SECONDARY';

export type ButtonProps = {
  type?: ButtonStyleProps;
};

export const Container = styled.TouchableOpacity<ButtonProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ type, theme }) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
  border-radius: 6px;

  justify-content: center;
  align-items: center;

  margin: 24px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `};
`;
