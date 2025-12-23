import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';
import { View } from 'react-native';

export default function HelpSupportSettingsScreen() {
  return (
    <Screen>
      <Section title="Support">
        <Card accessibilityLabel="Help and support" style={{ gap: 10 }}>
          <LabelText style={{ color: defaultTheme.colors.slate900, fontWeight: '800', fontSize: 16 }}>
            Frequently Asked
          </LabelText>
          <LabelText>• How do I find my team schedule?</LabelText>
          <LabelText>• Where do I see tickets or passes?</LabelText>
          <LabelText>• How do favorites work?</LabelText>
          <View style={{ height: 1, backgroundColor: defaultTheme.colors.slate200 }} />
          <LabelText style={{ color: defaultTheme.colors.slate900, fontWeight: '800', fontSize: 16 }}>
            Contact
          </LabelText>
          <LabelText>Email: support@tornadonation.example</LabelText>
          <LabelText>Hours: Mon–Fri 9am–5pm</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}

