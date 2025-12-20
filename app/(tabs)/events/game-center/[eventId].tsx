import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

import { api } from '../../../../lib/api';

type Params = { eventId: string };

export default function GameCenterScreen() {
  const { eventId } = useLocalSearchParams<Params>();

  const eventQuery = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => api.getEvent(eventId),
    enabled: Boolean(eventId),
  });

  const eventItem = eventQuery.data;

  return (
    <Screen title="Game Center">
      <Section title="Match Details">
        <Card accessibilityLabel="Game center details">
          <LabelText>Event ID: {eventId}</LabelText>
          {eventQuery.isLoading ? <LabelText>Loading…</LabelText> : null}
          {eventQuery.isError ? (
            <LabelText>Details placeholder until API is connected.</LabelText>
          ) : null}
          {eventItem ? <LabelText>{eventItem.title}</LabelText> : null}
        </Card>
      </Section>

      <Section title="Maps / Parking">
        <Card accessibilityLabel="Maps and parking placeholder">
          <LabelText>Maps and parking info placeholder.</LabelText>
        </Card>
      </Section>

      <Section title="Live Scores / Stats">
        <Card accessibilityLabel="Live scores placeholder">
          <LabelText>Live scoring and stats placeholder.</LabelText>
        </Card>
      </Section>

      <Section title="Tickets">
        <Card accessibilityLabel="Ticketing placeholder">
          <LabelText>In-app purchase + QR entry placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
