

import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="order-confirmation-page">
        <div className="confirmation-card">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p className="confirmation-message">
            Thank you for your order. Your plants will be delivered soon!
          </p>

          <div className="order-details">
            <h2>Order Details</h2>
            <div className="detail-row">
              <span>Order ID:</span>
              <span className="order-id">{order._id}</span>
            </div>
            <div className="detail-row">
              <span>Total Amount:</span>
              <span className="order-amount">₹{order.totalAmount}</span>
            </div>
            <div className="detail-row">
              <span>Payment Method:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className="order-status">{order.status}</span>
            </div>
          </div>

          <div className="delivery-address-section">
            <h3>Delivery Address</h3>
            <p>{order.deliveryAddress.fullName}</p>
            <p>{order.deliveryAddress.phone}</p>
            <p>{order.deliveryAddress.addressLine1}</p>
            {order.deliveryAddress.addressLine2 && <p>{order.deliveryAddress.addressLine2}</p>}
            <p>
              {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
            </p>
          </div>

          <div className="confirmation-actions">
            <Link to="/your-orders" className="btn-primary">
              View Your Orders
            </Link>
            <Link to="/plants" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;