import './App.css';
import { Header } from './Header';
import { ProductDetails } from './ProductDetails';
import { Products } from './Products';
import { NotFound } from './NotFound';
import { Route, Routes } from 'react-router-dom';
import { CartItems, ShoppingBag } from './ShoppingBag';
import { CartContext } from './CartContext';
import { useState } from 'react';
import { Product } from './Products';
import { Home } from './Home';
import { RegistrationForm } from './RegistrationForm';
import { SignInForm } from './SignInForm';
import { UserProvider } from './UserContext';
import { readToken } from './data';

export default function App() {
  const [cart, setCart] = useState<CartItems[]>([]);
  const [error, setError] = useState<unknown>();

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

  if (error) {
    return (
      <div>
        Error Loading :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }
  //try catch await for fetch that calls the post and add another function for remove from cart and just quanity (put)

  const cartContextValues = { cart, addToCart, updateQuantity };
  return (
    <UserProvider>
      <CartContext.Provider value={cartContextValues}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<RegistrationForm />} />
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="/" element={<Header />}>
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
            <Route path="bag" element={<ShoppingBag />} />
          </Route>
        </Routes>
      </CartContext.Provider>
    </UserProvider>
  );
}
