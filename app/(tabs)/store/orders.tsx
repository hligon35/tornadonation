import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function StoreOrdersScreen() {
  return (
    <Screen title="Orders">
      <Section title="History">
        <Card accessibilityLabel="Orders placeholder">
          <LabelText>Order history placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
