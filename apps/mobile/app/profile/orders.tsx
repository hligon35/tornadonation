import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';
import { StyleSheet, View } from 'react-native';

export default function ProfileOrdersScreen() {
  return (
    <Screen>
      <Section title="Recent Orders">
        <Card accessibilityLabel="Order 1042" style={{ gap: 8 }}>
          <View style={styles.row}>
            <LabelText style={styles.title}>Order #1042</LabelText>
            <LabelText style={styles.pill}>Delivered</LabelText>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Placed</LabelText>
            <LabelText style={styles.value}>Oct 12, 2025</LabelText>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Total</LabelText>
            <LabelText style={styles.value}>$39.98</LabelText>
          </View>
        </Card>

        <Card accessibilityLabel="Order 1037" style={{ gap: 8 }}>
          <View style={styles.row}>
            <LabelText style={styles.title}>Order #1037</LabelText>
            <LabelText style={[styles.pill, { backgroundColor: defaultTheme.colors.slate200, color: defaultTheme.colors.slate900 }]}>Processing</LabelText>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Placed</LabelText>
            <LabelText style={styles.value}>Sep 28, 2025</LabelText>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Total</LabelText>
            <LabelText style={styles.value}>$24.00</LabelText>
          </View>
        </Card>
      </Section>

      <Section title="Notes">
        <Card accessibilityLabel="Orders note">
          <LabelText>Ticket and store purchases will appear here once checkout is connected.</LabelText>
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

