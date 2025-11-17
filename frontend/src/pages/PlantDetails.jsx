import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';

const PlantDetails = () => {
  const [plant, setPlant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchPlant();
  }, [id]);

  const fetchPlant = async () => {
    try {
      const { data } = await API.get(`/plants/${id}`);
      setPlant(data);
    } catch (error) {
      console.error('Error fetching plant:', error);
      alert('Plant not found');
      navigate('/plants');
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    addToCart(plant, quantity);
    alert(`${quantity} x ${plant.title} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(plant, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-screen">Loading...</div>
      </>
    );
  }

  if (!plant) {
    return (
      <>
        <Navbar />
        <div className="error-screen">Plant not found</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="plant-details-page">
        <button onClick={() => navigate('/plants')} className="btn-back">
          ← Back to Plants
        </button>

        <div className="plant-details-container">
          <div className="plant-details-image">
            <img
              src={`http://localhost:5000${plant.image}`}
              alt={plant.title}
            />
          </div>

          <div className="plant-details-info">
            <div className="plant-details-header">
              <h1>{plant.title}</h1>
              <span className="plant-category-badge">{plant.category}</span>
            </div>

            <div className="plant-price-section">
              <span className="plant-price-large">₹{plant.price}</span>
              {plant.availability ? (
                <span className="stock-status in-stock">✓ In Stock</span>
              ) : (
                <span className="stock-status out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="plant-description">
              <h3>Description</h3>
              <p>{plant.description}</p>
            </div>

            <div className="plant-features">
              <h3>Features</h3>
              <ul>
                <li>🌱 Easy to maintain</li>
                <li>💧 Regular watering required</li>
                <li>☀️ Suitable for {plant.category.toLowerCase()} areas</li>
                <li>📦 Comes with care instructions</li>
              </ul>
            </div>

            {plant.availability && (
              <div className="plant-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="action-buttons">
                  <button onClick={handleAddToCart} className="btn-add-to-cart-large">
                    🛒 Add to Cart
                  </button>
                  <button onClick={handleBuyNow} className="btn-buy-now">
                    ⚡ Buy Now
                  </button>
                </div>
              </div>
            )}

            <div className="delivery-info">
              <p>🚚 Free delivery on orders above ₹500</p>
              <p>💳 Cash on Delivery available</p>
              <p>↩️ 7-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlantDetails;