import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ListProvider } from '@/presentation/context/LitsContext';
import { useTheme } from '@/presentation/hooks/useThemeColor';
import { PaperProvider } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useTheme()
  const [loaded] = useFonts({
    SpaceMono: require('@/presentation/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <PaperProvider theme={theme}>
        <ListProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />        
          </Stack>
        </ListProvider>
        <StatusBar style="auto" />
      </PaperProvider>
  );
}
