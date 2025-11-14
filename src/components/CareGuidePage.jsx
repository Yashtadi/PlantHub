import React from 'react';

const styles = {
  container: { padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
  card: { padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #16a34a' }
};

export const CareGuidePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Plant Care Tips</h1>
      
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>💡 Light</h3>
          <p style={{color: '#666', lineHeight: '1.6'}}>Most houseplants prefer bright, indirect light. Avoid direct sunlight which can scorch leaves.</p>
        </div>
        
        <div style={styles.card}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>💧 Watering</h3>
          <p style={{color: '#666', lineHeight: '1.6'}}>Water when the soil is dry to the touch. Most plants prefer this to being constantly wet.</p>
        </div>
        
        <div style={styles.card}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>🌡️ Temperature</h3>
          <p style={{color: '#666', lineHeight: '1.6'}}>Keep plants in temperatures between 16-24°C. Avoid cold drafts and sudden temperature changes.</p>
        </div>
        
        <div style={styles.card}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>💨 Humidity</h3>
          <p style={{color: '#666', lineHeight: '1.6'}}>Many tropical plants appreciate higher humidity. Mist leaves occasionally or group plants together.</p>
        </div>
        
        <div style={styles.card}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>🌱 Soil</h3>
          <p style={{color: '#666', lineHeight: '1.6'}}>Use well-draining potting soil specific to your plant type. This prevents root rot and promotes growth.</p>
        </div>
        
        <div style={styles.card}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>✂️ Maintenance</h3>
          <p style={{color: '#666', lineHeight: '1.6'}}>Prune dead leaves and branches regularly. This promotes new growth and keeps plants healthy.</p>
        </div>
      </div>
    </div>
  );
};
