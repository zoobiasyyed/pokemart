import { Link } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';

/**
 * Renders the payment failed component, displaying a "Payment Failed" message
 * with a link to navigate back to the home page.
 *
 * @returns {JSX.Element}
 */

export function PaymentFailed() {
  return (
    <div className="paymentFailed">
      <div className="paymentBox">
        <h1 className="successTitle">Payment Failed!</h1>
        <div>
          <FaXmark className="xMark" />
        </div>
        <Link className="goBack" to="/">
          &lt; Back To Products
        </Link>
      </div>
    </div>
  );
}
