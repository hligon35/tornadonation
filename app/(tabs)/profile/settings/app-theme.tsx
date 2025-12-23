import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

const STORAGE_KEY = 'profile.themePreference.v1';

type ThemeChoice = 'system' | 'light' | 'dark';

const options: Array<{ id: ThemeChoice; label: string; hint: string }> = [
  { id: 'system', label: 'System', hint: 'Follow system setting' },
  { id: 'light', label: 'Light', hint: 'Always use light mode' },
  { id: 'dark', label: 'Dark', hint: 'Always use dark mode' },
];

export default function AppThemeSettingsScreen() {
  const [choice, setChoice] = React.useState<ThemeChoice>('system');
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw === 'system' || raw === 'light' || raw === 'dark') {
          if (!cancelled) setChoice(raw);
        }
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
    AsyncStorage.setItem(STORAGE_KEY, choice).catch(() => undefined);
  }, [choice, loaded]);

  return (
    <Screen>
      <Section title="Theme">
        <Card accessibilityLabel="Theme selection" style={{ padding: 0 }}>
          <View style={{ paddingHorizontal: defaultTheme.spacing.md }}>
            {options.map((opt, idx) => {
              const selected = choice === opt.id;
              return (
                <View key={opt.id}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={opt.label}
                    accessibilityHint={opt.hint}
                    onPress={() => setChoice(opt.id)}
                    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                  >
                    <View style={styles.rowLeft}>
                      <Ionicons
                        name={selected ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={selected ? defaultTheme.colors.brandSecondary : defaultTheme.colors.slate500}
                      />
                      <LabelText style={styles.rowLabel}>{opt.label}</LabelText>
                    </View>
                    {selected ? (
                      <LabelText style={styles.rowValue}>Selected</LabelText>
                    ) : (
                      <LabelText style={styles.rowValue}> </LabelText>
                    )}
                  </Pressable>
                  {idx === options.length - 1 ? null : <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        </Card>
      </Section>

      <Section title="Note">
        <Card accessibilityLabel="Theme note" style={{ gap: 8 }}>
          <LabelText>
            Theme switching will apply once the app’s UI theming is wired end-to-end.
          </LabelText>
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
  },
  rowLabel: {
    color: defaultTheme.colors.slate900,
    fontWeight: '800',
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

