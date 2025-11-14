import React from 'react';
import { useApp } from '../context/AppContext';

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    flexWrap: 'wrap'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#16a34a'
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  navButtonActive: {
    color: '#16a34a'
  },
  actions: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '1.2rem',
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#16a34a',
    color: '#fff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  subscription: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    backgroundColor: '#fef3c7',
    color: '#b45309',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: '600'
  }
};

export const Header = () => {
  const { cart, user, currentPage, setCurrentPage, logout } = useApp();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => setCurrentPage('home')}>
          🌱 PlantHub
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          <button 
            style={{...styles.navButton, ...(currentPage === 'home' ? styles.navButtonActive : {})}}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button 
            style={{...styles.navButton, ...(currentPage === 'products' ? styles.navButtonActive : {})}}
            onClick={() => setCurrentPage('products')}
          >
            Shop
          </button>
          {user && (
            <button 
              style={{...styles.navButton, ...(currentPage === 'orders' || currentPage === 'order-detail' ? styles.navButtonActive : {})}}
              onClick={() => setCurrentPage('orders')}
            >
              Orders
            </button>
          )}
          <button 
            style={{...styles.navButton, ...(currentPage === 'plant-guide' ? styles.navButtonActive : {})}}
            onClick={() => setCurrentPage('plant-guide')}
          >
            Plant Guide
          </button>
          <button 
            style={{...styles.navButton, ...(currentPage === 'care-guide' ? styles.navButtonActive : {})}}
            onClick={() => setCurrentPage('care-guide')}
          >
            Care Tips
          </button>
        </nav>

        {/* Actions */}
        <div style={styles.actions}>
          {/* Subscription */}
          <button 
            style={styles.button}
            onClick={() => setCurrentPage('subscription')}
            title="Subscription"
          >
            👑
          </button>

          {/* Cart */}
          <button 
            style={styles.button}
            onClick={() => setCurrentPage('cart')}
          >
            🛒
            {cartItemsCount > 0 && <span style={styles.badge}>{cartItemsCount}</span>}
          </button>

          {/* User */}
          {user ? (
            <div style={styles.userInfo}>
              <span style={{fontSize: '0.9rem', color: '#666'}}>Hi, {user.name}</span>
              {user.subscription && <span style={styles.subscription}>{user.subscription.toUpperCase()}</span>}
              <button 
                style={{background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontSize: '0.9rem'}}
                onClick={() => {
                  logout();
                  setCurrentPage('home');
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              style={{...styles.button, fontSize: '1rem'}}
              onClick={() => setCurrentPage('auth')}
            >
              👤 Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
