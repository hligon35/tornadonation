import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';
import { View } from 'react-native';

export default function TermsPoliciesSettingsScreen() {
  return (
    <Screen>
      <Section title="Legal">
        <Card accessibilityLabel="Terms and policies" style={{ gap: 10 }}>
          <LabelText style={{ color: defaultTheme.colors.slate900, fontWeight: '800', fontSize: 16 }}>
            Documents
          </LabelText>
          <LabelText>• Terms of Service</LabelText>
          <LabelText>• Privacy Policy</LabelText>
          <LabelText>• Code of Conduct</LabelText>
          <View style={{ height: 1, backgroundColor: defaultTheme.colors.slate200 }} />
          <LabelText style={{ color: defaultTheme.colors.slate700, fontWeight: '700' }}>
            Last updated dates will appear once legal pages are connected.
          </LabelText>
        </Card>
      </Section>
    </Screen>
  );
}

