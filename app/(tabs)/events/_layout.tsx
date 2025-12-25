import { Stack } from 'expo-router';

import { defaultTheme } from '@tornado-nation/ui';
import BrandHeaderTitle from '../../../components/BrandHeaderTitle';
import HeaderActions from '../../../components/HeaderActions';

export default function EventsLayout() {
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
          title: 'Events',
          headerTitle: () => <BrandHeaderTitle />,
        }}
      />
    </Stack>
  );
}
