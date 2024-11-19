import { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from './Products';
import { CartItems } from './ShoppingBag';
import { useUser } from './useUser';
import { readToken } from './data';

export type CartValue = {
  cart: CartItems[];
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (cartItem: CartItems) => Promise<void>;
  removeItem: (cartItem: CartItems) => Promise<void>;
  clearCart: () => Promise<void>;
};

export const CartContext = createContext<CartValue>({
  cart: [],
  addToCart: () => new Promise(() => {}),
  updateQuantity: () => new Promise(() => {}),
  removeItem: () => new Promise(() => {}),
  clearCart: () => new Promise(() => {}),
});

//create a cartprovider that looks like userprovider

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const { user } = useUser();
  const [cart, setCart] = useState<CartItems[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function userCart() {
      try {
        if (!user) return;
        if (user) {
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
          const data = (await response.json()) as CartItems[];
          setCart(data);
        }
      } catch (err) {
        setError(err);
      }
    }
    userCart();
  }, [user]);

  async function addToCart(product: Product) {
    try {
      //post call
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
      const data = (await response.json()) as CartItems;
      const newCart = [...cart, data];
      setCart(newCart);
    } catch (err) {
      setError(err);
    }
  }

  //putCall
  async function updateQuantity(cartItem: CartItems) {
    try {
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
      const data = (await response.json()) as CartItems;
      const newCart = cart.map((c) =>
        c.cartItemId === cartItem.cartItemId ? data : c
      );
      setCart(newCart);
    } catch (err) {
      setError(err);
    }
  }

  //remove Call
  async function removeItem(cartItem: CartItems) {
    try {
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
    } catch (err) {
      setError(err);
    }
  }

  //remove Cart
  async function clearCart() {
    try {
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
    } catch (err) {
      setError(err);
    }
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
