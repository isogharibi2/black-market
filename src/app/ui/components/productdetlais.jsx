import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './productdetlais.scss';

export default function ProductDetails() {
  const { slug } = useParams();

  const fetchProductDetails = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/specail-offers?slug=${slug}`);
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };

  const {
    data: products = [],
    isError,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["product-detail", slug],
    queryFn: fetchProductDetails
  });

  if (isLoading || isFetching) return (
    <div className="product-loading">
      <div className="loading-spinner"></div>
      <p>Loading product details...</p>
    </div>
  );

  if (isError) return (
    <div className="product-error">
      <div className="error-icon">❗</div>
      <h2>Oops! Something went wrong</h2>
      <p>We're having trouble loading the product details.</p>
      <button className="retry-button" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );

  return (
    <div className="product-details-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <div className="image-placeholder">
              <img className='Product' src={`/assets/images/${product.img}`} alt="" />
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <div className="brand-section">
              <span className="brand-label">Brand:</span>
              <span className="brand-name">{product.brand}</span>
            </div>

            <div className="size-section">
              <span className="size-label">Available Sizes:</span>
              <div className="size-bubbles">
                <span className="size-bubble">{product.sizeSM && "sizeSM"}</span>
                {/* Add more sizes if available */}
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart">Add to Cart</button>
              <button className="wishlist-button">
                <span className="heart-icon">♥</span> Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}