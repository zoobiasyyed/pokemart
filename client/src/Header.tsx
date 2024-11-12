import { FaBars, FaShoppingBag } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div>
      <div className="header">
        <h3>header</h3>
      </div>
      {<Outlet />}
    </div>
  );
}
