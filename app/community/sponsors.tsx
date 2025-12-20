import { useQuery } from '@tanstack/react-query';

import type { Sponsor } from '@tornado-nation/shared';
import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

import { api } from '@/lib/api';

const fallbackSponsors: Sponsor[] = [{ id: 's-1', name: 'Sponsor (Placeholder)' }];

export default function SponsorsScreen() {
  const sponsorsQuery = useQuery({
    queryKey: ['sponsors'],
    queryFn: api.listSponsors,
  });

  const sponsors = sponsorsQuery.data ?? fallbackSponsors;

  return (
    <Screen title="Sponsors">
      <Section title="Placements">
        <Card accessibilityLabel="Sponsor placements placeholder">
          <LabelText>Placements: hero, stream bumpers, takeovers.</LabelText>
          <LabelText>Attribution: clicks, coupons, QR, reports placeholder.</LabelText>
        </Card>
      </Section>

      <Section title="Current Sponsors">
        {sponsorsQuery.isLoading ? <LabelText>Loading…</LabelText> : null}
        {sponsorsQuery.isError ? <LabelText>API unavailable; showing placeholders.</LabelText> : null}
        {sponsors.map((s) => (
          <Card key={s.id} accessibilityLabel={`${s.name} sponsor card`}>
            <LabelText>{s.name}</LabelText>
            {s.promoCode ? <LabelText>Promo code: {s.promoCode}</LabelText> : null}
          </Card>
        ))}
      </Section>
    </Screen>
  );
}
