import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, createTheme, Theme } from '@rneui/themed';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

const theme = createTheme({
  lightColors: {
    primary: '#000',
  },
  Input: {
    inputStyle: {
      paddingHorizontal: 8,
      paddingVertical: 20,
      borderRadius: 12,
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
    },
  },
  Chip: { buttonStyle: { marginTop: 10, paddingVertical: 8, borderRadius: 50 } },
  ListItemContent: { style: { paddingVertical: 4 } },
  ListItem: { containerStyle: { borderRadius: 12 } },
  ListItemTitle: { style: { fontSize: 14, fontWeight: 'bold' } },
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
