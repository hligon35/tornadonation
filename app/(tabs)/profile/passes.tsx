import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';
import { StyleSheet, View } from 'react-native';

export default function ProfilePassesScreen() {
  return (
    <Screen>
      <Section title="My Passes">
        <Card accessibilityLabel="All sports pass" style={{ gap: 10 }}>
          <View style={styles.row}>
            <LabelText style={styles.title}>All-Sports Pass</LabelText>
            <LabelText style={styles.pill}>Active</LabelText>
          </View>
          <LabelText>Valid for home games and tournaments.</LabelText>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Expires</LabelText>
            <LabelText style={styles.value}>May 31, 2026</LabelText>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Entry Code</LabelText>
            <LabelText style={styles.value}>TN-ALL-2026</LabelText>
          </View>
          <LabelText style={styles.muted}>Show this code at the gate (QR coming soon).</LabelText>
        </Card>

        <Card accessibilityLabel="Student pass" style={{ gap: 10 }}>
          <View style={styles.row}>
            <LabelText style={styles.title}>Student Pass</LabelText>
            <LabelText style={[styles.pill, { backgroundColor: defaultTheme.colors.slate200 }]}>Not linked</LabelText>
          </View>
          <LabelText>Link your student account to activate student entry.</LabelText>
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
    color: defaultTheme.colors.slate900,
    fontWeight: '800',
    backgroundColor: defaultTheme.colors.brandSecondary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: defaultTheme.radius.md,
    overflow: 'hidden',
  },
});

