import { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from './Products';
import { CartItem } from './ShoppingBag';
import { useUser } from './useUser';
import { readToken } from './data';

export type CartValue = {
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (cartItem: CartItem) => Promise<void>;
  removeItem: (cartItem: CartItem) => Promise<void>;
  clearCart: () => Promise<void>;
};

export const CartContext = createContext<CartValue>({
  cart: [],
  addToCart: () => new Promise(() => {}),
  updateQuantity: () => new Promise(() => {}),
  removeItem: () => new Promise(() => {}),
  clearCart: () => new Promise(() => {}),
});

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const { user } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function userCart() {
      try {
        if (!user) return;
        const response = await fetch('/api/bag/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${readToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as CartItem[];
        setCart(data);
      } catch (err) {
        setError(err);
      }
    }
    userCart();
  }, [user]);

  //post call
  async function addToCart(product: Product) {
    const response = await fetch('/api/bag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${readToken()}`,
      },
      body: JSON.stringify({ productId: product.productId, quantity: 1 }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as CartItem;
    const newCart = [...cart, data];
    setCart(newCart);
  }

  //putCall
  async function updateQuantity(cartItem: CartItem) {
    const response = await fetch(`/api/bag/${cartItem.cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${readToken()}`,
      },
      body: JSON.stringify({ quantity: cartItem.quantity }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as CartItem;
    const newCart = cart.map((c) =>
      c.cartItemId === cartItem.cartItemId ? data : c
    );
    setCart(newCart);
  }

  //remove Call
  async function removeItem(cartItem: CartItem) {
    const response = await fetch(`/api/bag/${cartItem.cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${readToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const newCart = cart.filter((c) => c.cartItemId !== cartItem.cartItemId);
    setCart(newCart);
  }

  //remove Cart
  async function clearCart() {
    const response = await fetch(`/api/bag-all`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${readToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setCart([]);
  }

  if (error) {
    return (
      <div>
        Error Loading :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  const cartContextValue = {
    cart,
    removeItem,
    addToCart,
    updateQuantity,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
