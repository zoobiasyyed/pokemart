import { createContext } from 'react';
import { Product } from './Products';
import { CartItems } from './ShoppingBag';

export type CartValue = {
  cart: CartItems[];
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (cartItem: CartItems) => Promise<void>;
};

export const CartContext = createContext<CartValue>({
  cart: [],
  addToCart: () => new Promise(() => {}),
  updateQuantity: () => new Promise(() => {}),
});
