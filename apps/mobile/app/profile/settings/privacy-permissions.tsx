import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

const STORAGE_KEY = 'profile.privacy.v1';

type PrivacyPrefs = {
  analytics: boolean;
  marketing: boolean;
  locationForVenues: boolean;
};

const defaultPrefs: PrivacyPrefs = {
  analytics: true,
  marketing: false,
  locationForVenues: true,
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

export default function PrivacyPermissionsSettingsScreen() {
  const [prefs, setPrefs] = React.useState<PrivacyPrefs>(defaultPrefs);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as Partial<PrivacyPrefs>;
        const next: PrivacyPrefs = {
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
      <Section title="Privacy">
        <Card accessibilityLabel="Privacy and permissions" style={{ padding: 0 }}>
          <View style={{ padding: defaultTheme.spacing.md, gap: 0 }}>
            <ToggleRow
              label="Analytics"
              hint="Toggle anonymous analytics"
              value={prefs.analytics}
              onToggle={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
            />
            <View style={styles.divider} />
            <ToggleRow
              label="Marketing updates"
              hint="Toggle marketing updates"
              value={prefs.marketing}
              onToggle={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
            />
            <View style={styles.divider} />
            <ToggleRow
              label="Location for venues"
              hint="Toggle location use for venue directions"
              value={prefs.locationForVenues}
              onToggle={() => setPrefs((p) => ({ ...p, locationForVenues: !p.locationForVenues }))}
            />
          </View>
        </Card>
      </Section>

      <Section title="Notes">
        <Card accessibilityLabel="Privacy note" style={{ gap: 8 }}>
          <LabelText>
            These toggles control local preferences only. OS-level permissions can be changed in device Settings.
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
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowLabel: {
    color: defaultTheme.colors.slate900,
    fontWeight: '800',
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

