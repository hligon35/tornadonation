import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function HallOfFameScreen() {
  return (
    <Screen title="Hall of Fame">
      <Section title="Alumni / Inductees">
        <Card accessibilityLabel="Hall of fame placeholder">
          <LabelText>Hall of fame list placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
