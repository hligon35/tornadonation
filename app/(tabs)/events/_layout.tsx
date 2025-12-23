import { Link, Stack } from 'expo-router';
import { Image, Pressable } from 'react-native';

import { defaultTheme } from '@tornado-nation/ui';
import BrandHeaderTitle from '../../../components/BrandHeaderTitle';

const accountIcon = require('../../../assets/navIcons/account.png');

export default function EventsLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: defaultTheme.colors.brandSecondary },
        headerTintColor: defaultTheme.colors.slate900,
        headerTitleStyle: { color: defaultTheme.colors.slate900 },
        headerRight: () => (
          <Link href="/profile" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              hitSlop={10}
              style={{ paddingHorizontal: 12 }}
            >
              {({ pressed }) => (
                <Image
                  source={accountIcon}
                  resizeMode="contain"
                  style={{ width: 40, height: 40, opacity: pressed ? 0.6 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
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
