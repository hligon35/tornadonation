import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import AppBackground from '@/components/AppBackground';
import { defaultTheme } from '@tornado-nation/ui';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Keep the splash screen visible while we load fonts.
void SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore errors (e.g., if already prevented).
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (error) {
    throw error;
  }

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'tornado-nation-query-cache',
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24,
      }}
    >
      <ThemeProvider value={navTheme}>
        <AppBackground>
          <Stack
            screenOptions={{
              headerBackButtonDisplayMode: 'minimal',
              headerTitleAlign: 'center',
              contentStyle: {
                backgroundColor: 'rgba(128, 128, 128, 0.25)',
              },
              headerStyle: {
                backgroundColor: defaultTheme.colors.brandSecondary,
              },
              headerTintColor: defaultTheme.colors.slate900,
              headerTitleStyle: {
                color: defaultTheme.colors.slate900,
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AppBackground>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}
