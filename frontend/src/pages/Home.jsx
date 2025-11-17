import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPlants();
  }, []);

  const fetchFeaturedPlants = async () => {
    try {
      const { data } = await API.get('/plants/featured');
      setFeaturedPlants(data);
    } catch (error) {
      console.error('Error fetching featured plants:', error);
    }
    setLoading(false);
  };

  const categories = [
    { name: 'Indoor', icon: '🏠', color: '#4CAF50' },
    { name: 'Outdoor', icon: '🌳', color: '#8BC34A' },
    { name: 'Succulents', icon: '🌵', color: '#CDDC39' },
    { name: 'Flowering', icon: '🌸', color: '#E91E63' },
    { name: 'Medicinal', icon: '💊', color: '#00BCD4' },
    { name: 'Air Purifying', icon: '💨', color: '#03A9F4' }
  ];

  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to PlantShop 🌿</h1>
            <p className="hero-subtitle">
              Discover the perfect plants for your home and garden
            </p>
            <Link to="/plants" className="btn-primary btn-large">
              Browse Plants
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/plants?category=${category.name}`}
                className="category-card"
                style={{ borderColor: category.color }}
              >
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Plants Section */}
        <section className="featured-section">
          <h2 className="section-title">Featured Plants</h2>
          {loading ? (
            <div className="loading">Loading plants...</div>
          ) : featuredPlants.length > 0 ? (
            <div className="plants-grid">
              {featuredPlants.map((plant) => (
                <Link
                  key={plant._id}
                  to={`/plants/${plant._id}`}
                  className="plant-card"
                >
                  <div className="plant-image">
                    <img
                      src={`http://localhost:5000${plant.image}`}
                      alt={plant.title}
                    />
                  </div>
                  <div className="plant-info">
                    <h3 className="plant-title">{plant.title}</h3>
                    <p className="plant-category">{plant.category}</p>
                    <p className="plant-price">₹{plant.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="no-results">No featured plants available</p>
          )}
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🚚</span>
              <h3>Free Delivery</h3>
              <p>On orders above ₹500</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🌱</span>
              <h3>Healthy Plants</h3>
              <p>Quality guaranteed</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💳</span>
              <h3>Cash on Delivery</h3>
              <p>Pay when you receive</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📞</span>
              <h3>24/7 Support</h3>
              <p>Always here to help</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;