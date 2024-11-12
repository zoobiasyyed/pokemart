import { FaShoppingBag } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div>
      <div className="header">
        <div className="headerBag">
          <FaShoppingBag className="shoppingBag" />
        </div>
      </div>
      {<Outlet />}
    </div>
  );
}
