import React from 'react';

const styles = {
  container: { padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' },
  text: { color: '#666', lineHeight: '1.6' }
};

export const PlantGuidePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Plant Guide</h1>
      <p style={styles.text}>Learn about different types of plants and their characteristics.</p>
      <div style={{marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
        <div style={{padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>🌿 Low Light Plants</h3>
          <p style={{fontSize: '0.95rem', color: '#666'}}>Plants that thrive in low light conditions are perfect for indoor spaces.</p>
        </div>
        <div style={{padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>☀️ Sunlight Lovers</h3>
          <p style={{fontSize: '0.95rem', color: '#666'}}>These plants need plenty of natural light to grow well.</p>
        </div>
        <div style={{padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>💧 Water Management</h3>
          <p style={{fontSize: '0.95rem', color: '#666'}}>Learn how to water your plants properly without overwatering.</p>
        </div>
      </div>
    </div>
  );
};
