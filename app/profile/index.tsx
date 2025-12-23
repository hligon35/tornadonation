import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, type Href } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

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
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Link href={props.href} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={props.title}
        accessibilityHint={props.hint}
        style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
      >
        <Card style={styles.tileCard}>
          <Ionicons name={props.icon} size={34} color={defaultTheme.colors.slate900} />
          <LabelText
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            ellipsizeMode="tail"
            style={styles.tileLabel}
          >
            {props.title}
          </LabelText>
        </Card>
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
          <OptionTile href="/profile/passes" title="Passes" hint="View passes" icon="ticket-outline" />
          <OptionTile
            href="/profile/memberships"
            title="Memberships"
            hint="View memberships"
            icon="id-card-outline"
          />
          <OptionTile href="/profile/orders" title="Orders" hint="View store orders" icon="receipt-outline" />
          <OptionTile
            href="/profile/notifications"
            title="Notifications"
            hint="Notification preferences"
            icon="notifications-outline"
          />
          <OptionTile href="/profile/settings" title="Settings" hint="App and account settings" icon="settings-outline" />
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
    gap: defaultTheme.spacing.md,
    // Reclaim some of the Screen padding so tiles render wider.
    marginHorizontal: -defaultTheme.spacing.md,
  },
  tile: {
    width: '49%',
  },
  tilePressed: {
    opacity: 0.85,
  },
  tileCard: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    // Slightly taller than wide to feel "bigger" while staying square-ish.
    aspectRatio: 0.85,
    paddingVertical: defaultTheme.spacing.xl + defaultTheme.spacing.sm,
    paddingHorizontal: defaultTheme.spacing.xl + defaultTheme.spacing.sm,
  },
  tileLabel: {
    color: defaultTheme.colors.slate900,
    fontWeight: '700',
    textAlign: 'center',
    flexShrink: 1,
    fontSize: 18,
  },
});

