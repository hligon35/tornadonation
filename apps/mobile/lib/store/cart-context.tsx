import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type CartItem = {
  key: string;
  productId: string;
  title: string;
  priceCents: number;
  currency: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartState = {
  items: CartItem[];
};

type AddItemArgs = {
  product: {
    id: string;
    title: string;
    priceCents: number;
    currency: string;
  };
  quantity: number;
  size?: string;
  color?: string;
};

type CartAction =
  | { type: 'addItem'; payload: AddItemArgs }
  | { type: 'setQuantity'; payload: { key: string; quantity: number } }
  | { type: 'removeItem'; payload: { key: string } }
  | { type: 'clear' };

function makeKey(productId: string, size?: string, color?: string) {
  const normalizedSize = size?.trim() || '';
  const normalizedColor = color?.trim() || '';
  return `${productId}::${normalizedSize}::${normalizedColor}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'addItem': {
      const { product, quantity, size, color } = action.payload;
      const key = makeKey(product.id, size, color);
      const existing = state.items.find((item) => item.key === key);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.key === key
              ? { ...item, quantity: Math.max(1, item.quantity + Math.max(1, quantity)) }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            key,
            productId: product.id,
            title: product.title,
            priceCents: product.priceCents,
            currency: product.currency,
            quantity: Math.max(1, quantity),
            size,
            color,
          },
        ],
      };
    }
    case 'setQuantity': {
      const quantity = Math.max(1, Math.floor(action.payload.quantity));
      return {
        items: state.items.map((item) =>
          item.key === action.payload.key ? { ...item, quantity } : item,
        ),
      };
    }
    case 'removeItem': {
      return { items: state.items.filter((item) => item.key !== action.payload.key) };
    }
    case 'clear': {
      return { items: [] };
    }
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalCents: number;
  currency: string;
  addItem: (args: AddItemArgs) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalCents = state.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
    const currency = state.items[0]?.currency ?? 'USD';

    return {
      items: state.items,
      itemCount,
      totalCents,
      currency,
      addItem: (args) => dispatch({ type: 'addItem', payload: args }),
      setQuantity: (key, quantity) => dispatch({ type: 'setQuantity', payload: { key, quantity } }),
      removeItem: (key) => dispatch({ type: 'removeItem', payload: { key } }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartProvider;
