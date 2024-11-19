import { useContext, useEffect, useState } from 'react';
import { type Product } from './Products';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from './CartContext';
import { readToken } from './data';

export function ProductDetails() {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  if (productId === undefined) throw new Error('not found');
  const isAdded = cart.find((cart) => cart.productId === +productId);

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
    return <div className="loading">Loading...</div>;
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

  const handleNav = async () => {
    try {
      await addToCart(products);
      alert(`Added ${name} to the bag`);
      navigate('/');
    } catch (err) {
      if (!products) throw new Error('Should never happen');
    }
  };

  const { name, price, description, photoUrl } = products;

  return (
    <div>
      <div className="productDetails"></div>
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
            {isAdded ? (
              <p className="addCart">Item Added to Bag!</p>
            ) : (
              <button onClick={handleNav} className="detailsButton">
                Add to Bag
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
