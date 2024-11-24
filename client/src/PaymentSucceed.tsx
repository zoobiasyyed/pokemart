import { Link } from 'react-router-dom';

/**
 * Renders the NotFound component, displaying a "Page Not Found" message
 * with a link to navigate back to the home page.
 *
 * @returns {JSX.Element} The NotFound component.
 */

export function PaymentSucceed() {
  return (
    <div>
      <h1>Payment Succeed</h1>
      <Link className="backBag" to="/">
        &lt; Back
      </Link>
    </div>
  );
}
