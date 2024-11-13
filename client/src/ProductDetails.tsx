import { useContext, useEffect, useState } from 'react';
import { type Product } from './Products';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from './CartContext';
import { readToken } from './data';

export function ProductDetails() {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${readToken()}`,
          },
        });
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

  const handleNav = () => {
    addToCart(products);
    if (!products) throw new Error('Should never happen');
    alert(`Added ${name} to the bag`);
    navigate('/');
  };

  const { name, price, description, photoUrl } = products;

  return (
    <div>
      <div className="productDetails">
        <Link className="backDetails" to="/">
          &lt; Back
        </Link>
      </div>
      <div className="containerDetails">
        <div className="detailsBox">
          <div>
            <img className="detailsImage" src={photoUrl} />
            <p className="details-text">{name}</p>
          </div>
          <div>
            <p className="details-text">{'$' + (price / 100).toFixed(2)}</p>
          </div>
          <div>
            <p className="details-text">{description}</p>
          </div>
          <div>
            <button onClick={handleNav} className="detailsButton">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="productDetails">
        <Link className="backDetails" to="/">
          &lt; Back
        </Link>
      </div> */
}
