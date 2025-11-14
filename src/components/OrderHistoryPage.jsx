import React from 'react';
import { useApp } from '../context/AppContext';

const styles = {
  container: { padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  emptyState: { textAlign: 'center', padding: '3rem 1rem', color: '#666' },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem'
  },
  orderId: { fontWeight: 'bold', color: '#16a34a', fontSize: '1.1rem', marginBottom: '0.5rem' },
  orderDetails: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' },
  detailItem: { fontSize: '0.9rem' },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
};

export const OrderHistoryPage = () => {
  const { orders, setCurrentPage, setSelectedOrderId } = useApp();

  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Order History</h1>
        <div style={styles.emptyState}>
          <p style={{fontSize: '1.2rem', marginBottom: '1rem'}}>📦</p>
          <p>No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order History</h1>
      
      {orders.map((order) => (
        <div key={order.id} style={styles.card}>
          <div style={styles.orderId}>Order #{order.id}</div>
          <div style={styles.orderDetails}>
            <div style={styles.detailItem}>
              <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
            </div>
            <div style={styles.detailItem}>
              <strong>Status:</strong> {order.status}
            </div>
            <div style={styles.detailItem}>
              <strong>Total:</strong> ₹{order.total.toFixed(2)}
            </div>
            <div style={styles.detailItem}>
              <strong>Items:</strong> {order.items.length}
            </div>
          </div>
          <button 
            style={{...styles.button, marginTop: '1rem'}}
            onClick={() => {
              setSelectedOrderId(order.id);
              setCurrentPage('order-detail');
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};
