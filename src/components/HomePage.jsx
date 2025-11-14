import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const styles = {
  container: { padding: '2rem 1rem', backgroundColor: '#fff' },
  main: { maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  heroSection: {
    backgroundColor: '#f0fdf4',
    padding: '3rem 1rem',
    borderRadius: '8px',
    marginBottom: '3rem',
    textAlign: 'center'
  },
  heroTitle: { fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#16a34a' },
  heroText: { fontSize: '1.1rem', color: '#666', marginBottom: '2rem' },
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s'
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardContent: {
    padding: '1rem'
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  cardPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: '1rem'
  }
};

export const HomePage = () => {
  const { cart, setCurrentPage } = useApp();

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <h1 style={styles.heroTitle}>Welcome to PlantHub 🌱</h1>
          <p style={styles.heroText}>Discover beautiful plants for your home and office</p>
          <button style={styles.button} onClick={() => setCurrentPage('products')}>
            Shop Plants Now
          </button>
        </div>

        {/* Featured Section */}
        <div>
          <h2 style={styles.title}>Featured Plants</h2>
          <div style={styles.grid}>
            {[
              { id: 1, name: 'Monstera Deliciosa', price: '₹1,299', image: '🌿' },
              { id: 2, name: 'Snake Plant', price: '₹899', image: '🪴' },
              { id: 3, name: 'Pothos', price: '₹599', image: '🌱' },
              { id: 4, name: 'Peace Lily', price: '₹799', image: '🌸' },
            ].map(plant => (
              <div key={plant.id} style={styles.card}>
                <div style={{fontSize: '80px', textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb'}}>
                  {plant.image}
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{plant.name}</h3>
                  <div style={styles.cardPrice}>{plant.price}</div>
                  <button style={styles.button} onClick={() => setCurrentPage('products')}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div style={{marginTop: '4rem', backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '8px'}}>
          <h2 style={styles.title}>Why PlantHub?</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem'}}>
            <div>
              <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>🚚 Fast Delivery</h3>
              <p style={{color: '#666'}}>Get your plants delivered within 5-7 days</p>
            </div>
            <div>
              <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>💚 Quality Plants</h3>
              <p style={{color: '#666'}}>Healthy plants directly from our nurseries</p>
            </div>
            <div>
              <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>💰 Best Prices</h3>
              <p style={{color: '#666'}}>Competitive prices with seasonal discounts</p>
            </div>
            <div>
              <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>📚 Plant Guides</h3>
              <p style={{color: '#666'}}>Expert tips for plant care and growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
