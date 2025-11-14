import React from 'react';
import { useApp } from '../context/AppContext';

const styles = {
  container: { padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  backButton: { marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  card: { backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' },
  cardTitle: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.75rem' },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' },
  detailItem: { fontSize: '0.95rem' },
  itemsList: { marginTop: '1.5rem' },
  item: { display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #eee' },
  itemImage: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f9fafb' },
  total: { fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', marginTop: '1rem' }
};

export const OrderDetailPage = () => {
  const { orders, selectedOrderId, setCurrentPage } = useApp();
  const order = orders.find(o => o.id === selectedOrderId);

  if (!order) {
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => setCurrentPage('orders')}>← Back to Orders</button>
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => setCurrentPage('orders')}>← Back to Orders</button>
      
      <h1 style={styles.title}>Order #{order.id}</h1>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Order Information</div>
        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
          </div>
          <div style={styles.detailItem}>
            <strong>Status:</strong> {order.status}
          </div>
          <div style={styles.detailItem}>
            <strong>Payment Method:</strong> {order.paymentMethod === 'upi' ? 'UPI' : 'COD'}
          </div>
          <div style={styles.detailItem}>
            <strong>Expected Delivery:</strong> {new Date(order.deliveryDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Delivery Address</div>
        <p><strong>{order.address.fullName}</strong></p>
        <p>{order.address.phone}</p>
        <p>{order.address.address}</p>
        <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Order Items ({order.items.length})</div>
        <div style={styles.itemsList}>
          {order.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <img 
                src={item.image} 
                alt={item.name}
                style={styles.itemImage}
                onError={(e) => { e.target.style.fontSize = '40px'; }}
              />
              <div style={{flex: 1}}>
                <h4 style={{margin: '0 0 0.5rem 0'}}>{item.name}</h4>
                <p style={{margin: '0.25rem 0', color: '#666', fontSize: '0.9rem'}}>Qty: {item.quantity}</p>
                <p style={{margin: '0.25rem 0', fontWeight: 'bold'}}>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Bill Summary</div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
          <span>Subtotal</span>
          <span>₹{order.subtotal.toFixed(2)}</span>
        </div>
        {order.discount > 0 && (
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#16a34a'}}>
            <span>Subscription Discount</span>
            <span>-₹{order.discount.toFixed(2)}</span>
          </div>
        )}
        {order.couponDiscount > 0 && (
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#16a34a'}}>
            <span>Coupon Discount ({order.couponCode})</span>
            <span>-₹{order.couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
          <span>Shipping</span>
          <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping.toFixed(2)}`}</span>
        </div>
        <hr style={{margin: '0.75rem 0', border: 'none', borderTop: '1px solid #ddd'}} />
        <div style={{...styles.total, display: 'flex', justifyContent: 'space-between'}}>
          <span>Total</span>
          <span>₹{order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
