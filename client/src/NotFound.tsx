import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <Link className="backBag" to="/">
        &lt; Back
      </Link>
      <h1>This Page was Not Found</h1>
    </div>
  );
}
