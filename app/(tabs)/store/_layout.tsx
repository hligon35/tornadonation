import { Stack } from 'expo-router';

import CartProvider from '../../../lib/store/cart-context';

export default function StoreLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
