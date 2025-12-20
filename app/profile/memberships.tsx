import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';
import { StyleSheet, View } from 'react-native';

export default function ProfileMembershipsScreen() {
  return (
    <Screen>
      <Section title="Status">
        <Card accessibilityLabel="Membership status" style={{ gap: 10 }}>
          <View style={styles.row}>
            <LabelText style={styles.title}>Tornado Club</LabelText>
            <LabelText style={styles.pill}>Active</LabelText>
          </View>
          <LabelText>Support the program and unlock member perks.</LabelText>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Renewal</LabelText>
            <LabelText style={styles.value}>Aug 1, 2026</LabelText>
          </View>
        </Card>
      </Section>

      <Section title="Perks">
        <Card accessibilityLabel="Membership perks" style={{ gap: 8 }}>
          <LabelText>• Early access to tickets</LabelText>
          <LabelText>• Member-only announcements</LabelText>
          <LabelText>• Discounts at select events</LabelText>
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
    gap: 12,
  },
  title: {
    color: defaultTheme.colors.slate900,
    fontWeight: '800',
    fontSize: 16,
  },
  muted: {
    color: defaultTheme.colors.slate700,
    fontWeight: '600',
  },
  value: {
    color: defaultTheme.colors.slate900,
    fontWeight: '700',
  },
  pill: {
    color: defaultTheme.colors.white,
    fontWeight: '800',
    backgroundColor: defaultTheme.colors.brandSecondary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: defaultTheme.radius.md,
    overflow: 'hidden',
  },
});

