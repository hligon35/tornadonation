import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

const STORAGE_KEY = 'profile.notifications.v1';

type NotificationPrefs = {
  gameStartReminders: boolean;
  scoreUpdates: boolean;
  breakingNews: boolean;
};

const defaultPrefs: NotificationPrefs = {
  gameStartReminders: true,
  scoreUpdates: true,
  breakingNews: false,
};

function ToggleRow(props: {
  label: string;
  hint: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      onPress={props.onToggle}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <LabelText style={styles.rowLabel}>{props.label}</LabelText>
      <LabelText style={styles.rowValue}>{props.value ? 'On' : 'Off'}</LabelText>
    </Pressable>
  );
}

export default function ProfileNotificationsScreen() {
  const [prefs, setPrefs] = React.useState<NotificationPrefs>(defaultPrefs);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as Partial<NotificationPrefs>;
        const next: NotificationPrefs = {
          ...defaultPrefs,
          ...parsed,
        };
        if (!cancelled) setPrefs(next);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)).catch(() => undefined);
  }, [loaded, prefs]);

  return (
    <Screen>
      <Section title="Notification Preferences">
        <Card accessibilityLabel="Notification preferences" style={{ padding: 0 }}>
          <View style={{ padding: defaultTheme.spacing.md, gap: 0 }}>
            <ToggleRow
              label="Game start reminders"
              hint="Toggle game start reminders"
              value={prefs.gameStartReminders}
              onToggle={() => setPrefs((p) => ({ ...p, gameStartReminders: !p.gameStartReminders }))}
            />
            <View style={styles.divider} />
            <ToggleRow
              label="Score updates"
              hint="Toggle score updates"
              value={prefs.scoreUpdates}
              onToggle={() => setPrefs((p) => ({ ...p, scoreUpdates: !p.scoreUpdates }))}
            />
            <View style={styles.divider} />
            <ToggleRow
              label="Breaking news"
              hint="Toggle breaking news"
              value={prefs.breakingNews}
              onToggle={() => setPrefs((p) => ({ ...p, breakingNews: !p.breakingNews }))}
            />
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
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowLabel: {
    color: defaultTheme.colors.slate900,
    fontWeight: '700',
    flexShrink: 1,
    paddingRight: 12,
  },
  rowValue: {
    color: defaultTheme.colors.slate700,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: defaultTheme.colors.slate200,
  },
});

