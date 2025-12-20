import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Button, Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

import { useCart } from '../../../lib/store/cart-context';

function formatMoney(priceCents: number, currency: string) {
  return `${(priceCents / 100).toFixed(2)} ${currency}`;
}

export default function CartScreen() {
  const cart = useCart();

  return (
    <Screen title="Cart">
      <Section title="Items">
        {cart.items.length === 0 ? (
          <Card accessibilityLabel="Empty cart">
            <LabelText>Your cart is empty.</LabelText>
          </Card>
        ) : null}

        {cart.items.map((item) => (
          <Card key={item.key} accessibilityLabel={`${item.title} cart item`} style={{ gap: 10 }}>
            <LabelText>{item.title}</LabelText>
            {item.size ? <LabelText style={{ fontSize: 12 }}>Size: {item.size}</LabelText> : null}
            {item.color ? <LabelText style={{ fontSize: 12 }}>Color: {item.color}</LabelText> : null}
            <LabelText style={{ fontSize: 12 }}>
              {formatMoney(item.priceCents, item.currency)}
            </LabelText>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Decrease quantity"
                  disabled={item.quantity <= 1}
                  onPress={() => cart.setQuantity(item.key, Math.max(1, item.quantity - 1))}
                  style={({ pressed }) => ({
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: defaultTheme.colors.slate200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: defaultTheme.colors.white,
                    opacity: item.quantity <= 1 ? 0.4 : pressed ? 0.8 : 1,
                  })}
                >
                  <LabelText>-</LabelText>
                </Pressable>

                <LabelText style={{ fontSize: 12 }}>Qty {item.quantity}</LabelText>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Increase quantity"
                  onPress={() => cart.setQuantity(item.key, item.quantity + 1)}
                  style={({ pressed }) => ({
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: defaultTheme.colors.slate200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: defaultTheme.colors.white,
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <LabelText>+</LabelText>
                </Pressable>
              </View>

              <Button label="Remove" hint="Remove item from cart" onPress={() => cart.removeItem(item.key)} />
            </View>
          </Card>
        ))}
      </Section>

      <Section title="Checkout">
        {cart.items.length > 0 ? (
          <Card accessibilityLabel="Order summary" style={{ gap: 6 }}>
            <LabelText>
              Subtotal: {formatMoney(cart.totalCents, cart.currency)}
            </LabelText>
            <LabelText style={{ fontSize: 12 }}>Tax/shipping placeholders.</LabelText>
          </Card>
        ) : null}

        {cart.items.length > 0 ? (
          <Button label="Clear Cart" hint="Remove all items" onPress={() => cart.clear()} />
        ) : null}

        <Link href="/(tabs)/store/checkout" asChild>
          <Button label="Checkout" hint="Proceed to checkout" disabled={cart.items.length === 0} />
        </Link>
      </Section>
    </Screen>
  );
}
