import { useEffect, useState } from 'react';

export type Product = {
  productId: number;
  name: string;
  category: string;
  price: number;
  description: string;
  photoUrl: string;
};

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as Product[];
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

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
  return (
    <div className="container">
      <img className="pokemartLogo" src="/images/pokemart.png" />
      <div className="img-back">
        <div className="productsMap">
          {products?.map((product) => (
            <div key={product.productId} className="imageCard">
              <ItemCard products={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  products: Product;
};

function ItemCard({ products }: CardProps) {
  return (
    <div className="itemCard">
      <img className="product-image" src={products.photoUrl}></img>
      <h5 className="productName">{products.name}</h5>
    </div>
  );
}
