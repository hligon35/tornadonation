import { Link } from 'expo-router';
import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, LabelText, defaultTheme } from '@tornado-nation/ui';

import { useCart } from '../lib/store/cart-context';

const accountIcon: ImageSourcePropType = require('../assets/navIcons/account.png');
const cartIcon: ImageSourcePropType = require('../assets/navIcons/cart.png');

function formatMoney(priceCents: number, currency: string) {
  return `${(priceCents / 100).toFixed(2)} ${currency}`;
}

export default function HeaderActions() {
  const cart = useCart();
  const insets = useSafeAreaInsets();
  const [cartOpen, setCartOpen] = React.useState(false);

  const closeCart = React.useCallback(() => setCartOpen(false), []);
  const toggleCart = React.useCallback(() => setCartOpen((prev) => !prev), []);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open cart"
        onPress={toggleCart}
        hitSlop={10}
        style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.6 : 1 }]}
      >
        <Image source={cartIcon} resizeMode="contain" style={styles.icon} />
      </Pressable>

      <Link href="/profile" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open profile"
          hitSlop={10}
          style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Image source={accountIcon} resizeMode="contain" style={styles.icon} />
        </Pressable>
      </Link>

      <Modal visible={cartOpen} transparent animationType="fade" onRequestClose={closeCart}>
        <Pressable accessibilityRole="button" style={styles.backdrop} onPress={closeCart}>
          <View
            pointerEvents="box-none"
            style={[
              styles.dropdownAnchor,
              {
                top: insets.top + 56,
              },
            ]}
          >
            <Pressable
              accessibilityRole="summary"
              accessibilityLabel="Cart dropdown"
              onPress={() => {
                // Swallow presses so backdrop doesn't trigger.
              }}
              style={styles.dropdownPressable}
            >
              <Card style={styles.dropdownCard}>
                <LabelText style={styles.dropdownTitle}>Cart</LabelText>

                {cart.items.length === 0 ? (
                  <LabelText>Your cart is empty.</LabelText>
                ) : (
                  <View style={{ gap: 6 }}>
                    <LabelText>
                      Items: {cart.itemCount} • Total: {formatMoney(cart.totalCents, cart.currency)}
                    </LabelText>
                    <LabelText style={{ fontSize: 12 }}>
                      {cart.items[0]?.title}
                      {cart.items.length > 1 ? ` +${cart.items.length - 1} more` : ''}
                    </LabelText>
                  </View>
                )}

                <View style={styles.dropdownActionsRow}>
                  <Link href="/(tabs)/store/checkout" asChild>
                    <Button
                      label="Checkout"
                      hint="Proceed to checkout"
                      disabled={cart.items.length === 0}
                      onPress={closeCart}
                    />
                  </Link>
                </View>
              </Card>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    gap: 10,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  icon: {
    width: 40,
    height: 40,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownAnchor: {
    position: 'absolute',
    right: 12,
    left: 12,
    alignItems: 'flex-end',
  },
  dropdownPressable: {
    maxWidth: 270,
    width: '100%',
  },
  dropdownCard: {
    gap: 10,
    padding: defaultTheme.spacing.md,
    borderColor: defaultTheme.colors.slate200,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  dropdownActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
