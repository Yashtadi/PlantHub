import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img
        src={`http://localhost:5000${item.image}`}
        alt={item.title}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-category">{item.category}</p>
        <p className="cart-item-price">₹{item.price}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-control">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="qty-btn"
          >
            -
          </button>
          <span className="qty-display">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="qty-btn"
          >
            +
          </button>
        </div>

        <p className="cart-item-subtotal">
          Subtotal: ₹{item.price * item.quantity}
        </p>

        <button
          onClick={() => removeFromCart(item._id)}
          className="btn-remove"
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;