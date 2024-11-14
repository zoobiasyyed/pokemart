import { createContext } from 'react';
import { Product } from './Products';

export type CartValue = {
  cart: Product[];
  addToCart: (product: Product | undefined) => Promise<void>;
};

export const CartContext = createContext<CartValue>({
  cart: [],
  addToCart: () => new Promise(() => {}),
});
