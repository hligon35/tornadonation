import { Link } from 'expo-router';

import { Button, Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function HistoryTimelineScreen() {
  return (
    <Screen title="History">
      <Section title="Athletics History & Legacy">
        <Card accessibilityLabel="Dynamic timeline placeholder">
          <LabelText>Dynamic timeline (seasons, championships, records) placeholder.</LabelText>
          <LabelText>Story spotlights + sponsor overlays placeholder.</LabelText>
        </Card>
      </Section>

      <Section title="Explore">
        <Link href="/history/hall-of-fame" asChild>
          <Button label="Hall of Fame" hint="Open hall of fame" />
        </Link>
        <Link href="/history/gallery" asChild>
          <Button label="Gallery" hint="Open gallery" />
        </Link>
        <Link href="/history/records" asChild>
          <Button label="Records" hint="Open records" />
        </Link>
      </Section>
    </Screen>
  );
}
