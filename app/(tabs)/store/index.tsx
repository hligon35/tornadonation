import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, Pressable, View } from 'react-native';

import type { Product } from '@tornado-nation/shared';
import { Button, Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

import { api } from '../../../lib/api';
import { useCart } from '../../../lib/store/cart-context';

type StoreProductMeta = {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  sizes?: string[];
  colors?: string[];
};

type StoreProductView = Product & StoreProductMeta;

const productMetaById: Record<string, StoreProductMeta> = {
  tee: {
    description: 'Soft cotton tee with Tornado Nation front print.',
    icon: 'pricetag-outline',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
  },
  hat: {
    description: 'Classic adjustable hat with embroidered logo.',
    icon: 'pricetag-outline',
    colors: ['Black', 'White'],
  },
  hoodie: {
    description: 'Warm hoodie for game nights and travel days.',
    icon: 'pricetag-outline',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
  },
  sticker: {
    description: 'Weatherproof sticker for bottles, laptops, and lockers.',
    icon: 'pricetag-outline',
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

function colorSwatchForName(colorName: string): { fill: string; border?: string } {
  const normalized = colorName.trim().toLowerCase();

  // Use existing theme tokens only.
  if (normalized === 'black') {
    return { fill: defaultTheme.colors.slate900 };
  }
  if (normalized === 'white') {
    return { fill: defaultTheme.colors.white, border: defaultTheme.colors.slate200 };
  }

  // Fallback: neutral swatch.
  return { fill: defaultTheme.colors.slate500, border: defaultTheme.colors.slate200 };
}

function DropdownField(props: {
  label: string;
  valueLabel: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  swatch?: { fill: string; border?: string };
  children?: React.ReactNode;
  accessibilityLabel: string;
}) {
  return (
    <View style={{ flex: 1, gap: 6 }} accessibilityLabel={props.accessibilityLabel}>
      <LabelText style={{ fontSize: 12, textAlign: 'center' }}>{props.label}</LabelText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${props.label} dropdown`}
        disabled={props.disabled}
        onPress={props.onToggle}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          borderWidth: 1,
          borderColor: defaultTheme.colors.slate200,
          borderRadius: defaultTheme.radius.md,
          backgroundColor: defaultTheme.colors.white,
          paddingVertical: 7,
          paddingHorizontal: 8,
          opacity: props.disabled ? 0.5 : pressed ? 0.85 : 1,
        })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 }}>
          {props.swatch ? (
            <View
              accessibilityLabel={`${props.valueLabel} color swatch`}
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: props.swatch.fill,
                borderWidth: props.swatch.border ? 1 : 0,
                borderColor: props.swatch.border,
              }}
            />
          ) : null}
          <LabelText numberOfLines={1} style={{ fontSize: 11, color: defaultTheme.colors.slate900 }}>
            {props.valueLabel}
          </LabelText>
        </View>

        <Ionicons
          name={props.open ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={15}
          color={defaultTheme.colors.slate900}
          style={{ marginRight: -2 }}
        />
      </Pressable>

      {props.open ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: defaultTheme.colors.slate200,
            borderRadius: defaultTheme.radius.md,
            overflow: 'hidden',
            backgroundColor: defaultTheme.colors.white,
          }}
        >
          {props.children}
        </View>
      ) : null}
    </View>
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
    <View
      accessibilityLabel={props.accessibilityLabel}
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
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
  const [openDropdown, setOpenDropdown] = useState<null | 'size' | 'color'>(null);

  const disabled = !props.product.inStock;

  const sizeOptions = props.product.sizes ?? [];
  const colorOptions = props.product.colors ?? [];

  const effectiveSize = sizeOptions.length ? (selectedSize ?? sizeOptions[0]) : 'One Size';
  const effectiveColor = colorOptions.length ? (selectedColor ?? colorOptions[0]) : 'Default';

  return (
    <Card
      accessibilityLabel={`${props.product.title} product tile`}
      style={{ flex: 1 }}
    >
      <View style={{ gap: 10 }}>
        <View style={{ gap: 8 }}>
          <View style={{ position: 'relative', overflow: 'visible' }}>
            <View
              accessibilityLabel={`${props.product.title} image`}
              style={{
                width: '100%',
                aspectRatio: 1.4,
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: defaultTheme.colors.slate200,
                borderWidth: 1,
                borderColor: defaultTheme.colors.slate200,
              }}
            >
              <Ionicons
                accessibilityLabel={`${props.product.title} icon`}
                name={props.product.icon}
                size={44}
                color={defaultTheme.colors.slate900}
                style={{ alignSelf: 'center', marginTop: 12 }}
              />
            </View>

            <View
              accessibilityLabel={`${props.product.title} price`}
              style={{
                position: 'absolute',
                top: -10,
                left: -10,
                backgroundColor: defaultTheme.colors.brandSecondary,
                paddingVertical: 2,
                paddingHorizontal: 3,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: defaultTheme.colors.slate900,
              }}
            >
              <LabelText style={{ fontSize: 12, fontWeight: '800', color: defaultTheme.colors.white }}>
                {formatMoney(props.product.priceCents, props.product.currency)}
              </LabelText>
            </View>
          </View>

          <View style={{ gap: 5 }}>
            <LabelText numberOfLines={1}>{props.product.title}</LabelText>
            <LabelText style={{ fontSize: 12 }} numberOfLines={1}>
              {props.product.description}
            </LabelText>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <DropdownField
              label="Size"
              valueLabel={effectiveSize}
              disabled={!sizeOptions.length}
              open={openDropdown === 'size'}
              onToggle={() => setOpenDropdown((prev) => (prev === 'size' ? null : 'size'))}
              accessibilityLabel={`${props.product.title} size`}
            >
              {sizeOptions.map((size) => (
                <Pressable
                  key={size}
                  accessibilityRole="button"
                  accessibilityLabel={`${props.product.title} select size ${size}`}
                  onPress={() => {
                    setSelectedSize(size);
                    setOpenDropdown(null);
                  }}
                  style={({ pressed }) => ({
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    backgroundColor: size === effectiveSize ? defaultTheme.colors.slate200 : defaultTheme.colors.white,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <LabelText style={{ fontSize: 11, color: defaultTheme.colors.slate900 }}>{size}</LabelText>
                </Pressable>
              ))}
            </DropdownField>

            <DropdownField
              label="Color"
              valueLabel={effectiveColor}
              disabled={!colorOptions.length}
              open={openDropdown === 'color'}
              onToggle={() => setOpenDropdown((prev) => (prev === 'color' ? null : 'color'))}
              swatch={colorSwatchForName(effectiveColor)}
              accessibilityLabel={`${props.product.title} color`}
            >
              {colorOptions.map((color) => {
                const swatch = colorSwatchForName(color);
                return (
                  <Pressable
                    key={color}
                    accessibilityRole="button"
                    accessibilityLabel={`${props.product.title} select color ${color}`}
                    onPress={() => {
                      setSelectedColor(color);
                      setOpenDropdown(null);
                    }}
                    style={({ pressed }) => ({
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      backgroundColor: color === effectiveColor ? defaultTheme.colors.slate200 : defaultTheme.colors.white,
                      opacity: pressed ? 0.85 : 1,
                    })}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View
                        accessibilityLabel={`${color} color swatch`}
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          backgroundColor: swatch.fill,
                          borderWidth: swatch.border ? 1 : 0,
                          borderColor: swatch.border,
                        }}
                      />
                      <LabelText style={{ fontSize: 11, color: defaultTheme.colors.slate900 }}>{color}</LabelText>
                    </View>
                  </Pressable>
                );
              })}
            </DropdownField>
          </View>
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
        icon: 'pricetag-outline',
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
          columnWrapperStyle={{ gap: 8, alignItems: 'stretch' }}
          contentContainerStyle={{ gap: 8, paddingTop: 0 }}
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
