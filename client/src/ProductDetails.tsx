import { useEffect, useState } from 'react';
import { type Product } from './Products';
import { Link, useParams } from 'react-router-dom';

export function ProductDetails() {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as Product;
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  if (!products) {
    return <div>Product not found</div>;
  }

  const { name, price, description, photoUrl } = products;

  return (
    <div className="container">
      <div className="productDetails">
        <Link className="backDetails" to="/">
          &lt; Back
        </Link>
        <div>
          <img src={photoUrl} />
        </div>
        <div>
          <p className="details-text">{'$' + (price / 100).toFixed(2)}</p>
          <p className="details-text">{name}</p>
        </div>
        <div>
          <p className="details-text">{description}</p>
        </div>
        <div>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
