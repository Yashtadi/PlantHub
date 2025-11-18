import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!deliveryAddress.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!/^[0-9]{10}$/.test(deliveryAddress.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!deliveryAddress.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }

    if (!deliveryAddress.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!deliveryAddress.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!/^[0-9]{6}$/.test(deliveryAddress.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill all required fields correctly');
      return;
    }

    setLoading(true);

    const orderData = {
      items: cart.map((item) => ({
        plant: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      deliveryAddress,
      totalAmount: getCartTotal() >= 500 ? getCartTotal() : getCartTotal() + 50
    };

    try {
      const { data } = await API.post('/orders', orderData);
      clearCart();
      navigate('/order-confirmation', { state: { order: data } });
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal >= 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  // --- FIX: Explicit Styles for Light Theme Inputs ---
  const inputStyle = {
    backgroundColor: '#ffffff',
    color: '#1f2937', // Dark gray text
    border: '1px solid #d1d5db', // Light gray border
    padding: '10px',
    borderRadius: '6px',
    width: '100%',
    boxSizing: 'border-box' // Ensures padding doesn't break width
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-container">
          {/* Delivery Address Form */}
          <div className="checkout-form">
            <h2>Delivery Address</h2>
            <form onSubmit={handlePlaceOrder}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={deliveryAddress.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                    // Merge base style with potential error border
                    style={{...inputStyle, borderColor: errors.fullName ? 'red' : '#d1d5db'}}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={deliveryAddress.phone}
                    onChange={handleChange}
                    maxLength="10"
                    className={errors.phone ? 'error' : ''}
                    style={{...inputStyle, borderColor: errors.phone ? 'red' : '#d1d5db'}}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1 *</label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={deliveryAddress.addressLine1}
                  onChange={handleChange}
                  placeholder="House No., Street Name"
                  className={errors.addressLine1 ? 'error' : ''}
                  style={{...inputStyle, borderColor: errors.addressLine1 ? 'red' : '#d1d5db'}}
                />
                {errors.addressLine1 && <span className="error-text">{errors.addressLine1}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={deliveryAddress.addressLine2}
                  onChange={handleChange}
                  placeholder="Landmark, Area"
                  style={inputStyle}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryAddress.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                    style={{...inputStyle, borderColor: errors.city ? 'red' : '#d1d5db'}}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={deliveryAddress.state}
                    onChange={handleChange}
                    className={errors.state ? 'error' : ''}
                    style={{...inputStyle, borderColor: errors.state ? 'red' : '#d1d5db'}}
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={deliveryAddress.pincode}
                    onChange={handleChange}
                    maxLength="6"
                    className={errors.pincode ? 'error' : ''}
                    style={{...inputStyle, borderColor: errors.pincode ? 'red' : '#d1d5db'}}
                  />
                  {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                </div>
              </div>

              <div className="payment-method">
                <h3>Payment Method</h3>
                <div className="payment-option" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <input type="radio" id="cod" name="payment" checked readOnly />
                  <label htmlFor="cod" style={{color: '#1f2937', fontWeight: '500'}}>💵 Cash on Delivery</label>
                </div>
              </div>

              <button type="submit" className="btn-place-order" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-checkout">
            <h2>Order Summary</h2>

            <div className="order-items">
              {cart.map((item) => (
                <div key={item._id} className="order-item">
                  <img 
                    src={`http://localhost:5000${item.image}`} 
                    alt={item.title} 
                    onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1000&auto=format&fit=crop"}}
                  />
                  <div className="order-item-info">
                    <p className="order-item-title">{item.title}</p>
                    <p className="order-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="order-item-price">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;