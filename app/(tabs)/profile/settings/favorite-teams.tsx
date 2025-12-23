import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

const STORAGE_KEY = 'profile.favoriteSports.v1';

const favoriteSportOptions = [
  { id: 'football', name: 'Football' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'baseball', name: 'Baseball' },
  { id: 'softball', name: 'Softball' },
  { id: 'soccer', name: 'Soccer' },
  { id: 'volleyball', name: 'Volleyball' },
  { id: 'track', name: 'Track & Field' },
];

function ToggleRow(props: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.label}
      accessibilityHint={props.value ? 'Remove from favorites' : 'Add to favorites'}
      onPress={props.onToggle}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.rowLeft}>
        <Ionicons
          name={props.value ? 'checkmark-circle' : 'ellipse-outline'}
          size={22}
          color={props.value ? defaultTheme.colors.brandSecondary : defaultTheme.colors.slate500}
        />
        <LabelText style={styles.rowLabel}>{props.label}</LabelText>
      </View>
      <LabelText style={styles.rowValue}>{props.value ? 'Selected' : 'Tap to add'}</LabelText>
    </Pressable>
  );
}

export default function FavoriteTeamsSettingsScreen() {
  const [ids, setIds] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')) {
          if (!cancelled) setIds(parsed);
        }
      } catch {
        // Ignore corrupt storage.
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch(() => undefined);
  }, [loaded, ids]);

  const selectedCount = ids.length;

  return (
    <Screen>
      <Section title="Teams">
        <Card accessibilityLabel="Favorite teams" style={{ padding: 0 }}>
          <View style={{ padding: defaultTheme.spacing.md }}>
            <LabelText style={{ color: defaultTheme.colors.slate900, fontWeight: '800' }}>
              {selectedCount ? `${selectedCount} selected` : 'None selected'}
            </LabelText>
          </View>
          <View style={styles.divider} />
          <View style={{ paddingHorizontal: defaultTheme.spacing.md }}>
            {favoriteSportOptions.map((sport, idx) => {
              const selected = ids.includes(sport.id);
              return (
                <View key={sport.id}>
                  <ToggleRow
                    label={sport.name}
                    value={selected}
                    onToggle={() =>
                      setIds((prev) =>
                        prev.includes(sport.id)
                          ? prev.filter((id) => id !== sport.id)
                          : [...prev, sport.id],
                      )
                    }
                  />
                  {idx === favoriteSportOptions.length - 1 ? null : <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        </Card>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 12,
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  rowLabel: {
    color: defaultTheme.colors.slate900,
    fontWeight: '800',
    flexShrink: 1,
  },
  rowValue: {
    color: defaultTheme.colors.slate700,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: defaultTheme.colors.slate200,
  },
});

