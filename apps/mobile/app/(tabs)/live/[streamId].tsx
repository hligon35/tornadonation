import { useLocalSearchParams } from 'expo-router';
import { Switch } from 'react-native';
import { useState } from 'react';

import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

type Params = { streamId: string };

export default function StreamDetailScreen() {
  const { streamId } = useLocalSearchParams<Params>();
  const [audioOnly, setAudioOnly] = useState(false);

  return (
    <Screen title="Stream">
      <Section title="Player">
        <Card accessibilityLabel="Stream player placeholder">
          <LabelText>Stream ID: {streamId}</LabelText>
          <LabelText>Player embed placeholder.</LabelText>
        </Card>
      </Section>

      <Section title="Audio Only">
        <Card accessibilityLabel="Audio only toggle">
          <LabelText>Use audio-only fallback when video is unavailable.</LabelText>
          <Switch
            accessibilityLabel="Toggle audio-only"
            value={audioOnly}
            onValueChange={setAudioOnly}
          />
        </Card>
      </Section>

      <Section title="Compliance">
        <Card accessibilityLabel="Media rights compliance placeholder">
          <LabelText>Media rights compliance checks placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
