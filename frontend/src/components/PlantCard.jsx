import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const PlantCard = ({ plant }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(plant, 1);
    alert(`${plant.title} added to cart!`);
  };

  return (
    <div className="plant-card">
      <Link to={`/plants/${plant._id}`} className="plant-card-link">
        <div className="plant-image">
          <img
            src={`http://localhost:5000${plant.image}`}
            alt={plant.title}
          />
          {!plant.availability && (
            <div className="out-of-stock">Out of Stock</div>
          )}
        </div>
        <div className="plant-info">
          <h3 className="plant-title">{plant.title}</h3>
          <p className="plant-category">{plant.category}</p>
          <p className="plant-description">
            {plant.description.substring(0, 60)}...
          </p>
          <div className="plant-footer">
            <p className="plant-price">₹{plant.price}</p>
            {plant.availability && (
              <button
                onClick={handleAddToCart}
                className="btn-add-to-cart"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlantCard;