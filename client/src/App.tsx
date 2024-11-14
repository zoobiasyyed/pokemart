import './App.css';
import { Header } from './Header';
import { ProductDetails } from './ProductDetails';
import { Products } from './Products';
import { NotFound } from './NotFound';
import { Route, Routes } from 'react-router-dom';
import { ShoppingBag } from './ShoppingBag';
import { CartContext } from './CartContext';
import { useState } from 'react';
import { Product } from './Products';
import { Home } from './Home';
import { RegistrationForm } from './RegistrationForm';
import { SignInForm } from './SignInForm';
import { UserProvider } from './UserContext';

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);

  function addToCart(product) {
    const newCart = [...cart, product];
    setCart(newCart);
  }
  //try catch await for fetch that calls the post and add another function for remove from cart and just quanity (put)

  const cartContextValues = { cart, addToCart };
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
