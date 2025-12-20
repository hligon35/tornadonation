import { Link } from 'expo-router';

import { Button, Screen, Section } from '@tornado-nation/ui';

export default function ProfileSettingsScreen() {
  return (
    <Screen>
      <Section title="Account">
        <Link href="/profile/settings/favorite-teams" asChild>
          <Button label="Favorite Teams" hint="Choose favorites" />
        </Link>
        <Link href="/profile/settings/account-info" asChild>
          <Button label="Account Info" hint="Manage account information" />
        </Link>
      </Section>

      <Section title="App">
        <Link href="/profile/settings/payment-methods" asChild>
          <Button label="Payment Methods" hint="Manage payment methods" />
        </Link>
        <Link href="/profile/settings/privacy-permissions" asChild>
          <Button label="Privacy & Permissions" hint="Manage privacy" />
        </Link>
        <Link href="/profile/settings/app-theme" asChild>
          <Button label="App Theme" hint="Light / dark / system" />
        </Link>
        <Link href="/profile/settings/help-support" asChild>
          <Button label="Help & Support" hint="Get help" />
        </Link>
      </Section>

      <Section title="Legal">
        <Link href="/profile/settings/terms-policies" asChild>
          <Button label="Terms & Policies" hint="View terms" />
        </Link>
      </Section>
    </Screen>
  );
}

