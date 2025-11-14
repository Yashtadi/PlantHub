import React from 'react';
import { useApp } from '../context/AppContext';

const styles = {
  container: { padding: '2rem 1rem', backgroundColor: '#fff', minHeight: '100vh' },
  main: { maxWidth: '1000px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  emptyCart: { textAlign: 'center', padding: '3rem 1rem' },
  emptyText: { fontSize: '1.2rem', color: '#666', marginBottom: '1rem' },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  },
  cartContent: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' },
  cartItems: { backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' },
  cartItem: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    borderBottom: '1px solid #eee',
    alignItems: 'center'
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
    backgroundColor: '#f9fafb'
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' },
  itemPrice: { fontSize: '1rem', color: '#16a34a', fontWeight: 'bold', marginBottom: '0.75rem' },
  quantityContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  removeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  summary: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '1.5rem',
    position: 'sticky',
    top: '100px'
  },
  summaryTitle: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' },
  summaryItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  summaryTotal: { fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', marginTop: '1rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }
};

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, setCurrentPage } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <h1 style={styles.title}>Shopping Cart</h1>
          <div style={styles.emptyCart}>
            <p style={{fontSize: '3rem'}}>🛒</p>
            <p style={styles.emptyText}>Your cart is empty</p>
            <button style={styles.button} onClick={() => setCurrentPage('products')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <h1 style={styles.title}>Shopping Cart ({cart.length} items)</h1>

        <div style={styles.cartContent}>
          <div style={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={styles.itemImage}
                  onError={(e) => { e.target.style.content = '🌿'; e.target.style.fontSize = '3rem'; }}
                />
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={{color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem'}}>{item.scientificName}</p>
                  <div style={styles.itemPrice}>₹{item.price}</div>
                  
                  <div style={styles.quantityContainer}>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span style={{minWidth: '30px', textAlign: 'center'}}>{item.quantity}</span>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <p style={{fontWeight: 'bold', marginBottom: '1rem'}}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    style={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <div style={styles.summaryItem}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryItem}>
              <span>Shipping</span>
              <span>₹99</span>
            </div>
            <div style={styles.summaryTotal}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Total</span>
                <span>₹{(subtotal + 99).toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              style={{...styles.button, width: '100%', marginTop: '2rem'}}
              onClick={() => setCurrentPage('checkout')}
            >
              Proceed to Checkout
            </button>
            
            <button 
              style={{...styles.button, width: '100%', marginTop: '1rem', backgroundColor: '#666'}}
              onClick={() => setCurrentPage('products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
