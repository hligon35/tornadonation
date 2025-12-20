import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';

import type { Product } from '@tornado-nation/shared';
import { Button, Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

import { api } from '../../../lib/api';
import { useCart } from '../../../lib/store/cart-context';

type StoreProductMeta = {
  description: string;
  image: any;
  sizes?: string[];
  colors?: string[];
};

type StoreProductView = Product & StoreProductMeta;

const productMetaById: Record<string, StoreProductMeta> = {
  tee: {
    description: 'Soft cotton tee with Tornado Nation front print.',
    image: require('../../../assets/team-tiles/football.png'),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
  },
  hat: {
    description: 'Classic adjustable hat with embroidered logo.',
    image: require('../../../assets/team-tiles/baseball.png'),
    colors: ['Black', 'White'],
  },
  hoodie: {
    description: 'Warm hoodie for game nights and travel days.',
    image: require('../../../assets/team-tiles/basketball.png'),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
  },
  sticker: {
    description: 'Weatherproof sticker for bottles, laptops, and lockers.',
    image: require('../../../assets/team-tiles/generic.png'),
  },
};

const fallbackProducts: Product[] = [
  { id: 'tee', title: 'Tornado Tee (Placeholder)', priceCents: 2500, currency: 'USD', inStock: true },
  { id: 'hat', title: 'Tornado Hat (Placeholder)', priceCents: 2000, currency: 'USD', inStock: true },
  { id: 'hoodie', title: 'Tornado Hoodie (Placeholder)', priceCents: 4500, currency: 'USD', inStock: true },
  { id: 'sticker', title: 'Tornado Sticker Pack (Placeholder)', priceCents: 800, currency: 'USD', inStock: true },
];

function formatMoney(priceCents: number, currency: string) {
  return `${(priceCents / 100).toFixed(2)} ${currency}`;
}

function OptionPill(props: {
  label: string;
  selected: boolean;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel}
      onPress={props.onPress}
      style={({ pressed }) => ({
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: defaultTheme.colors.slate200,
        backgroundColor: props.selected ? defaultTheme.colors.slate200 : defaultTheme.colors.white,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <LabelText style={{ fontSize: 12 }}>{props.label}</LabelText>
    </Pressable>
  );
}

function QuantityStepper(props: {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
  accessibilityLabel: string;
}) {
  const minusDisabled = props.disabled || props.quantity <= 1;
  const plusDisabled = props.disabled;

  return (
    <View accessibilityLabel={props.accessibilityLabel} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        disabled={minusDisabled}
        onPress={() => props.onChange(Math.max(1, props.quantity - 1))}
        style={({ pressed }) => ({
          width: 28,
          height: 28,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: defaultTheme.colors.slate200,
          backgroundColor: defaultTheme.colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: minusDisabled ? 0.4 : pressed ? 0.8 : 1,
        })}
      >
        <LabelText>-</LabelText>
      </Pressable>

      <LabelText style={{ fontSize: 12 }}>Qty {props.quantity}</LabelText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        disabled={plusDisabled}
        onPress={() => props.onChange(props.quantity + 1)}
        style={({ pressed }) => ({
          width: 28,
          height: 28,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: defaultTheme.colors.slate200,
          backgroundColor: defaultTheme.colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: plusDisabled ? 0.4 : pressed ? 0.8 : 1,
        })}
      >
        <LabelText>+</LabelText>
      </Pressable>
    </View>
  );
}

function ProductTile(props: { product: StoreProductView }) {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(props.product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(props.product.colors?.[0]);

  const disabled = !props.product.inStock;

  return (
    <Card
      accessibilityLabel={`${props.product.title} product tile`}
      style={{ flex: 1, minHeight: 460 }}
    >
      <View style={{ flex: 1, justifyContent: 'space-between', gap: 8 }}>
        <View style={{ gap: 8 }}>
          <View
            accessibilityLabel={`${props.product.title} image`}
            style={{
              width: '100%',
              aspectRatio: 1,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: defaultTheme.colors.slate200,
              borderWidth: 1,
              borderColor: defaultTheme.colors.slate200,
            }}
          >
            <Image
              source={props.product.image}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <View style={{ gap: 5 }}>
            <LabelText numberOfLines={1}>{props.product.title}</LabelText>
            <LabelText style={{ fontSize: 12 }} numberOfLines={2}>
              {props.product.description}
            </LabelText>
            <LabelText style={{ fontSize: 12 }}>
              {formatMoney(props.product.priceCents, props.product.currency)}
            </LabelText>
          </View>

          {props.product.sizes?.length ? (
            <View style={{ gap: 6 }}>
              <LabelText style={{ fontSize: 12 }}>Size</LabelText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {props.product.sizes.map((size) => (
                  <OptionPill
                    key={size}
                    label={size}
                    selected={size === selectedSize}
                    onPress={() => setSelectedSize(size)}
                    accessibilityLabel={`${props.product.title} size ${size}`}
                  />
                ))}
              </View>
            </View>
          ) : null}

          {props.product.colors?.length ? (
            <View style={{ gap: 6 }}>
              <LabelText style={{ fontSize: 12 }}>Color</LabelText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {props.product.colors.map((color) => (
                  <OptionPill
                    key={color}
                    label={color}
                    selected={color === selectedColor}
                    onPress={() => setSelectedColor(color)}
                    accessibilityLabel={`${props.product.title} color ${color}`}
                  />
                ))}
              </View>
            </View>
          ) : null}
        </View>

        <View style={{ gap: 8 }}>
          <QuantityStepper
            quantity={quantity}
            onChange={setQuantity}
            disabled={disabled}
            accessibilityLabel={`${props.product.title} quantity`}
          />

          <Button
            label={disabled ? 'Out of Stock' : 'Add to Cart'}
            hint="Add item to cart"
            disabled={disabled}
            onPress={() =>
              cart.addItem({
                product: {
                  id: props.product.id,
                  title: props.product.title,
                  priceCents: props.product.priceCents,
                  currency: props.product.currency,
                },
                quantity,
                size: selectedSize,
                color: selectedColor,
              })
            }
          />
        </View>
      </View>
    </Card>
  );
}

export default function StoreScreen() {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: api.listProducts,
  });

  const cart = useCart();

  const products = productsQuery.data ?? fallbackProducts;
  const productsWithMeta = useMemo<StoreProductView[]>(() => {
    return products.map((product) => {
      const meta = productMetaById[product.id] ?? {
        description: 'Tornado Nation merch (placeholder).',
        image: require('../../../assets/team-tiles/generic.png'),
      };
      return { ...product, ...meta };
    });
  }, [products]);

  return (
    <Screen>
      <Section title="Products">
        {productsQuery.isLoading ? <LabelText>Loading…</LabelText> : null}
        {productsQuery.isError ? (
          <LabelText>API unavailable; showing placeholders.</LabelText>
        ) : null}

        <FlatList
          data={productsWithMeta}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ gap: 12, alignItems: 'stretch' }}
          contentContainerStyle={{ gap: 12, paddingTop: 4 }}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <ProductTile product={item} />
            </View>
          )}
        />

        <Card accessibilityLabel="Cart summary" style={{ gap: 10 }}>
          <LabelText>
            Cart: {cart.itemCount} item{cart.itemCount === 1 ? '' : 's'} • {formatMoney(cart.totalCents, cart.currency)}
          </LabelText>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Link href="/(tabs)/store/cart" asChild>
              <View style={{ flex: 1 }}>
                <Button label="View Cart" hint="Open your cart" />
              </View>
            </Link>
            <Link href="/(tabs)/store/orders" asChild>
              <View style={{ flex: 1 }}>
                <Button label="Orders" hint="View your orders" />
              </View>
            </Link>
          </View>
        </Card>
      </Section>
    </Screen>
  );
}
