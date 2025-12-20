import { Link, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import { Button, Card, LabelText, Screen, Section } from '@tornado-nation/ui';

import { api } from '../../../../lib/api';

type Params = { productId: string };

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams<Params>();

  const productQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId),
    enabled: Boolean(productId),
  });

  const product = productQuery.data;

  return (
    <Screen title="Product">
      <Section title="Details">
        <Card accessibilityLabel="Product detail card">
          <LabelText>Product ID: {productId}</LabelText>
          {productQuery.isLoading ? <LabelText>Loading…</LabelText> : null}
          {productQuery.isError ? (
            <LabelText>Details placeholder until API is connected.</LabelText>
          ) : null}
          {product ? (
            <>
              <LabelText>{product.title}</LabelText>
              <LabelText>
                ${(product.priceCents / 100).toFixed(2)} {product.currency}
              </LabelText>
            </>
          ) : null}
        </Card>
      </Section>

      <Section title="Checkout">
        <Link href="/(tabs)/store/cart" asChild>
          <Button label="Add to Cart (Placeholder)" hint="Add item to cart" />
        </Link>
      </Section>
    </Screen>
  );
}
