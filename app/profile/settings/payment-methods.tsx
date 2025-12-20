import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';
import { View } from 'react-native';

export default function PaymentMethodsSettingsScreen() {
  return (
    <Screen>
      <Section title="Payments">
        <Card accessibilityLabel="Saved payment methods" style={{ gap: 10 }}>
          <LabelText style={{ color: defaultTheme.colors.slate900, fontWeight: '800', fontSize: 16 }}>
            No saved payment methods
          </LabelText>
          <LabelText>
            Saved cards will appear here after checkout is connected.
          </LabelText>
          <View style={{ height: 1, backgroundColor: defaultTheme.colors.slate200 }} />
          <LabelText style={{ color: defaultTheme.colors.slate700, fontWeight: '700' }}>
            Tip: You can still browse the Store tab and view products.
          </LabelText>
        </Card>
      </Section>
    </Screen>
  );
}

