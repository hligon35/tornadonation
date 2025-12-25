import { Stack } from 'expo-router';

import { defaultTheme } from '@tornado-nation/ui';
import BrandHeaderTitle from '../../../components/BrandHeaderTitle';
import HeaderActions from '../../../components/HeaderActions';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: defaultTheme.colors.brandSecondary },
        headerTintColor: defaultTheme.colors.slate900,
        headerTitleStyle: { color: defaultTheme.colors.slate900 },
        headerRight: () => <HeaderActions />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
          headerTitle: () => <BrandHeaderTitle />,
        }}
      />
      <Stack.Screen name="passes" options={{ title: 'Passes', headerTitle: () => <BrandHeaderTitle /> }} />
      <Stack.Screen
        name="memberships"
        options={{ title: 'Memberships', headerTitle: () => <BrandHeaderTitle /> }}
      />
      <Stack.Screen name="orders" options={{ title: 'Orders', headerTitle: () => <BrandHeaderTitle /> }} />
      <Stack.Screen
        name="notifications"
        options={{ title: 'Notifications', headerTitle: () => <BrandHeaderTitle /> }}
      />
      <Stack.Screen name="settings" options={{ title: 'Settings', headerTitle: () => <BrandHeaderTitle /> }} />
    </Stack>
  );
}
