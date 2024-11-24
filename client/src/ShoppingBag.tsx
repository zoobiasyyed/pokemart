import { useContext } from 'react';
import { CartContext } from './CartContext';
import { Product } from './Products';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

export type CartItem = Product & {
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
  const { cart, updateQuantity, removeItem, clearCart } =
    useContext(CartContext);
  console.log(cart);

  async function handleUpdate(cartItem: CartItem) {
    try {
      await updateQuantity(cartItem);
    } catch (err) {
      console.error(err);
      alert('Error updating Item');
    }
  }

  async function handleRemove(cartItem: CartItem) {
    try {
      await removeItem(cartItem);
    } catch (err) {
      console.error(err);
      alert('Error removing Item');
    }
  }

  function totalPrice(cart: CartItem[]) {
    let totalItemPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      const itemPrice = cart[i].price * cart[i].quantity;
      totalItemPrice += itemPrice;
    }
    return totalItemPrice;
  }

  const makePayment = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to proceed.');
      return;
    }
    try {
      console.log('Cart being sent:', cart);
      const stripe = await loadStripe(
        'pk_test_51QNjOaHwEX5uZ8Wu3AKn2Jixsfsfsxu00l9tC117K6loxW5j6oNzCF6t7feSBsuNvYEgCQxerjprUPXse6mevSak00rOylThWM'
      );

      const body = {
        cart,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/bag/create-checkout-session', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error('Failed to create checkout session');
        return;
      }

      const session = await response.json();
      const result = stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      if (!result) {
        alert('There was an issue with the payment. Please try again.');
      } else {
        await clearCart();
        console.log('Cart cleared after initiating payment.');
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

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
            updateQuantity={handleUpdate}
            removeItem={handleRemove}
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
            <button onClick={makePayment} className="checkoutButton">
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
  productItem: CartItem;
  updateQuantity: (cartItem: CartItem) => void;
  removeItem: (cartItem: CartItem) => void;
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
