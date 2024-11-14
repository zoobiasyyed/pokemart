import { useContext } from 'react';
import { CartContext } from './CartContext';
import { Product } from './Products';
import { Link } from 'react-router-dom';

export function ShoppingBag() {
  const { cart } = useContext(CartContext);
  return (
    <div className="containerBag">
      <Link className="backBag" to="/">
        &lt; Back
      </Link>
      <h2 className="bagInventory">Inventory</h2>
      <div>
        {cart.map((prod) => (
          <ItemCard products={prod} />
        ))}
      </div>
    </div>
  );
}

type CardProps = {
  products: Product;
};

function ItemCard({ products }: CardProps) {
  return (
    <div className="cartCard">
      <div>
        <img src={products.photoUrl} />
      </div>
      <div>
        <p className="bagItemName">{products.name}</p>
      </div>
    </div>
  );
}
