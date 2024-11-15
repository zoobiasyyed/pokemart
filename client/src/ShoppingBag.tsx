import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { Product } from './Products';
import { Link } from 'react-router-dom';

export type CartItems = {
  cartItemId: number;
  userId: number;
  productId: number;
  product: Product;
  quantity: number;
};

export function ShoppingBag() {
  const [error, setError] = useState<unknown>();
  const { cart, updateQuantity, removeItem } = useContext(CartContext);
  console.log(cart);

  async function updatedQuantity(cartItem: CartItems) {
    try {
      await updateQuantity(cartItem);
    } catch (err) {
      setError(err);
    }
  }

  async function removedItem(cartItem: CartItems) {
    try {
      await removeItem(cartItem);
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

  return (
    <div className="containerBag">
      <Link className="backBag" to="/">
        &lt; Back
      </Link>
      <h2 className="bagInventory">Inventory</h2>
      <div>
        {cart.map((prod) => (
          <ItemCard
            key={prod.productId}
            productItem={prod}
            updateQuantity={updatedQuantity}
            removeItem={removedItem}
          />
        ))}
      </div>
    </div>
  );
}

type CardProps = {
  productItem: CartItems;
  updateQuantity: (cartItem: CartItems) => void;
  removeItem: (cartItem: CartItems) => void;
};

// need to add quantity and delete button
function ItemCard({ productItem, updateQuantity, removeItem }: CardProps) {
  const product = productItem.product;
  const quantity = productItem.quantity;
  console.log(quantity);
  console.log(productItem);
  const updatedPrice = product.price * quantity;

  const handleIncrement = () => {
    updateQuantity({ ...productItem, quantity: quantity + 1 });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity({ ...productItem, quantity: quantity - 1 });
    } else {
      removeItem(productItem);
    }
  };

  return (
    <div className="cartCard">
      <div>
        <img src={product.photoUrl} />
      </div>
      <div>
        <p className="bagItemName">{product.name}</p>
        <p className="bagItemName">{'$' + (updatedPrice / 100).toFixed(2)}</p>
      </div>
      <div className="incrementQuantity">
        <button className="decrementButton" onClick={handleDecrement}>
          -
        </button>
        <p className="quantity">{quantity}</p>
        <button className="incrementButton" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
}
