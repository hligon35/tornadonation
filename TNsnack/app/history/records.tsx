import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function HistoryRecordsScreen() {
  return (
    <Screen title="Records">
      <Section title="Interactive Records">
        <Card accessibilityLabel="Records placeholder">
          <LabelText>Filter by sport/year/athlete placeholder.</LabelText>
          <LabelText>Export CSV/PDF placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
