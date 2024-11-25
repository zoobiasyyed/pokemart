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
import { BackGroundAudio } from './BackGroundAudio';
import { PaymentFailed } from './PaymentFailed';
import { PaymentSucceed } from './PaymentSucceed';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BackGroundAudio />
        <Routes>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<RegistrationForm />} />
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="/" element={<Header />}>
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="bag" element={<ShoppingBag />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="payment-succeed" element={<PaymentSucceed />} />
          <Route path="payment-failed" element={<PaymentFailed />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}
