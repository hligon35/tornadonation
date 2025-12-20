import { useLocalSearchParams } from 'expo-router';

import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

type Params = { sportId: string; seasonId: string };

export default function TeamMediaScreen() {
  const { sportId, seasonId } = useLocalSearchParams<Params>();

  return (
    <Screen title="Team Media">
      <Section title="Galleries">
        <Card accessibilityLabel="Media placeholder">
          <LabelText>
            Sport: {sportId} • Season: {seasonId}
          </LabelText>
          <LabelText>Photos/videos galleries placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
