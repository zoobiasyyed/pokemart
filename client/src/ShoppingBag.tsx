import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { Product } from './Products';
import { Link, useNavigate } from 'react-router-dom';

export type CartItems = Product & {
  cartItemId: number;
  userId: number;
  productId: number;
  quantity: number;
};

/**  Renders the shopping bag page, displaying a list of items in the cart,
 * total price, and functionality to update quantities, remove items,
 * and clear the cart.
 *
 * Utilizes CartContext for cart state management and React Router for navigation.
 *
 * @returns {JSX.Element} */

export function ShoppingBag() {
  const [error, setError] = useState<unknown>();
  const { cart, updateQuantity, removeItem, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

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

  function totalPrice(cart: CartItems[]) {
    let totalItemPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      const itemPrice = cart[i].price * cart[i].quantity;
      totalItemPrice += itemPrice;
    }
    return totalItemPrice;
  }

  const handleClearCart = async () => {
    try {
      await clearCart();
      alert('Thank You for Shopping with us, hope to see you again!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error clearing cart');
    }
  };

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
            key={prod.cartItemId}
            productItem={prod}
            updateQuantity={updatedQuantity}
            removeItem={removedItem}
          />
        ))}
      </div>
      <div className="checkoutContainer">
        <div className="totalPrice">
          <h2 className="total">Total Price: </h2>
          <h2 className="total">{'$' + (totalPrice(cart) / 100).toFixed(2)}</h2>
        </div>
        <div>
          {cart.length === 0 ? (
            <h3 className="emptyCart">Your Bag is Empty!</h3>
          ) : (
            <button onClick={handleClearCart} className="checkoutButton">
              Check Out
            </button>
          )}
        </div>
        <img className="chikorita" src="/images/chikorita.gif" />
      </div>
    </div>
  );
}

type CardProps = {
  productItem: CartItems;
  updateQuantity: (cartItem: CartItems) => void;
  removeItem: (cartItem: CartItems) => void;
};

function ItemCard({ productItem, updateQuantity, removeItem }: CardProps) {
  const quantity = productItem.quantity;
  const updatedPrice = productItem.price * quantity;

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
      <div className="cartDiv">
        <div>
          <img src={productItem.photoUrl} />
        </div>
        <div>
          <p className="bagItemName">{productItem.name}</p>
        </div>
      </div>
      <div className="cartDiv">
        <p className="bagItemName">{'$' + (updatedPrice / 100).toFixed(2)}</p>
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
    </div>
  );
}
