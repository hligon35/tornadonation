import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function DonationsScreen() {
  return (
    <Screen title="Donations">
      <Section title="Fundraising">
        <Card accessibilityLabel="Donations placeholder">
          <LabelText>One-tap + recurring donations placeholder.</LabelText>
          <LabelText>Goal thermometer placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
