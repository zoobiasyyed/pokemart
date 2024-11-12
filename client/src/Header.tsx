import { FaShoppingBag } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';

export function Header() {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <div className="header">
        <div className="headerBag">
          <Link to={'bag'}>
            <button className="headerButton">
              <FaShoppingBag className="shoppingBag" />
              <span className="contextNumber">{cart.length}</span>
            </button>
          </Link>
        </div>
      </div>
      {<Outlet />}
    </div>
  );
}
