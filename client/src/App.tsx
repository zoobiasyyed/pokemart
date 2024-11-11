import './App.css';
import { Header } from './Header';
import { ProductDetails } from './ProductDetails';
import { Products } from './Products';
import { NotFound } from './NotFound';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
