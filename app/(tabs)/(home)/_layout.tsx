import { Stack } from 'expo-router';

import { defaultTheme } from '@tornado-nation/ui';
import BrandHeaderTitle from '../../../components/BrandHeaderTitle';
import HeaderActions from '../../../components/HeaderActions';

export default function HomeTabLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: defaultTheme.colors.brandSecondary },
        headerTintColor: defaultTheme.colors.slate900,
        headerTitleStyle: { color: defaultTheme.colors.slate900 },
        headerTitle: () => <BrandHeaderTitle />,
        headerRight: () => <HeaderActions />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
