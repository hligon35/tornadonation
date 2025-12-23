import { Link, type Href } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

const passesIcon = require('../../../assets/navIcons/passes.png');
const membershipsIcon = require('../../../assets/navIcons/memberships.png');
const ordersIcon = require('../../../assets/navIcons/orders.png');
const notificationsIcon = require('../../../assets/navIcons/notifications.png');
const settingsIcon = require('../../../assets/navIcons/settings.png');

const FAVORITES_KEY = 'profile.favoriteSports.v1';

const favoriteSportOptions = [
  { id: 'football', name: 'Football' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'baseball', name: 'Baseball' },
  { id: 'softball', name: 'Softball' },
  { id: 'soccer', name: 'Soccer' },
  { id: 'volleyball', name: 'Volleyball' },
  { id: 'track', name: 'Track & Field' },
];

function OptionTile(props: {
  href: Href;
  title: string;
  hint: string;
  icon: number;
}) {
  return (
    <Link href={props.href} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={props.title}
        accessibilityHint={props.hint}
        style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
      >
        <View style={styles.tileContent}>
          <Image source={props.icon} resizeMode="contain" style={styles.tileIcon} />
        </View>
      </Pressable>
    </Link>
  );
}

export default function ProfileScreen() {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(FAVORITES_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')) {
          if (!cancelled) setFavoriteIds(parsed);
        }
      } catch {
        // Ignore corrupt storage.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const favoriteNames = favoriteSportOptions
    .filter((s) => favoriteIds.includes(s.id))
    .map((s) => s.name);

  return (
    <Screen>
      <Section title="Favorites">
        <Card accessibilityLabel="Favorite teams" style={{ gap: 8 }}>
          {favoriteNames.length ? (
            <LabelText>{favoriteNames.join(' • ')}</LabelText>
          ) : (
            <LabelText>No favorites selected yet.</LabelText>
          )}
          <Link href="/profile/settings/favorite-teams" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit favorite teams"
              style={({ pressed }) => ({
                alignSelf: 'flex-start',
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: defaultTheme.radius.md,
                backgroundColor: defaultTheme.colors.slate200,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <LabelText style={{ color: defaultTheme.colors.slate900, fontWeight: '700' }}>
                Edit favorites
              </LabelText>
            </Pressable>
          </Link>
        </Card>
      </Section>

      <Section title="Account">
        <View style={styles.grid}>
          <OptionTile href="/profile/passes" title="Passes" hint="View passes" icon={passesIcon} />
          <OptionTile
            href="/profile/memberships"
            title="Memberships"
            hint="View memberships"
            icon={membershipsIcon}
          />
          <OptionTile href="/profile/orders" title="Orders" hint="View store orders" icon={ordersIcon} />
          <OptionTile
            href="/profile/notifications"
            title="Notifications"
            hint="Notification preferences"
            icon={notificationsIcon}
          />
          <OptionTile href="/profile/settings" title="Settings" hint="App and account settings" icon={settingsIcon} />
        </View>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // Outer padding so tiles don't touch screen edges.
    paddingHorizontal: defaultTheme.spacing.md,
  },
  tile: {
    width: '46%',
    marginBottom: 64,
  },
  tilePressed: {
    opacity: 0.85,
  },
  tileContent: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  tileIcon: {
    width: 112,
    height: 112,
  },
});

