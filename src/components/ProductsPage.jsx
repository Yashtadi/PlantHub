import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { plants } from '../data/plants';
import { toast } from 'sonner';

const styles = {
  container: { padding: '2rem 1rem', backgroundColor: '#fff' },
  main: { maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' },
  layout: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem' },
  sidebar: { backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '1rem', height: 'fit-content' },
  categoryItem: { padding: '0.5rem 0.5rem', cursor: 'pointer', color: '#166534' },
  categoryItemActive: { fontWeight: '600', color: '#0f5132' },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  cardImage: { width: '100%', height: '250px', objectFit: 'cover', backgroundColor: '#f0f9ff', display: 'block' },
  imageFallback: { width: '100%', height: '250px', backgroundColor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#90ee90' },
  cardContent: { padding: '1rem' },
  cardTitle: { fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' },
  cardPrice: { fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1rem' },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500'
  }
};

export const ProductsPage = () => {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(plants.map(p => p.category))];
  const filteredPlants = selectedCategory === 'All' ? plants : plants.filter(p => p.category === selectedCategory);

  const handleAddToCart = (plant) => {
    addToCart(plant);
    toast.success(`${plant.name} added to cart!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <h1 style={styles.title}>Our Plants</h1>
        
        <div style={styles.layout}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <h3 style={{fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem'}}>Categories</h3>
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{...styles.categoryItem, ...(selectedCategory === category ? styles.categoryItemActive : {})}}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Products Grid */}
          <div style={styles.grid}>
            {filteredPlants.map((plant) => (
              <div key={plant.id} style={styles.card}>
              <img 
                src={plant.image} 
                alt={plant.name}
                style={styles.cardImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.style.cssText = `width: 100%; height: 250px; backgroundColor: #e8f5e9; display: flex; alignItems: center; justifyContent: center; fontSize: 3rem; color: #16a34a;`;
                  fallback.textContent = '🌿';
                  e.target.parentNode.insertBefore(fallback, e.target);
                }}
              />
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{plant.name}</h3>
                  <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem'}}>{plant.scientificName}</p>
                  <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '1rem'}}>{plant.description}</p>
                  <div style={styles.cardPrice}>₹{plant.price}</div>
                  <button 
                    style={styles.button}
                    onClick={() => handleAddToCart(plant)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
