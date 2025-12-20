import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function CheckoutScreen() {
  return (
    <Screen title="Checkout">
      <Section title="Payment">
        <Card accessibilityLabel="Checkout placeholder">
          <LabelText>Apple Pay / Google Pay / Card payments placeholder.</LabelText>
          <LabelText>Stripe/Shopify wiring will be added later.</LabelText>
        </Card>
      </Section>

      <Section title="Fulfillment">
        <Card accessibilityLabel="Fulfillment placeholder">
          <LabelText>Shipping and fulfillment placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
