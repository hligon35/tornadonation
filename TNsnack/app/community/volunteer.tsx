import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function VolunteerScreen() {
  return (
    <Screen title="Volunteer">
      <Section title="Sign-ups">
        <Card accessibilityLabel="Volunteer sign-ups placeholder">
          <LabelText>Volunteer operations sign-ups placeholder.</LabelText>
          <LabelText>Reminders placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
