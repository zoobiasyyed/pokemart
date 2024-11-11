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
      <div className="flex flex-col">
        <div className="flex-auto p-6">
          <Link to="/" className="p-3 text-gray-600 cursor-pointer">
            &lt; Back to PokeMart
          </Link>
          <div className="flex flex-wrap mb-4">
            <div className="w-full sm:w-1/2 md:w-2/5 pt-2 px-4">
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-80 object-contain"
              />
            </div>
            <h2 className="pd-h2">{name}</h2>
          </div>
          <div className="px-4">
            <p className="pd-text">{description}</p>
            <p className="pd-text">{'$' + (price / 100).toFixed(2)}</p>
          </div>
        </div>
        <button> Add To Cart</button>
      </div>
    </div>
  );
}
