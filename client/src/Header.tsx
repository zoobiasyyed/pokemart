import { FaShoppingBag } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { useUser } from './useUser';

export function Header() {
  const { user, handleSignOut } = useUser();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  return (
    <div>
      <div className="header">
        <div className="headerBag">
          {user && (
            <div className="relative flex-grow flex-1 px-4">
              <button
                className="signOutButton"
                onClick={() => {
                  handleSignOut();
                  navigate('/');
                }}>
                Exit
              </button>
            </div>
          )}
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
