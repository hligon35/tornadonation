import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'PROFILE' }} />
      <Stack.Screen name="passes" options={{ title: 'Passes' }} />
      <Stack.Screen name="memberships" options={{ title: 'Memberships' }} />
      <Stack.Screen name="orders" options={{ title: 'Orders' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />

      <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
      <Stack.Screen name="settings/favorite-teams" options={{ title: 'Favorite Teams' }} />
      <Stack.Screen name="settings/account-info" options={{ title: 'Account Info' }} />
      <Stack.Screen name="settings/payment-methods" options={{ title: 'Payment Methods' }} />
      <Stack.Screen name="settings/privacy-permissions" options={{ title: 'Privacy & Permissions' }} />
      <Stack.Screen name="settings/app-theme" options={{ title: 'App Theme' }} />
      <Stack.Screen name="settings/help-support" options={{ title: 'Help & Support' }} />
      <Stack.Screen name="settings/terms-policies" options={{ title: 'Terms & Policies' }} />
    </Stack>
  );
}
