import { Link } from 'react-router-dom';

/**
 * Renders the NotFound component, displaying a "Page Not Found" message
 * with a link to navigate back to the home page.
 *
 * @returns {JSX.Element} The NotFound component.
 */

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
