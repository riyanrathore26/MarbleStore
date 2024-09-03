import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import Productpage from './Productpage';

export default function Microproduct({ productTags, productId }) {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/api/fetchsimilar/${productTags}/${productId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length === 0) {
            setProductData([]);  // Set empty product data
          } else {
            setProductData(data);
          }
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productTags, productId]);  // Include productTags and productId in the dependency array

  return (
    <div className="microproduct-container">
      {/* Loading state */}
      {loading && <p className="loading">Loading products...</p>}

      {/* Error state */}
      {error && <p className="error">{error}</p>}

      {/* Show product data if available */}
      {!loading && !error && productData.length > 0 && (
        <div className="product-grid">
          {productData.map((product, index) => (
            <div className="product-card" key={index}>
              <img className="product-image" src={product.images[0]} alt={product.name} />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show fallback if no products found */}
      {!loading && productData.length === 0 && !error && (
        <div className="fallback-content">
          <Productpage showsomething={false} />
        </div>
      )}
    </div>
  );
}
