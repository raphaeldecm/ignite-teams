import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: "large",
  color: theme.COLORS.GRAY_700,
}))``;