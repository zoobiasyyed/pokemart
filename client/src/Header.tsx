import { FaBars, FaShoppingBag } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div className="header">
      <h3>header</h3>
      {<Outlet />}
    </div>
  );
}
