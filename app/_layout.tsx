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
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import AppBackground from '@/components/AppBackground';
import BrandHeaderTitle from '@/components/BrandHeaderTitle';
import HeaderActions from '@/components/HeaderActions';
import StartupVideoSplash from '@/components/StartupVideoSplash';
import { defaultTheme } from '@tornado-nation/ui';

import { CartProvider } from '@/lib/store/cart-context';

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

  const [minSplashTimePassed, setMinSplashTimePassed] = useState(false);

  const [nativeSplashHidden, setNativeSplashHidden] = useState(false);

  const onRootLayout = useCallback(() => {
    if (nativeSplashHidden) return;
    void SplashScreen.hideAsync()
      .catch(() => {
        // Ignore errors (e.g., already hidden)
      })
      .finally(() => {
        setNativeSplashHidden(true);
      });
  }, [nativeSplashHidden]);

  // We hide the native splash on first layout so the video splash can render.

  useEffect(() => {
    const MIN_SPLASH_MS = 4425;
    const timer = setTimeout(() => {
      setMinSplashTimePassed(true);
    }, MIN_SPLASH_MS);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (error) {
    throw error;
  }

  const isAppReady = loaded && minSplashTimePassed;

  return (
    <View style={{ flex: 1 }} onLayout={onRootLayout}>
      {isAppReady ? <RootLayoutNav /> : <StartupVideoSplash />}
    </View>
  );
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
      <CartProvider>
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
                headerTitle: () => <BrandHeaderTitle />,
                headerRight: () => <HeaderActions />,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)/profile/index" options={{ title: 'PROFILE' }} />
              <Stack.Screen name="(tabs)/profile/passes" options={{ title: 'Passes' }} />
              <Stack.Screen name="(tabs)/profile/memberships" options={{ title: 'Memberships' }} />
              <Stack.Screen name="(tabs)/profile/orders" options={{ title: 'Orders' }} />
              <Stack.Screen name="(tabs)/profile/notifications" options={{ title: 'Notifications' }} />

              <Stack.Screen name="(tabs)/profile/settings/index" options={{ title: 'Settings' }} />
              <Stack.Screen
                name="(tabs)/profile/settings/favorite-teams"
                options={{ title: 'Favorite Teams' }}
              />
              <Stack.Screen
                name="(tabs)/profile/settings/account-info"
                options={{ title: 'Account Info' }}
              />
              <Stack.Screen
                name="(tabs)/profile/settings/payment-methods"
                options={{ title: 'Payment Methods' }}
              />
              <Stack.Screen
                name="(tabs)/profile/settings/privacy-permissions"
                options={{ title: 'Privacy & Permissions' }}
              />
              <Stack.Screen
                name="(tabs)/profile/settings/app-theme"
                options={{ title: 'App Theme' }}
              />
              <Stack.Screen
                name="(tabs)/profile/settings/help-support"
                options={{ title: 'Help & Support' }}
              />
              <Stack.Screen
                name="(tabs)/profile/settings/terms-policies"
                options={{ title: 'Terms & Policies' }}
              />
            </Stack>
          </AppBackground>
        </ThemeProvider>
      </CartProvider>
    </PersistQueryClientProvider>
  );
}
