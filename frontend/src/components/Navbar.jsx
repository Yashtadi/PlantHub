import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌿 PlantShop
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/plants" className="nav-link">Plants</Link>
          </li>
          <li className="nav-item">
            <Link to="/plant-tips" className="nav-link">Plant Tips</Link>
          </li>
          <li className="nav-item">
            <Link to="/your-orders" className="nav-link">Your Orders</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              🛒 Cart ({getCartCount()})
            </Link>
          </li>
        </ul>

        <div className="nav-user">
          {user && (
            <>
              <span className="user-name">👤 {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;