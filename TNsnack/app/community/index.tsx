import { Link } from 'expo-router';

import { Button, Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function CommunityScreen() {
  return (
    <Screen title="Community">
      <Section title="Fan Wall">
        <Card accessibilityLabel="Fan wall placeholder">
          <LabelText>Moderated posts and dedications placeholder.</LabelText>
        </Card>
      </Section>

      <Section title="Get Involved">
        <Link href="/community/volunteer" asChild>
          <Button label="Volunteer" hint="Open volunteer sign-ups" />
        </Link>
        <Link href="/community/donations" asChild>
          <Button label="Donations" hint="Open donations" />
        </Link>
        <Link href="/community/sponsors" asChild>
          <Button label="Sponsors" hint="Open sponsor info" />
        </Link>
      </Section>
    </Screen>
  );
}
