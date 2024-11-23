import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripe = loadStripe(
  'pk_test_51QNjOaHwEX5uZ8Wu3AKn2Jixsfsfsxu00l9tC117K6loxW5j6oNzCF6t7feSBsuNvYEgCQxerjprUPXse6mevSak00rOylThWM'
);

type StripeContextProps = {
  children: ReactNode;
};

export const StripeContextWrapper: React.FC<StripeContextProps> = ({
  children,
}) => {
  return <Elements stripe={stripe}>{children}</Elements>;
};
