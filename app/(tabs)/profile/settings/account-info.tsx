import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';
import { StyleSheet, View } from 'react-native';

export default function AccountInfoSettingsScreen() {
  return (
    <Screen>
      <Section title="Profile">
        <Card accessibilityLabel="Account information" style={{ gap: 10 }}>
          <LabelText style={styles.title}>Not signed in</LabelText>
          <LabelText>Sign-in will be added later. For now, this screen shows local placeholders.</LabelText>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Name</LabelText>
            <LabelText style={styles.value}>—</LabelText>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Email</LabelText>
            <LabelText style={styles.value}>—</LabelText>
          </View>
          <View style={styles.row}>
            <LabelText style={styles.muted}>Phone</LabelText>
            <LabelText style={styles.value}>—</LabelText>
          </View>
        </Card>
      </Section>

      <Section title="App Data">
        <Card accessibilityLabel="App data note" style={{ gap: 8 }}>
          <LabelText>
            Some settings (favorites, notifications, privacy) are saved locally on this device.
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
    gap: 12,
  },
  title: {
    color: defaultTheme.colors.slate900,
    fontWeight: '800',
    fontSize: 16,
  },
  muted: {
    color: defaultTheme.colors.slate700,
    fontWeight: '700',
  },
  value: {
    color: defaultTheme.colors.slate900,
    fontWeight: '700',
  },
});

