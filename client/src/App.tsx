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

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);

  function addToCart(product) {
    const newCart = [...cart, product];
    setCart(newCart);
  }

  const cartContextValues = { cart, addToCart };
  return (
    <CartContext.Provider value={cartContextValues}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="bag" element={<ShoppingBag />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}
