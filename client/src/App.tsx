import './App.css';
import { Header } from './Header';
import { ProductDetails } from './ProductDetails';
import { Products } from './Products';
import { NotFound } from './NotFound';
import { Route, Routes } from 'react-router-dom';
import { ShoppingBag } from './ShoppingBag';
import { CartProvider } from './CartContext';
import { Home } from './Home';
import { RegistrationForm } from './RegistrationForm';
import { SignInForm } from './SignInForm';
import { UserProvider } from './UserContext';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
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
      </CartProvider>
    </UserProvider>
  );
}
