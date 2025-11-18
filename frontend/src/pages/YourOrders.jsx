import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/my-orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: '#FF9800',
      Confirmed: '#2196F3',
      Shipped: '#9C27B0',
      Delivered: '#4CAF50',
      Cancelled: '#F44336'
    };
    return colors[status] || '#757575';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <><Navbar />
      <div className="orders-page">
        <h1>Your Orders</h1>
    {loading ? (
      <div className="loading">Loading orders...</div>
    ) : orders.length === 0 ? (
      <div className="empty-orders">
        <div className="empty-orders-icon">📦</div>
        <h2>No orders yet</h2>
        <p>Start shopping to see your orders here!</p>
        <Link to="/plants" className="btn-primary">
          Browse Plants
        </Link>
      </div>
    ) : (
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                <p className="order-date">{formatDate(order.createdAt)}</p>
              </div>
              <div
                className="order-status-badge"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status}
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <p className="order-item-title">{item.title}</p>
                    <p className="order-item-price">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="order-item-subtotal">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span>Total Amount:</span>
                <span className="total-amount">₹{order.totalAmount}</span>
              </div>
              <div className="order-payment">
                <span>Payment: {order.paymentMethod}</span>
              </div>
            </div>

            <div className="order-delivery">
              <h4>Delivery Address</h4>
              <p>{order.deliveryAddress.fullName}</p>
              <p>
                {order.deliveryAddress.addressLine1}, {order.deliveryAddress.city}
              </p>
              <p>
                {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
              <p>Phone: {order.deliveryAddress.phone}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</>
);
};

export default YourOrders;