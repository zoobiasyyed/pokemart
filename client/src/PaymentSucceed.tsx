import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

/**
 * Renders the payment succeeded component, displaying a "Payment Was Successful" message
 * with a link to navigate back to the home page.
 *
 * @returns {JSX.Element}
 */

export function PaymentSucceed() {
  return (
    <div className="paymentSucceeded">
      <div className="paymentBox">
        <h1 className="successTitle">Payment Was Successful!</h1>
        <div>
          <FaCheck className="check" />
        </div>
        <Link className="goBack" to="/">
          &lt; Back To Products
        </Link>
      </div>
    </div>
  );
}
