import { useLocalSearchParams } from 'expo-router';

import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

type Params = { sportId: string; seasonId: string };

export default function TeamRecordsScreen() {
  const { sportId, seasonId } = useLocalSearchParams<Params>();

  return (
    <Screen title="Team Records">
      <Section title="Interactive Records">
        <Card accessibilityLabel="Records placeholder">
          <LabelText>
            Sport: {sportId} • Season: {seasonId}
          </LabelText>
          <LabelText>Filter/export (CSV/PDF) placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
