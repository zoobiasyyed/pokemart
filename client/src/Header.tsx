import { FaShoppingBag } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { useUser } from './useUser';

/**  Renders the Header, displaying the cart button
 * as well as the exit button
 *
 * Utilizes CartContext for cart state management,
 * useUser for user authentication and sign-out functionality, and
 * React Router's useNavigate for navigation.
 *
 * @returns {JSX.Element}
 *  */

export function Header() {
  const { user, handleSignOut } = useUser();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  return (
    <div>
      <div className="header">
        <div className="headerBag">
          {user && (
            <div>
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
