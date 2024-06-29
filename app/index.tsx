import theme from '@/src/theme';
import { Groups } from '@screens/Groups';
import { ThemeProvider } from 'styled-components/native';

export default function HomeScreen() {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
}
