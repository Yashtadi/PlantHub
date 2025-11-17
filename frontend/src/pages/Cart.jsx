import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/plants');
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          {cart.length > 0 && (
            <button onClick={clearCart} className="btn-clear-cart">
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some plants to get started!</p>
            <button onClick={handleContinueShopping} className="btn-primary">
              Browse Plants
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>₹{getCartTotal()}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Charges</span>
                <span className="delivery-free">
                  {getCartTotal() >= 500 ? 'FREE' : '₹50'}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{getCartTotal() >= 500 ? getCartTotal() : getCartTotal() + 50}</span>
              </div>

              {getCartTotal() < 500 && (
                <p className="delivery-note">
                  Add ₹{500 - getCartTotal()} more for free delivery!
                </p>
              )}

              <button onClick={handleCheckout} className="btn-checkout">
                Proceed to Checkout
              </button>

              <button onClick={handleContinueShopping} className="btn-continue">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;