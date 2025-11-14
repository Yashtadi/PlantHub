import React from 'react';

const styles = {
  container: { padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' },
  text: { color: '#666', lineHeight: '1.6', marginBottom: '1rem' }
};

export const ProductDetailPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Product Details</h1>
      <p style={styles.text}>Product detail page</p>
    </div>
  );
};
