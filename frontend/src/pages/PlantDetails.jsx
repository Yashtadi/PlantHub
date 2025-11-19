import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import '../styles/PlantDetails.css'; 
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
        <div className="loading-screen" style={{padding: '2rem', textAlign:'center'}}>Loading...</div>
      </>
    );
  }

  if (!plant) {
    return (
      <>
        <Navbar />
        <div className="error-screen" style={{padding: '2rem', textAlign:'center'}}>Plant not found</div>
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
          {/* Left Column: Image */}
          <div className="plant-details-image">
            <img
              src={`http://localhost:5000${plant.image}`}
              alt={plant.title}
              onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1000&auto=format&fit=crop"}}
            />
          </div>

          {/* Right Column: Info */}
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
              <h3 style={{fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Description</h3>
              <p style={{lineHeight: '1.6', color: '#4b5563'}}>{plant.description}</p>
            </div>

            <div className="plant-features" style={{marginTop: '1.5rem'}}>
              <h3 style={{fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Features</h3>
              <ul>
                <li>🌱 Easy to maintain</li>
                <li>💧 Regular watering required</li>
                <li>☀️ Suitable for {Array.isArray(plant.category) ? plant.category[0] : plant.category} areas</li>
                <li>📦 Comes with care instructions</li>
              </ul>
            </div>

            {plant.availability && (
              <div className="plant-actions">
                
                {/* --- UPDATED QUANTITY SELECTOR --- */}
                <div className="quantity-selector">
                  <span className="qty-label">Quantity:</span>
                  <div className="qty-group">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="qty-btn"
                    >
                      -
                    </button>
                    {/* We use a span instead of input for cleaner alignment */}
                    <span className="qty-display">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* --------------------------------- */}

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